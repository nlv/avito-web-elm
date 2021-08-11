module AvitoTable exposing (Msg, Model, update, view, initModel, setData)

import List as List
import Array as Array
import Array2D as Array2D

import Task
import Html exposing (text, div)
import Html.Events exposing (onClick)
import Html.Attributes exposing (id)
import Browser.Dom exposing (Error)

import Bootstrap.Utilities.Flex as Flex
import Bootstrap.Table as Table
import Bootstrap.Button as Button
import Bootstrap.Form.Input as Input
import Maybe exposing (withDefault)
import Array exposing (Array)

import AvitoCell as Cell

type Msg = 
      SetData (Array.Array (Array.Array String))

    | DeleteRow Int
    | AddRow Int

    | CellMsg Int Int Cell.Msg

type alias CellInfo = { 
    name : String
  , mkModel : String -> String -> Cell.Model  
  }

type alias Model = {
      cellsInfo : Array.Array CellInfo
    , cells : Array2D.Array2D Cell.Model
    }

initModel : (Array.Array String) -> Array.Array (Array.Array String) -> Model
initModel hs ds = 
  let newCellInfo  = Array.map (\name -> {name = name, mkModel = Cell.text}) hs
  in
  {
    cellsInfo = newCellInfo
  , cells = dataToCells Cell.text newCellInfo ds 
  -- |> appendEmptyRow text (Array.length hs)
  }    

dataToCells : (String -> String -> Cell.Model) -> Array.Array CellInfo -> Array.Array (Array.Array String) -> Array2D.Array2D Cell.Model
dataToCells defaultMkModel info data = 
  Array2D.indexedMap 
    (\i j val ->  
        (Maybe.map (.mkModel) (Array.get i info) |> Maybe.withDefault defaultMkModel) (String.fromInt i ++ "-" ++ String.fromInt j) val
--  |> appendEmptyRow text (Array.length info)
    ) (Array2D.fromArray data)


rowToCells : (String -> String -> Cell.Model) -> Int -> Array.Array CellInfo -> Array.Array String -> Array.Array Cell.Model
rowToCells defaultMkModel i info row = 
  Array.indexedMap
    (\j val -> (Maybe.map (.mkModel) (Array.get i info) |> Maybe.withDefault defaultMkModel) (String.fromInt i ++ "-" ++ String.fromInt j) val
    ) row

setData : Model -> Array.Array (Array.Array String) -> Model
setData model ds = {model | cells = dataToCells Cell.text model.cellsInfo ds}
--|> appendEmptyRow Cell.text (Array.length model.cellsInfo)}

update : Msg -> Model -> (Model, Cmd Msg, Maybe (Array.Array (Array.Array String)))
update action model =
  case action of
    SetData ds -> (setData model ds, Cmd.none, Nothing)

    CellMsg i j msg -> 
      let res = Maybe.map (Cell.update msg) (Array2D.get i j model.cells)
      in
      case res of
        Just (cellModel, cellCmd, updatedValue) ->
          let 
            newCells = updateArray2D i j (\_ -> cellModel) model.cells
          in
          ({model | cells = newCells}, Cmd.map (CellMsg i j) cellCmd, if updatedValue then Array2D.map (.value) newCells |> toArrayOfArrays |> Just else Nothing)
        Nothing -> (model, Cmd.none, Nothing)

    AddRow i -> 
      let colsCnt = Array.length model.cellsInfo
          newCells = addRow i (Array2D.map (.value) model.cells) (Array.repeat (colsCnt - 1) "") |> toArrayOfArrays |> dataToCells Cell.text model.cellsInfo
      in
      ({model | cells = newCells}, Cmd.none, Array2D.map (.value) newCells |> \ds -> Array2D.deleteRow ((Array2D.rows ds) - 1) ds |> toArrayOfArrays |> Just )

    DeleteRow i -> 
      if i == Array2D.rows model.cells - 1 then
        (model, Cmd.none, Nothing)
      else
        let newCells = Array2D.deleteRow i model.cells
        in
        ({ model | cells = newCells}, Cmd.none, Array2D.map (.value) newCells |> \ds -> Array2D.deleteRow ((Array2D.rows ds) - 1) ds |> toArrayOfArrays |> Just)


view : Model -> Html.Html Msg
view model = avitoTable model
 
avitoTable : Model -> Html.Html Msg
avitoTable model = 
    let 
        cellsInfoL = Array.toList model.cellsInfo
        headP = List.map (\i -> [text i.name]) cellsInfoL

        -- cellsV = model.cells
        --         |> Array2D.indexedMap (\i _ c -> Maybe.withDefault (Cell.text) (Array.get i model.cellsInfo |> c.view))
        cellsV = Array2D.indexedMap (\i j c -> Html.map (CellMsg i j) (Cell.view c)) model.cells
        rows = List.range 0 ((Array2D.rows model.cells) - 1)
                |> List.map (\i -> Array2D.getRow i cellsV |> Maybe.withDefault Array.empty |> Array.toList)
    in
    Table.table {
      options = [ Table.bordered, Table.hover, Table.responsive ]
    , thead = (List.map (Table.th []) headP) ++ [Table.th [] []] |> Table.simpleThead 
    , tbody = Table.tbody [] (List.indexedMap (\i -> if i + 1 == List.length rows then avitoLastRow i else avitoRow i) (rows))
    -- , tbody = Table.tbody [] []
    }

avitoRow : Int -> List (Table.Cell Msg) -> Table.Row Msg
avitoRow i rowV = 
  Table.tr 
    [] 
    (rowV ++ [
      Table.td [] [
          Button.button [Button.small, Button.onClick (DeleteRow i)] [text "Удалить"]
        , Button.button [Button.small, Button.onClick (AddRow i)] [text "Добавить"]
        ]])

avitoLastRow : Int -> List (Table.Cell Msg) -> Table.Row Msg
avitoLastRow i rowV = Table.tr [] (rowV ++ [Table.td [] [Button.button [Button.small, Button.onClick (AddRow i)] [text "Добавить"]]])


toArrayOfArrays : Array2D.Array2D a -> Array.Array (Array.Array a)
toArrayOfArrays a = 
  List.range 0 ((Array2D.rows a) - 1) |> List.map (\i -> Array2D.getRow i a |> Maybe.withDefault Array.empty) |> Array.fromList

updateArray2D : Int -> Int -> (a -> a) -> Array2D.Array2D a -> Array2D.Array2D a
updateArray2D i j f ds =  Array2D.get i j ds |> Maybe.map f |> Maybe.map (\d -> Array2D.set i j d ds) |> Maybe.withDefault ds

-- defaultCell : Cell
-- defaultCell = {value = "", status = CellNormal}

appendEmptyRow : Cell.Model -> Int -> Array2D.Array2D Cell.Model -> Array2D.Array2D Cell.Model
appendEmptyRow defaultCell colsCnt ds = 
  if Array2D.rows ds == 0 then Array2D.fromList [List.repeat colsCnt defaultCell] else Array2D.appendRow (Array.fromList [defaultCell]) defaultCell ds

addRow : Int -> Array2D.Array2D a -> Array a -> Array2D.Array2D a
addRow i ds d = 
  let rows = toArrayOfArrays ds 
  in (Array.slice i (Array.length rows) rows) |> (\rs -> Array.append (Array.slice 0 i rows |> Array.push d) rs) |> Array2D.fromArray

-- getCellInfoWithDefault : Int -> Model -> CellInfo
-- getCellInfoWithDefault i model = 

mapBootstrapCell 