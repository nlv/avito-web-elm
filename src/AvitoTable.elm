-- module AvitoTable exposing (Msg), CellInfo, textCell, CellStatus(..), Cell, Model, initModel, update, view)
module AvitoTable exposing (Msg, Model, update, view, initModel, setData)

import List as List
import Array as Array
import Tuple as Tuple

import Task
import Html exposing (text, div)
import Html.Events exposing (onClick)
import Html.Attributes exposing (id)
import Browser.Dom exposing (focus, Error)

import Bootstrap.Utilities.Flex as Flex
import Bootstrap.Table as Table
import Bootstrap.Button as Button
import Bootstrap.Form.Input as Input


{- ------ -}

type Msg = 
      SetData (List String)

    | CellInput Int String
    | CellSetEditable Int
    | CellCancelEditable Int
    | CellSetNormal Int

    | FocusResult (Result Error ())

type alias CellInfo = { 
    name : String
  , normal : String -> Table.Cell Msg
  , edit : String -> Table.Cell Msg
  , focusId : String
  }

textCell : Int -> String -> CellInfo
textCell i n = let focusId = "col-editable-input-" ++ (String.fromInt i) in 
  { name = n
  , normal = \t -> Table.td [Table.cellAttr (onClick (CellSetEditable i))] [text t]
  , edit = \t -> Table.td [] [
      div [Flex.inline] [
        Input.text [Input.attrs [id focusId], Input.small, Input.value t, Input.onInput (CellInput i)]
      , Button.button [Button.small, Button.onClick (CellSetNormal i)] [text "V"]
      , Button.button [Button.small, Button.onClick (CellCancelEditable i)] [text "X"]
      ]
    ]  
  , focusId = focusId
  }

type CellStatus = CellNormal | CellEditable String

type alias Cell = { value : String, status : CellStatus}

{- ----- -}

type alias Model = {
      cellsInfo : Array.Array CellInfo
    , cells : Array.Array Cell
    }

initModel : (List String) -> (List String ) -> Model
initModel hs ds = {
        cellsInfo = hs |> List.indexedMap textCell |> Array.fromList
      , cells = ds |> List.map (\i -> {value = i, status = CellNormal}) |> Array.fromList
      }    

setData : Model -> (List String) -> Model
setData model ds = {model | cells = ds |> List.map (\i -> {value = i, status = CellNormal}) |> Array.fromList}

update : Msg -> Model -> (Model, Cmd Msg, Maybe (List String))
update action model =
  case action of
    SetData xs -> ({ model | cells = List.map (\x -> {value = x, status = CellNormal}) xs |> Array.fromList}, Cmd.none, Nothing)

    CellInput i str -> (
        { model | cells = Maybe.withDefault model.cells (Array.get i model.cells |> Maybe.andThen (\c -> Just (Array.set i {c | status = CellEditable str} model.cells))) }
      , Cmd.none
      , Nothing
      )
    CellSetEditable i -> (
        { model | cells = Maybe.withDefault model.cells (Array.get i model.cells |> Maybe.andThen (\c -> Just (Array.set i {c | status = CellEditable c.value} model.cells))) }
      , Maybe.withDefault Cmd.none (Array.get i model.cellsInfo |> Maybe.andThen (\c -> Just ((Task.attempt FocusResult (focus c.focusId)))))
      , Nothing
      )      
    CellCancelEditable i -> (
        { model | cells = Maybe.withDefault model.cells (Array.get i model.cells |> Maybe.andThen (\c -> Just (Array.set i {c | status = CellNormal} model.cells))) }
      , Cmd.none
      , Nothing
      )            
    CellSetNormal i -> 
        let newCells = Maybe.withDefault model.cells (Array.get i model.cells |> 
                    Maybe.andThen (\c -> Just (Array.set i {c | value = case c.status of 
                                                                          CellNormal -> c.value 
                                                                          CellEditable str -> str, status = CellNormal} model.cells)))
        in
        ( { model | cells = newCells }      
        , Cmd.none
        , Array.toList newCells |> List.map (.value) |> Just
        )                                                                             

    FocusResult result ->
            case result of
                Err _ -> (model, Cmd.none, Nothing)
                Ok _ -> (model, Cmd.none, Nothing)

view : Model -> Html.Html Msg
view model = avitoTable model
 
avitoTable : Model -> Html.Html Msg
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