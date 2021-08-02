module AvitoApp exposing (main)

import List as List
import Array as Array
import Tuple as Tuple

import Browser
import Html exposing (text, div, span)
import Html.Events exposing (onClick)

import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid
import Bootstrap.Utilities.Display as Display
import Bootstrap.Utilities.Flex as Flex
import Bootstrap.Table as Table
import Bootstrap.Button as Button
import Bootstrap.Form.Input as Input

import Maybe exposing (andThen)

{- ------ -}

type CellMsg = 
      CellInput Int String
    | CellSetEditable Int
    | CellCancelEditable Int
    | CellSetNormal Int

type alias CellInfo = { name : String, normal : String -> Table.Cell CellMsg, edit : String -> Table.Cell CellMsg }

textCell : String -> Int -> CellInfo  
textCell n i = { 
    name = n
  , normal = \t -> Table.th [Table.cellAttr (onClick (CellSetEditable i))] [text t]
  , edit = \t -> Table.td [] [
      div [Flex.inline] [
        Input.text  [Input.small, Input.value t, Input.onInput (CellInput i)]
      , Button.button [Button.small, Button.onClick (CellSetNormal i)] [text "V"]
      , Button.button [Button.small, Button.onClick (CellCancelEditable i)] [text "X"]
      ]
    ]  
  }

type CellStatus = CellNormal | CellEditable String

type alias Cell = { value : String, status : CellStatus}

{- ----- -}

type alias Model = {
      cellsInfo : Array.Array CellInfo
    , cells : Array.Array Cell
    }

initCell : Cell
initCell = { value = "", status = CellNormal }

initModel : Model
initModel = {
      cellsInfo = Array.fromList [textCell "col1" 0, textCell "col2" 1, textCell "col3" 2]
    , cells = Array.fromList [initCell, initCell, initCell]
    }

-- type Message = MCellMessage CellMessage

update : CellMsg -> Model -> Model
update action model =
  case action of
    CellInput i str -> { model | cells = Maybe.withDefault model.cells (Array.get i model.cells |> Maybe.andThen (\c -> Just (Array.set i {c | status = CellEditable str} model.cells))) }
    CellSetEditable i -> 
      { model | cells = Maybe.withDefault model.cells (Array.get i model.cells |> Maybe.andThen (\c -> Just (Array.set i {c | status = CellEditable c.value} model.cells))) }
    CellCancelEditable i -> 
      { model | cells = Maybe.withDefault model.cells (Array.get i model.cells |> Maybe.andThen (\c -> Just (Array.set i {c | status = CellNormal} model.cells))) }
    CellSetNormal i -> 
      { model | cells = Maybe.withDefault model.cells (Array.get i model.cells |> 
        Maybe.andThen (\c -> Just (Array.set i {c | value = case c.status of CellNormal -> c.value 
                                                                             CellEditable str -> str, status = CellNormal} model.cells))) }      


    -- | CellSetEditable Int
    -- | CellCancelEditable Int
    -- | CellSetNormal Int

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
        cellsL = Array.toList  model.cells
        cellsInfoL = Array.toList model.cellsInfo
        headP = List.map (\i -> [text i.name]) cellsInfoL
        cellsP = List.map viewCell (List.map2 Tuple.pair cellsInfoL cellsL)
        viewCell (info, cell) = case cell.status of
                                 CellNormal -> info.normal cell.value 
                                 CellEditable v -> info.edit v
    in
    Table.table {
      options = [ Table.bordered, Table.hover, Table.responsive ]
    , thead = Table.simpleThead (List.map (Table.th []) headP) 
    , tbody = Table.tbody [] [
            Table.tr [] cellsP
        ]
    }