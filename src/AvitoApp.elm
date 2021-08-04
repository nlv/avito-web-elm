module AvitoApp exposing (main)

import Array as Array

import Platform.Cmd as Cmd
import Html
import Browser

import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid

import AvitoTable as Table

type Msg = AvitoTable Table.CellMsg

type alias Model = {
  avitoTable : Table.Model
  }

initCell : Table.Cell
initCell = { value = "", status = Table.CellNormal }

initModel : Model
initModel = {
  avitoTable = {
      cellsInfo = Array.fromList [Table.textCell "col1" 0, Table.textCell "col2" 1, Table.textCell "col3" 2]
    , cells = Array.fromList [initCell, initCell, initCell]
    }
  }

update : Msg -> Model -> (Model, Cmd Msg)
update action model =
  case action of
    AvitoTable msg -> let (t, c) = Table.update msg model.avitoTable in ( {model | avitoTable = t}, Cmd.map AvitoTable c)

main : Program () Model Msg
main =  Browser.element { init = \_ -> (initModel, Cmd.none), update = update, view = view, subscriptions = \_ -> Sub.none }

view : Model -> Html.Html Msg
view model = 
    Grid.container []
        [ CDN.stylesheet
        , Table.view model.avitoTable
        ] |> Html.map AvitoTable 
 
