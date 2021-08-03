module AvitoApp exposing (main)

import List as List
import Array as Array
import Tuple as Tuple

import Browser
import Task
import Html exposing (text, div)
import Html.Events exposing (onClick)
import Html.Attributes exposing (id)
import Browser.Dom exposing (focus, Error)

import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid
import Bootstrap.Utilities.Flex as Flex
import Bootstrap.Table as Table
import Bootstrap.Button as Button
import Bootstrap.Form.Input as Input


{- ------ -}

type CellMsg = 
      CellInput Int String
    | CellSetEditable Int
    | CellCancelEditable Int
    | CellSetNormal Int

    | FocusOn String
    | FocusResult (Result Error ())

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

update : CellMsg -> Model -> (Model, Cmd CellMsg)
update action model =
  case action of
    CellInput i str -> (
        { model | cells = Maybe.withDefault model.cells (Array.get i model.cells |> Maybe.andThen (\c -> Just (Array.set i {c | status = CellEditable str} model.cells))) }
      , Cmd.none
      )
    CellSetEditable i -> (
          { model | cells = Maybe.withDefault model.cells (Array.get i model.cells |> Maybe.andThen (\c -> Just (Array.set i {c | status = CellEditable c.value} model.cells))) }
      , Cmd.none
      )      
    CellCancelEditable i -> (
        { model | cells = Maybe.withDefault model.cells (Array.get i model.cells |> Maybe.andThen (\c -> Just (Array.set i {c | status = CellNormal} model.cells))) }
      , Cmd.none
      )            
    CellSetNormal i -> (
        { model | cells = Maybe.withDefault model.cells (Array.get i model.cells |> 
          Maybe.andThen (\c -> Just (Array.set i {c | value = case c.status of 
                                                                CellNormal -> c.value 
                                                                CellEditable str -> str, status = CellNormal} model.cells))) }      
        , Cmd.none
        )                                                                             

    FocusOn id -> (model, Task.attempt FocusResult (focus id) )
    FocusResult result ->
            case result of
                Err _ -> (model, Cmd.none)
                Ok _ -> (model, Cmd.none)

main : Program () Model CellMsg
main =  Browser.element { init = \_ -> (initModel, Cmd.none), update = update, view = view, subscriptions = \_ -> Sub.none }

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