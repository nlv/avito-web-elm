module AvitoApp exposing (main)

import Array as Array

import Platform.Cmd as Cmd
import Html
import Http
import Browser

import Json.Decode as D
import Json.Encode as E

import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid
import Bootstrap.Table as BTable
import Bootstrap.Button as Button

import AvitoTable as Table
import Maybe exposing (withDefault)

type Msg = 
    AvitoTable Table.Msg 
  | GotInitialData (Result Http.Error FirstRow) 
  | DataPosted (Result Http.Error ())
  | RefreshData

type HttpStatus = Failure String | Loading String | Success

type alias FirstRow = {
    id   : Int
  , col1 : String
  , col2 : String
  , col3 : String
  }

type alias Model = {
    httpStatus : HttpStatus 
  , avitoTable : Table.Model
  , data : FirstRow
  }

initModel : Model
initModel = {
    httpStatus = Loading "Получаем данные"
  , avitoTable = Table.initModel (Array.fromList ["col1", "col2", "col3"]) (Array.fromList [Array.fromList ["", "", ""]])
  , data = {id = 1, col1 = "", col2 = "", col3 = ""}
  }

getData : Cmd Msg
getData = Http.get
      { url = "http://localhost:3030/data/test_table/1"
      , expect = Http.expectJson GotInitialData (
                    D.map4 FirstRow 
                      (D.field "_testTableId" D.int)
                      (D.field "_testTableCol1" D.string)
                      (D.field "_testTableCol2" D.string)
                      (D.field "_testTableCol3" D.string)
                    )
      }

saveData : FirstRow -> Cmd Msg
saveData data = 
      Http.post 
        { url = "http://localhost:3030/data/test_table"
        , body = E.list firstRowToValue [data] |>  Http.jsonBody 
        , expect = Http.expectWhatever DataPosted
        }

arrayToFirstRow : Array.Array String -> Maybe FirstRow
arrayToFirstRow ds =
  Maybe.map3 (\c1 c2 c3 -> {id = 1, col1 = c1, col2 = c2, col3 = c3}) (Array.get 0 ds) (Array.get 1 ds) (Array.get 2 ds)

firstRowToArray : FirstRow -> Array.Array String
firstRowToArray row = Array.fromList [row.col1, row.col2, row.col3]

firstRowToValue : FirstRow -> E.Value
firstRowToValue row = 
  E.object [
      ("_testTableId", E.int row.id)
    , ("_testTableCol1", E.string row.col1)
    , ("_testTableCol2", E.string row.col2)
    , ("_testTableCol3", E.string row.col3)
    ]

update : Msg -> Model -> (Model, Cmd Msg)
update action model =
  case action of
    AvitoTable msg -> let (t, cmd, i) = Table.update msg model.avitoTable in
                      case i of
                        Just ds -> 
                            let newData = Array.get 0 ds |> Maybe.andThen arrayToFirstRow |> Maybe.withDefault model.data 
                            in  (
                                { model | 
                                    avitoTable = t
                                  , data = Array.get 0 ds |> Maybe.andThen arrayToFirstRow |> Maybe.withDefault model.data
                                  , httpStatus = Loading "Сохраняем данные"
                                }
                                , Cmd.batch [Cmd.map AvitoTable cmd, saveData newData]
                                )
                        Nothing -> ({model | avitoTable = t}, Cmd.map AvitoTable cmd)


    GotInitialData result ->
      case result of
        Ok row ->
          ({ model | httpStatus = Success, data = row, avitoTable = Array.fromList [firstRowToArray row] |> Table.setData model.avitoTable }, Cmd.none)

        Err _ ->
          ({ model | httpStatus = Failure "Ошибка получения данных"}, Cmd.none)

    DataPosted result ->
      case result of
        Ok _ ->
          ({ model | httpStatus = Success}, Cmd.none)

        Err _ ->
          ({ model | httpStatus = Failure  "Ошибка сохраннения данных"}, Cmd.none)

    RefreshData -> (model, getData)

main : Program () Model Msg
main =  Browser.element { init = \_ -> (initModel, getData), update = update, view = view, subscriptions = \_ -> Sub.none }

view : Model -> Html.Html Msg
view model = 
    ([ CDN.stylesheet] ++ viewHttpStatus model.httpStatus ++ viewAvitoTable model) |> Grid.container []
 
viewAvitoTable : Model -> List (Html.Html Msg)
viewAvitoTable model = [
        Table.view model.avitoTable |> Html.map AvitoTable
      , firstRowToArray model.data |> mirrorTable (List.map (.name) (Array.toList model.avitoTable.cellsInfo))
      ]

viewHttpStatus : HttpStatus -> List (Html.Html Msg)
viewHttpStatus status = 
  case status of 
    Success -> []
    Loading s -> [Html.text s]
    Failure s -> [Html.text s, refreshButton]

refreshButton : Html.Html Msg
refreshButton = Button.button [Button.small, Button.onClick RefreshData] [Html.text "Обновить"]    

mirrorTable : List String -> Array.Array String -> Html.Html Msg
mirrorTable hs bs = 
    BTable.table {
      options = [ BTable.bordered, BTable.hover, BTable.responsive ]
    , thead = BTable.simpleThead (List.map (\i -> BTable.th [] [Html.text i]) hs) 
    , tbody = BTable.tbody [] [
            BTable.tr [] (List.map (\i -> BTable.td [] [Html.text i]) (Array.toList bs))
        ]
    }