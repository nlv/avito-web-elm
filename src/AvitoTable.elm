module AvitoTable exposing (Msg, Model, update, view, initModel, setData)

import List as List
import Array as Array
import Array2D as Array2D

import Task
import Html exposing (text, div)
import Html.Events exposing (onClick)
import Html.Attributes exposing (id)
import Browser.Dom exposing (focus, Error)

import Bootstrap.Utilities.Flex as Flex
import Bootstrap.Table as Table
import Bootstrap.Button as Button
import Bootstrap.Form.Input as Input
import Maybe exposing (withDefault)
import Array exposing (Array)


type Msg = 
      SetData (Array.Array (Array.Array String))

    | CellInput Int Int String
    | CellSetEditable Int Int
    | CellCancelEditable Int Int
    | CellSetNormal Int Int

    | DeleteRow Int

    | FocusResult (Result Error ())

type alias CellInfo = { 
    name : String
  , normal : Int -> Int -> String -> Table.Cell Msg
  , edit : Int -> Int -> String -> Table.Cell Msg
  , focusId : Int -> Int -> String
  }

textCell : String -> CellInfo
textCell n = let focusId i j = "col-editable-input-" ++ (String.fromInt i) ++ "-" ++ (String.fromInt j) in 
  { name = n
  , normal = \i j t -> Table.td [Table.cellAttr (onClick (CellSetEditable i j))] [text t]
  , edit = \i j t -> Table.td [] [
      div [Flex.inline] [
        Input.text [Input.attrs [id (focusId i j)], Input.small, Input.value t, Input.onInput (CellInput i j)]
      , Button.button [Button.small, Button.onClick (CellSetNormal i j)] [text "V"]
      , Button.button [Button.small, Button.onClick (CellCancelEditable i j)] [text "X"]
      ]
    ]  
  , focusId = focusId
  }

type CellStatus = CellNormal | CellEditable String

type alias Cell = { value : String, status : CellStatus}

type alias Model = {
      cellsInfo : Array.Array CellInfo
    , cells : Array2D.Array2D Cell
    }

initModel : (Array.Array String) -> Array.Array (Array.Array String) -> Model
initModel hs ds = {
        cellsInfo = hs |> Array.map textCell
      , cells = Array2D.map (\c -> {value = c, status = CellNormal}) (Array2D.fromArray ds) |> appendEmptyRow (Array.length hs)
      }    

setData : Model -> Array.Array (Array.Array String) -> Model
setData model ds = {model | cells = Array2D.map (\c -> {value = c, status = CellNormal}) (Array2D.fromArray ds) |> appendEmptyRow (Array.length model.cellsInfo)}

update : Msg -> Model -> (Model, Cmd Msg, Maybe (Array.Array (Array.Array String)))
update action model =
  case action of
    SetData ds -> (setData model ds, Cmd.none, Nothing)

    CellInput i j str -> (
        { model | cells = updateArray2D i j (\c -> {c | status = CellEditable str}) model.cells}
      , Cmd.none
      , Nothing
      )
    CellSetEditable i j -> 
      let addNewRow cells = if Array2D.rows cells == i + 1 then appendEmptyRow (Array.length model.cellsInfo) cells else cells
      in
      (
        {model | cells = addNewRow (updateArray2D i j (\c -> {c | status = CellEditable c.value}) model.cells)}
      , Maybe.withDefault Cmd.none (Array.get i model.cellsInfo |> Maybe.andThen (\c -> Just ((Task.attempt FocusResult (focus (c.focusId i j))))))
      , Nothing
      )      
    CellCancelEditable i j -> (
        { model | cells = updateArray2D i j (\c -> {c | status = CellNormal}) model.cells }
      , Cmd.none
      , Nothing
      )            
    CellSetNormal i j -> 
      let updateCell c = 
            { c | 
                status = CellNormal
              , value = 
                  case c.status of 
                    CellNormal -> c.value 
                    CellEditable str -> str     
            }
          newCells = updateArray2D i j updateCell model.cells
      in
        ({ model | cells = newCells }, Cmd.none, Array2D.map (.value) newCells |> \ds -> Array2D.deleteRow ((Array2D.rows ds) - 1) ds |> toArrayOfArrays |> Just
        )                                                                             

    DeleteRow i -> 
      if i == Array2D.rows model.cells - 1 then
        (model, Cmd.none, Nothing)
      else
        let newCells = Array2D.deleteRow i model.cells
        in
        ({ model | cells = newCells}, Cmd.none, Array2D.map (.value) newCells |> \ds -> Array2D.deleteRow ((Array2D.rows ds) - 1) ds |> toArrayOfArrays |> Just)

    FocusResult result ->
            case result of
                Err _ -> (model, Cmd.none, Nothing)
                Ok _ -> (model, Cmd.none, Nothing)

view : Model -> Html.Html Msg
view model = avitoTable model
 
avitoTable : Model -> Html.Html Msg
avitoTable model = 
    let 
        cellsInfoL = Array.toList model.cellsInfo
        headP = List.map (\i -> [text i.name]) cellsInfoL

        cellsV = model.cells
                |> Array2D.indexedMap (\i j c -> Maybe.withDefault (textCell "???") (Array.get i model.cellsInfo) |> viewCell i j c)
        rows = List.range 0 ((Array2D.rows model.cells) - 1)
                |> List.map (\i -> Array2D.getRow i cellsV |> Maybe.withDefault Array.empty |> Array.toList)
        viewCell i j cell info = case cell.status of
                                     CellNormal -> info.normal i j cell.value 
                                     CellEditable v -> info.edit i j v
    in
    Table.table {
      options = [ Table.bordered, Table.hover, Table.responsive ]
    , thead = (List.map (Table.th []) headP) ++ [Table.th [] []] |> Table.simpleThead 
    , tbody = Table.tbody [] (List.indexedMap (\i -> if i + 1 == List.length rows then avitoLastRow i else avitoRow i) rows)
    }

avitoRow : Int -> List (Table.Cell Msg) -> Table.Row Msg
avitoRow i rowV = Table.tr [] (rowV ++ [Table.td [] [Button.button [Button.small, Button.onClick (DeleteRow i)] [text "Удалить"]]])

avitoLastRow : Int -> List (Table.Cell Msg) -> Table.Row Msg
avitoLastRow i rowV = Table.tr [] (rowV ++ [Table.td [] []])


toArrayOfArrays : Array2D.Array2D a -> Array.Array (Array.Array a)
toArrayOfArrays a = 
  List.range 0 ((Array2D.rows a) - 1) |> List.map (\i -> Array2D.getRow i a |> Maybe.withDefault Array.empty) |> Array.fromList

updateArray2D : Int -> Int -> (a -> a) -> Array2D.Array2D a -> Array2D.Array2D a
updateArray2D i j f ds =  Array2D.get i j ds |> Maybe.map f |> Maybe.map (\d -> Array2D.set i j d ds) |> Maybe.withDefault ds

defaultCell = {value = "", status = CellNormal}

appendEmptyRow colsCnt ds = 
  let rowsCnt = Array2D.rows ds
  in
  if Array2D.rows ds == 0 then Array2D.fromList [List.repeat colsCnt defaultCell] else Array2D.appendRow (Array.fromList [defaultCell]) defaultCell ds