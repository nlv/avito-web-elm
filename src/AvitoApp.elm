module AvitoApp exposing (main)

import Array as Array

import Platform.Cmd as Cmd
import Html
import Http
import Browser

import Json.Decode as D

import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid
import Bootstrap.Table as BTable

import AvitoTable as Table

type Msg = AvitoTable Table.Msg | GotInitialData (Result Http.Error FirstRow)

type LoadingStatus = Failure | Loading | Success

type alias FirstRow = {
    col1 : String
  , col2 : String
  , col3 : String
  }

type alias Model = {
    initialLoad : LoadingStatus 
  , avitoTable : Table.Model
  , data : FirstRow
  }

initModel : Model
initModel = {
    initialLoad = Loading
  , avitoTable = Table.initModel ["col1", "col2", "col3"] ["", "", ""]
  , data = {col1 = "", col2 = "", col3 = ""}
  }

getData : Cmd Msg
getData = Http.get
      { url = "http://localhost:3030/data/test_table/first"
      , expect = Http.expectJson GotInitialData (D.map3 FirstRow (D.field "_testTableCol1" D.string) (D.field "_testTableCol2" D.string) (D.field "_testTableCol3" D.string))
      }

-- updateData : List String -> Cmd Msg
-- updateData ds = 
--       let d = 
--       Http.post 
--         { url = "http://localhost:3030/data/test_table/first"
--         , body = Http.jsonBody (E.dict identity)
--         , expect = Http.expectJson GotInitialData (D.map3 FirstRow (D.field "_testTableCol1" D.string) (D.field "_testTableCol2" D.string) (D.field "_testTableCol3" D.string))
--         }

listToFirstRow : FirstRow -> List String -> FirstRow
listToFirstRow default ds =
  let da = Array.fromList ds in
  Maybe.map3 (\c1 c2 c3 -> {col1 = c1, col2 = c2, col3 = c3}) (Array.get 0 da) (Array.get 1 da) (Array.get 2 da) |> Maybe.withDefault default 

firstRowToList : FirstRow -> List String
firstRowToList row = [row.col1, row.col2, row.col3]

update : Msg -> Model -> (Model, Cmd Msg)
update action model =
  case action of
    AvitoTable msg -> let (t, cmd, i) = Table.update msg model.avitoTable 
                          newData = case i of
                                  Just ds -> listToFirstRow model.data ds
                                  Nothing -> model.data
                      in 
                      ( {model | avitoTable = t, data = newData}, Cmd.map AvitoTable cmd)

    GotInitialData result ->
      case result of
        Ok row ->
          ({ model | initialLoad = Success, data = row, avitoTable = firstRowToList row |> Table.setData model.avitoTable }, Cmd.none)

        Err _ ->
          ({ model | initialLoad = Failure }, Cmd.none)

main : Program () Model Msg
main =  Browser.element { init = \_ -> (initModel, getData), update = update, view = view, subscriptions = \_ -> Sub.none }

view : Model -> Html.Html Msg
view model = 
    Grid.container []
        [ CDN.stylesheet
        , view2 model
        ] 
 
view2 : Model -> Html.Html Msg
view2 model = 
  case model.initialLoad of 
    Success -> Html.div [] [
        Table.view model.avitoTable |> Html.map AvitoTable
      , firstRowToList model.data |> mirrorTable (List.map (.name) (Array.toList model.avitoTable.cellsInfo))
      ]
    Loading -> Html.text "Загрузка данных"
    Failure -> Html.text "Ошибка загрузки данных"


mirrorTable : List String -> List String -> Html.Html Msg
mirrorTable hs bs = 
    BTable.table {
      options = [ BTable.bordered, BTable.hover, BTable.responsive ]
    , thead = BTable.simpleThead (List.map (\i -> BTable.th [] [Html.text i]) hs) 
    , tbody = BTable.tbody [] [
            BTable.tr [] (List.map (\i -> BTable.td [] [Html.text i]) bs) 
        ]
    }