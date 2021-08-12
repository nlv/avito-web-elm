module AvitoTable exposing (Msg, Model, update, view, initModel, setData)

import List as List
import Array as Array
import Array2D as Array2D
import Utils exposing (..)

import Html exposing (Html, text, table, tr, th, td)
import Html.Events exposing (onClick)

import AvitoCell as Cell

type Msg = 
      SetData (Array.Array (Array.Array String))

    | DeleteRow Int
    | InsertRow Int

    | CellMsg Int Int Cell.Msg

type alias CellInfo = { 
    name : String
  , mkModel : String -> String -> Cell.Model  
  }

type alias Model = {
      cellsInfo : Array.Array CellInfo
    , cells : Array2D.Array2D Cell.Model
    , rowsCnt : Int
    , colsCnt : Int
    }

initModel : (Array.Array String) -> Array.Array (Array.Array String) -> Model
initModel hs ds = 
  let colsCnt = Array.length hs
      cellsInfo  = Array.map (\name -> {name = name, mkModel = Cell.text}) hs
      ds2 = appendRow (Array.repeat colsCnt "") "" (Array2D.fromArray ds)
  in
  {
    cellsInfo = cellsInfo
  , cells = dataToCells Cell.text cellsInfo ds2 
  , rowsCnt = Array.length ds + 1
  , colsCnt = colsCnt
  }    

getData : Model -> Array.Array (Array.Array String)
getData model = Array2D.deleteRow (model.rowsCnt - 1) model.cells |> Array2D.map (.value) |> toArrayOfArrays

setData : Model -> Array.Array (Array.Array String) -> Model
setData model ds = initModel (Array.map (.name) model.cellsInfo) ds

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
            newCells0 = updateArray2D i j (\_ -> cellModel) model.cells
            newCells = 
              if model.rowsCnt == i + 1 
              then appendEmptyCellsRow (i + 1) model.cellsInfo newCells0
              else newCells0
            newRowsCnt = Array2D.rows newCells
            newModel = {model | cells = newCells, rowsCnt = newRowsCnt}
          in
          (
             newModel
           , Cmd.map (CellMsg i j) cellCmd
           , if updatedValue then Just <| getData newModel else Nothing
          )
        Nothing -> (model, Cmd.none, Nothing)

    InsertRow i -> 
      let newCells = insertRow i model.cells (emptyCellsRow i model.cellsInfo)
          newModel = {model | cells = newCells, rowsCnt = model.rowsCnt + 1}
      in
      (newModel, Cmd.none, Just <| getData newModel)

    DeleteRow i -> 
      if i == model.rowsCnt - 1 then
        (model, Cmd.none, Nothing)
      else
        let newCells = Array2D.deleteRow i model.cells
            newModel = {model | cells = newCells, rowsCnt = model.rowsCnt - 1}
        in
        (newModel, Cmd.none, Just <| getData newModel)

view : Model -> Html.Html Msg
view model = avitoTable model
 
avitoTable : Model -> Html.Html Msg
avitoTable model = 
    let 
        cellsInfoL = Array.toList model.cellsInfo
        headP = List.map (\i -> [text i.name]) cellsInfoL

        cellsV = Array2D.indexedMap (\i j c -> Html.map (CellMsg i j) (Cell.view c)) model.cells
        rows = List.range 0 ((Array2D.rows model.cells) - 1)
                |> List.map (\i -> Array2D.getRow i cellsV |> Maybe.withDefault Array.empty |> Array.toList)
    in
    table [] [
        Html.thead [] <| List.map (th []) headP ++ [th [] []]
      , Html.tbody [] (List.indexedMap (\i -> if i + 1 == List.length rows then avitoLastRow i else avitoRow i) (rows))
    ]

avitoRow : Int -> List (Html Msg) -> Html Msg
avitoRow i rowV = 
  tr 
    [] 
    (rowV ++ [
      td [] [
          Html.button [onClick (DeleteRow i)] [text "Удалить"]
        , Html.button [onClick (InsertRow i)] [text "Добавить"]
        ]])

avitoLastRow : Int -> List (Html.Html Msg) -> Html.Html Msg
avitoLastRow i rowV = Html.tr [] (rowV ++ [Html.td [] [Html.button [onClick (InsertRow i)] [text "Добавить"]]])

dataToCells : (String -> String -> Cell.Model) -> Array.Array CellInfo -> Array2D.Array2D String -> Array2D.Array2D Cell.Model
dataToCells defaultMkModel info data = 
  Array2D.indexedMap 
    (\i j val ->  
        (Maybe.map (.mkModel) (Array.get i info) |> Maybe.withDefault defaultMkModel) (String.fromInt i ++ "-" ++ String.fromInt j) val
--  |> appendEmptyRow text (Array.length info)
    ) data

emptyCellsRow : Int -> Array.Array CellInfo -> Array.Array Cell.Model
emptyCellsRow i info = Array.indexedMap (\j a -> a.mkModel (mkCellKey i j) "") info

appendEmptyCellsRow : Int -> Array.Array CellInfo -> Array2D.Array2D Cell.Model -> Array2D.Array2D Cell.Model
appendEmptyCellsRow i info data = appendRow (emptyCellsRow (i + 1) info) (Cell.text (mkCellKey i 0) "") data

mkCellKey : Int -> Int -> String
mkCellKey i j = (String.fromInt i)  ++ "-" ++ (String.fromInt j)