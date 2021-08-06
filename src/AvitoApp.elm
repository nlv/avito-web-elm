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

import AvitoTable as Table
import Dict exposing (Dict)

type Msg = AvitoTable Table.Msg | GotInitialData (Result Http.Error FirstRow) | DataPosted (Result Http.Error ())

type HttpStatus = Failure | Loading | Success

type alias FirstRow = {
    col1 : String
  , col2 : String
  , col3 : String
  }

type alias Model = {
    initialLoadStatus : HttpStatus 
  , postDataStatus : HttpStatus  
  , avitoTable : Table.Model
  , data : FirstRow
  }

initModel : Model
initModel = {
    initialLoadStatus = Loading
  , postDataStatus = Success  
  , avitoTable = Table.initModel ["col1", "col2", "col3"] ["", "", ""]
  , data = {col1 = "", col2 = "", col3 = ""}
  }

getData : Cmd Msg
getData = Http.get
      { url = "http://localhost:3030/data/test_table/first"
      , expect = Http.expectJson GotInitialData (D.map3 FirstRow (D.field "_testTableCol1" D.string) (D.field "_testTableCol2" D.string) (D.field "_testTableCol3" D.string))
      }

updateData : FirstRow -> Cmd Msg
updateData data = 
      Http.post 
        { url = "http://localhost:3030/data/test_table/first"
        , body = firstRowToDict data |> E.dict identity E.string |> Http.jsonBody 
        , expect = Http.expectWhatever DataPosted
        }

listToFirstRow : FirstRow -> List String -> FirstRow
listToFirstRow default ds =
  let da = Array.fromList ds in
  Maybe.map3 (\c1 c2 c3 -> {col1 = c1, col2 = c2, col3 = c3}) (Array.get 0 da) (Array.get 1 da) (Array.get 2 da) |> Maybe.withDefault default 

firstRowToList : FirstRow -> List String
firstRowToList row = [row.col1, row.col2, row.col3]

firstRowToDict : FirstRow -> Dict String String
firstRowToDict row = 
  Dict.fromList [
      ("_testTableRCol1", row.col1)
    , ("_testTableRCol2", row.col2)
    , ("_testTableRCol3", row.col3)
    ]

update : Msg -> Model -> (Model, Cmd Msg)
update action model =
  case action of
    -- AvitoTable msg -> let (t, cmd, i) = Table.update msg model.avitoTable 
    --                       (newData, newCmd) = case i of
    --                               Just ds -> (listToFirstRow model.data ds, Cmd.batch [Cmd.map AvitoTable cmd, listToFirstRow model.data ds |> updateData])
    --                               Nothing -> (model.data, Cmd.map AvitoTable cmd)
    --                   in 
    --                   ( {model | avitoTable = t, data = newData}, newCmd)
    AvitoTable msg -> let (t, cmd, i) = Table.update msg model.avitoTable in
                      case i of
                        Just ds -> (
                            { model | 
                                avitoTable = t
                              , data = listToFirstRow model.data ds
                              , postDataStatus = Loading
                            }
                          , Cmd.batch [Cmd.map AvitoTable cmd, listToFirstRow model.data ds |> updateData]
                          )
                        Nothing -> ({model | avitoTable = t}, Cmd.map AvitoTable cmd)


    GotInitialData result ->
      case result of
        Ok row ->
          ({ model | initialLoadStatus = Success, data = row, avitoTable = firstRowToList row |> Table.setData model.avitoTable }, Cmd.none)

        Err _ ->
          ({ model | initialLoadStatus = Failure }, Cmd.none)

    DataPosted result ->
      case result of
        Ok _ ->
          ({ model | postDataStatus = Success}, Cmd.none)

        Err _ ->
          ({ model | postDataStatus = Failure }, Cmd.none)

main : Program () Model Msg
main =  Browser.element { init = \_ -> (initModel, getData), update = update, view = view, subscriptions = \_ -> Sub.none }

view : Model -> Html.Html Msg
view model = 
    Grid.container []
        [ CDN.stylesheet
        , viewPostDataStatus model
        , viewAvitoTable model
        ] 
 
viewAvitoTable : Model -> Html.Html Msg
viewAvitoTable model = 
  case model.initialLoadStatus of 
    Success -> Html.div [] [
        Table.view model.avitoTable |> Html.map AvitoTable
      , firstRowToList model.data |> mirrorTable (List.map (.name) (Array.toList model.avitoTable.cellsInfo))
      ]
    Loading -> Html.text "Загрузка данных"
    Failure -> Html.text "Ошибка загрузки данных"

viewPostDataStatus model = 
  case model.postDataStatus of 
    Success -> Html.text ""
    Loading -> Html.text "Отправка данных"
    Failure -> Html.text "Ошибка отправки данных"


mirrorTable : List String -> List String -> Html.Html Msg
mirrorTable hs bs = 
    BTable.table {
      options = [ BTable.bordered, BTable.hover, BTable.responsive ]
    , thead = BTable.simpleThead (List.map (\i -> BTable.th [] [Html.text i]) hs) 
    , tbody = BTable.tbody [] [
            BTable.tr [] (List.map (\i -> BTable.td [] [Html.text i]) bs) 
        ]
    }