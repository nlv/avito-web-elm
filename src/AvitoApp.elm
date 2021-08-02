module AvitoApp exposing (main)

import List as List
import Tuple as Tuple

import Browser
import Html exposing (text, span)
import Html.Events exposing (onClick)

import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid
import Bootstrap.Table as Table
import Bootstrap.Form.Input as Input

import Maybe exposing (andThen)

{- ------ -}

type CellMsg = 
      CellUpdate Int String
    | CellFocus Int

type alias CellInfo = { name : String, normal : String -> List (Html.Html CellMsg), edit : String -> List (Html.Html CellMsg) }

textCell : String -> Int -> CellInfo  
textCell n i = { name = n, normal = \t -> [span [ onClick (CellFocus i)] [text t]], edit = \t -> [Input.text  [Input.small, Input.value t, Input.onInput (CellUpdate i)]]  }

type CellStatus = CellNormal | CellEditable

type alias Cell = { value : String, status : CellStatus}

{- ----- -}

type alias Model = {
      cellsInfo : List CellInfo
    , cells : List Cell
    }

initCell : Cell
initCell = { value = "", status = CellNormal }

initCell2 : Cell
initCell2 = { value = "", status = CellEditable }

initModel : Model
initModel = {
      cellsInfo = [textCell "col1" 0, textCell "col2" 1, textCell "col3" 2]
    , cells = [initCell, initCell2, initCell]
    }

-- type Message = MCellMessage CellMessage

update : CellMsg -> Model -> Model
update action model =
  case action of
    CellUpdate i str -> model
    CellFocus i -> model
    -- Array.get i model.cells |> andThen


main : Program () Model CellMsg
main = Browser.sandbox { init = initModel, update = update, view = view }

view : Model -> Html.Html CellMsg
view model = 
    Grid.container []
        [ CDN.stylesheet
        , avitoTable model
        ]
 
avitoTable : Model -> Html.Html CellMsg
avitoTable model = 
    let 
        headP = List.map (\i -> [text i.name]) model.cellsInfo
        cellsP = List.map viewCell (List.map2 Tuple.pair model.cellsInfo model.cells)
        viewCell (info, cell) = case cell.status of
                                 CellNormal -> info.normal cell.value 
                                 CellEditable -> info.edit cell.value
    in
    Table.table {
      options = [ Table.bordered, Table.hover ]
    -- , thead = Table.simpleThead (List.map (\h -> Table.th [] h) headP) 
    , thead = Table.simpleThead (List.map (Table.th []) headP) 
    , tbody = Table.tbody [] [
            Table.tr [] (List.map (Table.td []) cellsP)
        ]
    }