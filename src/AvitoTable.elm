module AvitoTable exposing (Msg, Model, update, view, initModel, setData)

import List as List
import Array as Array
import Array2D as Array2D
import Utils exposing (..)

import Html exposing (Html, text, table, tr, th, td)
import Html.Events exposing (onClick, on)
import Html.Attributes exposing (tabindex, style)
import Browser.Dom exposing (focus, Error)
import Task

import Json.Decode as Json
import Keyboard.Event exposing (KeyboardEvent, decodeKeyboardEvent)
import Keyboard.Key as Key exposing (Key(..))

import AvitoCell as Cell

type Msg = 
      SetData (Array.Array (Array.Array String))

    | DeleteRow Int
    | InsertRow Int

    | CellMsg Int Int Cell.Msg

    | CellClick Int Int

    | HandleKeyboardEvent KeyboardEvent
    | FocusResult (Result Error ())

type alias CellInfo = { 
    name : String
  , mkModel : String -> Cell.Model  
  }

type alias Model = {
      cellsInfo : Array.Array CellInfo
    , cells : Array2D.Array2D Cell.Model
    , rowsCnt : Int
    , colsCnt : Int
    , focused : Maybe (Int, Int)
    }

initModel : (Array.Array (String, (String -> Cell.Model))) -> Array.Array (Array.Array String) -> Model
initModel hs ds = 
  let colsCnt = Array.length hs
      cellsInfo  = Array.map (\(name, mkModel) -> {name = name, mkModel = mkModel}) hs
      ds2 = appendRow (Array.repeat colsCnt "") "" (Array2D.fromArray ds)
  in
  {
    cellsInfo = cellsInfo
  , cells = dataToCells Cell.text cellsInfo ds2 
  , rowsCnt = Array.length ds + 1
  , colsCnt = colsCnt
  , focused = Nothing
  }    

getData : Model -> Array.Array (Array.Array String)
getData model = Array2D.deleteRow (model.rowsCnt - 1) model.cells |> Array2D.map (.value) |> toArrayOfArrays

setData : Model -> Array.Array (Array.Array String) -> Model
setData model ds = initModel (Array.map (\i -> (i.name, i.mkModel)) model.cellsInfo) ds

update : Msg -> Model -> (Model, Cmd Msg, Maybe (Array.Array (Array.Array String)))
update action model =
  case action of
    SetData ds -> (setData model ds, Cmd.none, Nothing)

    CellClick i j -> 
      let newCells = 
            case model.focused of
              Just (iF, jF) -> model.cells |> updateArray2D iF jF Cell.savingFocusOut |> updateArray2D i j Cell.focusIn
              Nothing       -> model.cells |> updateArray2D i j Cell.focusIn
          newTask = Maybe.map (\c -> Task.attempt FocusResult <| focus (c.focusId (mkCellKey i j))) (Array2D.get i j newCells) |> Maybe.withDefault Cmd.none    
          newModel = {model | cells = newCells, focused = Just (i, j)}
      in (newModel,  newTask, Just <| getData newModel)

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
      let newCells = insertRow i model.cells (emptyCellsRow model.cellsInfo)
          newFocused = 
            case model.focused of
               Just (iF, jF) -> if iF == i then Just (iF + 1, jF) else Just (iF, jF)
               Nothing       -> Nothing
          newModel = {model | cells = newCells, rowsCnt = model.rowsCnt + 1, focused = newFocused}
          newTask = 
            case newFocused of
              Just (iF, jF) -> Maybe.map (\c -> Task.attempt FocusResult <| focus (c.focusId (mkCellKey iF jF))) (Array2D.get iF jF newCells) |> Maybe.withDefault Cmd.none    
              _ -> Cmd.none          
      in
      (newModel, newTask, Just <| getData newModel)

    DeleteRow i -> 
      if (Debug.log "deleting: " i) == model.rowsCnt - 1 then
        (model, Cmd.none, Nothing)
      else
        let newCells = Array2D.deleteRow i model.cells
            newCells2 = 
              case Debug.log "focused: " model.focused of
                Just (iF, jF) -> if iF == i then newCells |> updateArray2D iF jF Cell.focusIn else newCells
                _             -> newCells
            a = Debug.log "newCells2: " <| Array2D.indexedMap (\is js _ -> (is, js)) newCells2
            newModel = {model | cells = newCells2, rowsCnt = model.rowsCnt - 1}
            newTask = 
              case model.focused of
                Just (iF, jF) -> Maybe.map (\c -> Task.attempt FocusResult <| focus (c.focusId (mkCellKey iF jF))) (Array2D.get iF jF newCells) |> Maybe.withDefault Cmd.none    
                _ -> Cmd.none
        in
        (newModel, newTask, Just <| getData newModel)

    -- HandleKeyboardEvent event -> if (Debug.log "keyeveny:" event == event) then (model, Cmd.none, Nothing) else (model, Cmd.none, Nothing)
    HandleKeyboardEvent event -> 
      case Debug.log "model.focused: " <| model.focused of
        Just (iF, jF) -> 
          case Debug.log "keyCode: " <| event.keyCode of
            Enter -> moveFocus Right model
            Key.Right -> moveFocus Right model
            _ -> (model, Cmd.none, Nothing)
        _ -> (model, Cmd.none, Nothing)
          
          

    FocusResult result ->
      case Debug.log "FOCUS RESULT" result of
        Err _ -> (model, Cmd.none, Nothing)
        Ok _ -> (model, Cmd.none, Nothing)

view : Model -> Html.Html Msg
view model = avitoTable model
 
avitoTable : Model -> Html.Html Msg
avitoTable model = 
    let 
        cellsInfoL = Array.toList model.cellsInfo
        headP = List.map (\i -> [text i.name]) cellsInfoL

        cellsV = 
          Array2D.indexedMap 
            (\i j c -> 
              let attrs = 
                    case model.focused of
                      Nothing -> [style "border" "solid 1px black", style "width" "600px", onClick (CellClick i j)]
                      Just (iF, jF) -> 
                        if i == iF && j == jF 
                        then [style "border" "solid 1px red", style "width" "600px"]
                        else [style "border" "solid 1px black", style "width" "600px", onClick (CellClick i j)]
              in td attrs (List.map (Html.map (CellMsg i j)) (Cell.view (mkCellKey i j) c) )
            ) 
            model.cells
        rows = List.range 0 ((Array2D.rows model.cells) - 1)
                |> List.map (\i -> Array2D.getRow i cellsV |> Maybe.withDefault Array.empty |> Array.toList)
    in
    table [on "keydown" <| Json.map HandleKeyboardEvent decodeKeyboardEvent, tabindex 0] [
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

dataToCells : (String -> Cell.Model) -> Array.Array CellInfo -> Array2D.Array2D String -> Array2D.Array2D Cell.Model
dataToCells defaultMkModel info data = 
  Array2D.indexedMap 
    (\i j val ->  
        (Maybe.map (.mkModel) (Array.get j info) |> Maybe.withDefault defaultMkModel) val
--  |> appendEmptyRow text (Array.length info)
    ) data

emptyCellsRow : Array.Array CellInfo -> Array.Array Cell.Model
emptyCellsRow info = Array.map (\a -> a.mkModel "") info

appendEmptyCellsRow : Int -> Array.Array CellInfo -> Array2D.Array2D Cell.Model -> Array2D.Array2D Cell.Model
appendEmptyCellsRow i info data = appendRow (emptyCellsRow info) (Cell.text "") data

mkCellKey : Int -> Int -> String
mkCellKey i j = (String.fromInt i)  ++ "-" ++ (String.fromInt j)


type MoveFocus = Up | Right | Down | Left

moveFocus : MoveFocus -> Model -> (Model, Cmd Msg, Maybe (Array.Array (Array.Array String)))
moveFocus move model = 
      case Debug.log "model.focused: " <| model.focused of
        Just (iF, jF) -> 
          let (newIF, newJF) = newFocusIJ move model iF jF
              newFocused = Just (newIF, newJF)
              newCells = model.cells |> updateArray2D newIF newJF Cell.focusIn 
              newTask = 
                case Debug.log "newFocused" newFocused of
                  Just (iF2, jF2) -> Maybe.map (\c -> Task.attempt FocusResult <| focus (c.focusId (Debug.log "newTask" <| mkCellKey iF2 jF2))) (Array2D.get iF jF newCells) |> Maybe.withDefault Cmd.none    
                  _ -> Cmd.none              
              newModel = {model | cells = newCells, focused = newFocused}
          in
          (newModel, newTask, Just <| getData newModel)
        _ -> (model, Cmd.none, Nothing)

newFocusIJ : MoveFocus -> Model -> Int -> Int -> (Int, Int)
newFocusIJ move model i j = 
  case move of
    Right -> 
      let newI = if j == model.colsCnt - 1 then (if i == model.rowsCnt - 1 then 0 else i + 1) else i
          newJ = if j == model.colsCnt - 1 then 0 else j + 1
      in (newI, newJ)
    
    _ -> (i, j)