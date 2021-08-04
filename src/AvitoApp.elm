module AvitoApp exposing (main)

import Array as Array

import Platform.Cmd as Cmd
import Html
import Http
import Browser
import Task

import Json.Decode as D

import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid

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
  }

initCell : Table.Cell
initCell = { value = "", status = Table.CellNormal }

initModel : Model
initModel = {
    initialLoad = Loading
  , avitoTable = {
        cellsInfo = Array.fromList [Table.textCell "col1" 0, Table.textCell "col2" 1, Table.textCell "col3" 2]
      , cells = Array.fromList [initCell, initCell, initCell]
      }
  }

initCmd : Cmd Msg
initCmd = Http.get
      { url = "http://localhost:3030/data/test_table/first"
      , expect = Http.expectJson GotInitialData (D.map3 FirstRow (D.field "_testTableCol1" D.string) (D.field "_testTableCol2" D.string) (D.field "_testTableCol3" D.string))
      }

update : Msg -> Model -> (Model, Cmd Msg)
update action model =
  case action of
    AvitoTable msg -> let (t, c) = Table.update msg model.avitoTable in ( {model | avitoTable = t}, Cmd.map AvitoTable c)

    GotInitialData result ->
      case result of
        Ok row ->
          ({ model | initialLoad = Success }, Table.SetData [row.col1, row.col2, row.col3] |> Task.succeed |> Task.perform AvitoTable)

        Err _ ->
          ({ model | initialLoad = Failure }, Cmd.none)

main : Program () Model Msg
main =  Browser.element { init = \_ -> (initModel, initCmd), update = update, view = view, subscriptions = \_ -> Sub.none }

view : Model -> Html.Html Msg
view model = 
    Grid.container []
        [ CDN.stylesheet
        , view2 model
        ] 
 
view2 : Model -> Html.Html Msg
view2 model = 
  case model.initialLoad of 
    Success -> Table.view model.avitoTable |> Html.map AvitoTable
    Loading -> Html.text "Загрузка данных"
    Failure -> Html.text "Ошибка загрузки данных"