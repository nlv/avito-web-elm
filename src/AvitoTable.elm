port module AvitoTable exposing (Msg, Model, update, view, initModel, setData, subscriptions)

import List as List
import Array as Array
import Array.Extra as Array
import Array2D as Array2D
import Utils exposing (..)

import Html exposing (Html, text, table, tr, th, td)
import Html.Events exposing (onClick, onDoubleClick, on)
import Html.Attributes exposing (tabindex, style, autofocus, attribute, map)
import Browser.Dom exposing (focus, Error)
import Task

import Keyboard.Event exposing (KeyboardEvent)
import Keyboard.Key as Key exposing (Key(..))
import Keyboard.Events as KE
import Keyboard

import Json.Decode as D

import AvitoCell as Cell
import Array2D exposing (Array2D)
import Html exposing (Attribute)

port pasteReceiver : (String -> msg) -> Sub msg

subscriptions : Model id -> Sub Msg
subscriptions _ =
  pasteReceiver Paste

type Msg = 

      DeleteRow Int
    | InsertRow Int

    | DeleteCurrentRow
    | InsertCurrentRow 

    | MoveRight
    | MoveDown
    | MoveLeft
    | MoveUp
    | Unfocus

    | Paste String

    | CellMsg Int Int Cell.Msg

    | CellClick Int Int
    | DoubleCellClick Int Int    

    | HandleKeyboardEvent KeyboardEvent
    | FocusResult (Result Error ())

type alias CellInfo = { 
    name : String
  , mkModel : String -> Cell.Model  
  }

type CurrentState = Focused Int Int | NotFocused Int Int

type alias Model id = {
      cellsInfo : Array.Array CellInfo
    , cells : Array2D.Array2D Cell.Model
    , ids : Array.Array (Maybe id)
    , rowsCnt : Int
    , colsCnt : Int
    , current : Maybe CurrentState
    }

initModel : (Array.Array (String, (String -> Cell.Model))) -> Array.Array (id, (Array.Array String)) -> Model id
initModel hs ds = 
  let colsCnt = Array.length hs
      cellsInfo  = Array.map (\(name, mkModel) -> {name = name, mkModel = mkModel}) hs
      ds1 = Array.map (\(_,j) -> j) ds
      ds2 = appendRow (Array.repeat colsCnt "") "" (Array2D.fromArray ds1)
      ids1 = Array.map (\(i,_) -> Just i) ds
      ids2 = Array.push Nothing ids1 
  in
  {
    cellsInfo = cellsInfo
  , cells = dataToCells Cell.text cellsInfo ds2 
  , ids = ids2
  , rowsCnt = Array.length ds + 1
  , colsCnt = colsCnt
  , current = Nothing
  }    

getData : Model id -> Array.Array (Maybe id, (Array.Array String))
getData model = Array2D.deleteRow (model.rowsCnt - 1) model.cells |> Array2D.map (.value) |> toArrayOfArrays |> Array.zip model.ids

setData : Model id -> Array.Array (id, (Array.Array String)) -> Model id
setData model ds = 
  let setFocus newModel =
        case model.current of
          Just (Focused i j) -> { newModel | cells = newModel.cells |> updateArray2D i j Cell.focusIn, current = model.current }
          _ -> { newModel | current = model.current }
  in 
    initModel (Array.map (\i -> (i.name, i.mkModel)) model.cellsInfo) ds |> setFocus

update : Msg -> Model id -> (Model id, Cmd Msg, Maybe (Array.Array (Maybe id, (Array.Array String))))
update action model =
  case action of
    CellClick i j -> 
      let newCells = 
            case model.current of
              Just (Focused iF jF) -> model.cells |> updateArray2D iF jF Cell.savingFocusOut 
              _ -> model.cells 
          updating =  
            case model.current of
              Just (Focused _ _) -> Just <| getData newModel
              Just (NotFocused _ _) -> Nothing
              Nothing       -> Nothing              
          newTask = Cmd.none    
          newModel = {model | cells = newCells, current = Just (NotFocused i j)}
      in (newModel, newTask, updating)      

    DoubleCellClick i j -> 
      let newCells = 
            case model.current of
              Just (Focused iF jF) -> model.cells |> updateArray2D iF jF Cell.savingFocusOut |> updateArray2D i j Cell.focusIn
              Just (NotFocused _ _) -> model.cells |> updateArray2D i j Cell.focusIn
              Nothing       -> model.cells |> updateArray2D i j Cell.focusIn
          updating =  
            case model.current of
              Just (Focused _ _) -> Just <| getData newModel
              Just (NotFocused _ _) -> Nothing
              Nothing       -> Nothing
          newTask = Maybe.map (\c -> Task.attempt FocusResult <| focus (c.focusId (mkCellKey i j))) (Array2D.get i j newCells) |> Maybe.withDefault Cmd.none    
          newModel = {model | cells = newCells, current = Just (Focused i j)}
      in (newModel,  newTask, updating)      

    CellMsg i j msg -> 
      let res = Maybe.map (Cell.update msg) (Array2D.get i j model.cells)
      in
      case res of
        Just (cellModel, cellCmd, updatedValue) ->
          let 
            newCells0 = updateArray2D i j (\_ -> cellModel) model.cells
            (newCells, newIds) = 
              if model.rowsCnt == i + 1 
              then (appendEmptyCellsRow (i + 1) model.cellsInfo newCells0, Array.insertAt (i + 1) Nothing model.ids)
              else (newCells0, model.ids)
            newRowsCnt = Array2D.rows newCells
            newModel = {model | cells = newCells, ids = newIds, rowsCnt = newRowsCnt, current = Just (Focused i j)}
          in
          (
             newModel
           , Cmd.map (CellMsg i j) cellCmd
           , if updatedValue then Just <| getData newModel else Nothing
          )
        Nothing -> (model, Cmd.none, Nothing)

    InsertRow i -> 
      let newCells = insertRow i model.cells (emptyCellsRow model.cellsInfo)
          newIds = Array.insertAt i Nothing model.ids 
          newcurrent = 
            case model.current of
               Just (Focused iF jF) -> if iF == i then Just (Focused (iF + 1) jF) else Just (Focused iF jF)
               Just (NotFocused iF jF) -> if iF == i then Just (NotFocused (iF + 1) jF) else Just (NotFocused iF jF)
               Nothing       -> Nothing
          newModel = {model | cells = newCells, ids = newIds, rowsCnt = model.rowsCnt + 1, current = newcurrent}
          newTask = 
            case newcurrent of
              Just (Focused iF jF) -> Maybe.map (\c -> Task.attempt FocusResult <| focus (c.focusId (mkCellKey iF jF))) (Array2D.get iF jF newCells) |> Maybe.withDefault Cmd.none    
              _ -> Cmd.none          
      in
      (newModel, newTask, Just <| getData newModel)

    InsertCurrentRow -> 
      case model.current of
        Just (Focused iF jF) -> 
            let newCells = insertRow iF model.cells (emptyCellsRow model.cellsInfo)
                newIds = Array.insertAt iF Nothing model.ids
                (newIF, newJF) = (iF, jF)
                newModel = {model | cells = newCells, ids = newIds, rowsCnt = model.rowsCnt + 1, current = Just (Focused newIF newJF)}
                newTask = Maybe.map (\c -> Task.attempt FocusResult <| focus (c.focusId (mkCellKey newIF newJF))) (Array2D.get newIF newJF newCells) |> Maybe.withDefault Cmd.none    
            in
              (newModel, newTask, Just <| getData newModel)      
        Just (NotFocused iF jF) -> 
            let newCells = insertRow iF model.cells (emptyCellsRow model.cellsInfo)
                newIds = Array.insertAt iF Nothing model.ids
                (newIF, newJF) = (iF + 1, jF) 
                newModel = {model | cells = newCells, ids = newIds, rowsCnt = model.rowsCnt + 1, current = Just (NotFocused newIF newJF)}
            in
              (newModel, Cmd.none,  Just <| getData newModel)
        Nothing -> (model, Cmd.none,  Nothing)

    DeleteRow i -> 
      if i == model.rowsCnt - 1 then
        (model, Cmd.none, Nothing)
      else
        let newCells = Array2D.deleteRow i model.cells
            newIds = Array.removeAt i model.ids
            newCells2 = 
              case model.current of
                Just (Focused iF jF) -> if iF == i then newCells |> updateArray2D iF jF Cell.focusIn else newCells
                _             -> newCells
            newModel = {model | cells = newCells2, ids = newIds, rowsCnt = model.rowsCnt - 1}
            newTask = 
              case model.current of
                Just (Focused iF jF) -> Maybe.map (\c -> Task.attempt FocusResult <| focus (c.focusId (mkCellKey iF jF))) (Array2D.get iF jF newCells) |> Maybe.withDefault Cmd.none    
                _ -> Cmd.none
        in
        (newModel, newTask, Just <| getData newModel)

    DeleteCurrentRow -> 
      case model.current of
        Just (Focused iF jF) ->
          if iF == model.rowsCnt - 1 
          then (model, Cmd.none, Nothing)
          else
            let newCells = Array2D.deleteRow iF model.cells
                newCells2 = newCells |> updateArray2D iF jF Cell.focusIn
                newIds = Array.removeAt iF model.ids
                newModel = {model | cells = newCells2, ids = newIds, rowsCnt = model.rowsCnt - 1}
                newTask = 
                  Maybe.map (\c -> Task.attempt FocusResult <| focus (c.focusId (mkCellKey iF jF))) (Array2D.get iF jF newCells) |> Maybe.withDefault Cmd.none    
            in
              (newModel, newTask, Just <| getData newModel)        
        Just (NotFocused iF _) ->
          if iF == model.rowsCnt - 1 
          then (model, Cmd.none, Nothing)
          else
            let newCells = Array2D.deleteRow iF model.cells
                newIds = Array.removeAt iF model.ids
                newModel = {model | cells = newCells, ids = newIds, rowsCnt = model.rowsCnt - 1}
            in
              (newModel, Cmd.none, Just <| getData newModel)              

        Nothing -> (model, Cmd.none, Nothing)

    HandleKeyboardEvent event -> 
      case model.current of
        Just (NotFocused _ _) -> 
          case event.keyCode of
            Enter -> moveFocus Right model
            Key.Right -> moveFocus Right model
            Key.Tab -> moveFocus Right model
            Key.Left -> moveFocus Left model
            Key.Up -> moveFocus Up model
            Key.Down -> moveFocus Down model
            _ -> (model, Cmd.none, Nothing)
        Just (Focused iF jF) -> 
          case event.keyCode of
            Key.Escape -> 
              let newCells = model.cells |> updateArray2D iF jF Cell.savingFocusOut
              in ({model | cells = newCells, current = Just (NotFocused iF jF)}, Cmd.none, Nothing)
            Key.Tab -> moveFocus Right model
            _ -> (model, Cmd.none, Nothing)            
        _ -> (model, Cmd.none, Nothing)

    MoveRight -> moveFocus Right model
    MoveDown -> moveFocus Down model
    MoveLeft -> moveFocus Left model
    MoveUp -> moveFocus Up model

    Paste str -> 
      case model.current of
          Just (Focused iF jF) -> 
            let newCells = pasteData str (emptyCellsRow model.cellsInfo) model.cells iF jF
                newRowsCnt = Array2D.rows newCells
                newColsCnt = Array2D.columns newCells
            in ({model | cells = newCells, rowsCnt = newRowsCnt, colsCnt = newColsCnt}, Cmd.none, Nothing)
          Just (NotFocused iF jF) -> 
            let newCells = pasteData str (emptyCellsRow model.cellsInfo) model.cells iF jF
                newRowsCnt = Array2D.rows newCells
                newColsCnt = Array2D.columns newCells
                newModel = {model | cells = newCells, rowsCnt = newRowsCnt, colsCnt = newColsCnt}
            in (newModel, Cmd.none, Just <| getData newModel)
          Nothing -> (model, Cmd.none, Nothing)

    Unfocus -> 
      case model.current of
         Just (Focused iF jF) ->
           let newCells = model.cells |> updateArray2D iF jF Cell.cancelingFocusOut 
               newModel = {model | cells = newCells, current = Just (NotFocused iF jF)}
           in (newModel, Cmd.none, Nothing)

         _ -> (model, Cmd.none, Nothing)   
          
          
    FocusResult result ->
      case result of
        Err _ -> (model, Cmd.none, Nothing)
        Ok _ -> (model, Cmd.none, Nothing)

view : Model id -> (Msg -> pmsg) -> Html.Html pmsg -> (List (Html.Html pmsg) -> List (Html.Html pmsg)) -> (Int -> List (Html.Html pmsg) -> List (Html.Html pmsg)) -> List (Html.Html pmsg)
view model t hctl throw trow = 
  let attrs = List.map (Html.Attributes.map t) [tableKeys, onPaste Paste, attribute "contenteditable" "false"] 
  in [Html.div attrs <| Html.map t (topButtons model) :: avitoTable model t hctl throw trow :: viewModel model t hctl]

topButtons : Model id -> Html.Html Msg
topButtons _ = Html.div [] [
                        Html.button [tabindex (-1), onClick DeleteCurrentRow] [text "??????????????"]
                      , Html.button [tabindex (-1), onClick InsertCurrentRow] [text "????????????????"]]
 
avitoTable : Model id -> (Msg -> pmsg) -> Html.Html pmsg -> (List (Html.Html pmsg) -> List (Html.Html pmsg)) -> (Int -> List (Html.Html pmsg) -> List (Html.Html pmsg)) -> Html.Html pmsg
avitoTable model t hctl throw trow = 
    let 
        cellsInfoL = Array.toList model.cellsInfo
        headP = List.map (\i -> [text i.name]) cellsInfoL -- |> List.map (Html.map t) |> throw

        cellsV = 
          Array2D.indexedMap 
            (\i j c -> 
              let attrs = 
                    case model.current of
                      Nothing -> [style "border" "solid 1px black", style "width" "600px", onClick (CellClick i j), onDoubleClick (DoubleCellClick i j)]
                      Just (NotFocused iF jF) -> 
                        if i == iF && j == jF 
                        then [style "border" "solid 2px yellow", style "width" "600px", onDoubleClick (DoubleCellClick i j)]
                        else [style "border" "solid 1px black", style "width" "600px", onClick (CellClick i j), onDoubleClick (DoubleCellClick i j)]
                      Just (Focused iF jF) -> 
                        if i == iF && j == jF 
                        then [style "border" "solid 2px red", style "width" "600px", onDoubleClick (DoubleCellClick i j)]
                        else [style "border" "solid 1px black", style "width" "600px", onClick (CellClick i j), onDoubleClick (DoubleCellClick i j)]    
              in td attrs (List.map (Html.map (CellMsg i j)) (Cell.view (mkCellKey i j) c) )
            ) 
            model.cells
        rows = List.range 0 ((Array2D.rows model.cells) - 1)
                |> List.map (\i -> Array2D.getRow i cellsV |> Maybe.withDefault Array.empty |> Array.toList)
    in
    table (List.map (Html.Attributes.map t) [tabindex 1, autofocus True]) [
        -- Html.map t <| Html.thead [] <| List.map (th []) headP ++ [th [] []]
        (List.map (th []) headP) ++ [th [] []] |> List.map (Html.map t) |> throw |>  Html.thead [] 
      -- , Html.tbody [] <| hctl :: List.map (Html.map t) (List.indexedMap (\i -> if i + 1 == List.length rows then avitoLastRow i else avitoRow i) (rows))
      , Html.tbody [] <| hctl :: (List.indexedMap (\i -> if i + 1 == List.length rows then avitoLastRow i t trow else avitoRow i t trow) (rows))      
      ]

pasteData : String -> Array.Array Cell.Model -> Array2D.Array2D Cell.Model -> Int -> Int -> Array2D.Array2D Cell.Model
pasteData str default cells iF jF = 
  let colsCnt = Array2D.columns cells - jF + 1
      newVals = List.map (\s -> String.split "\t" s |> List.take colsCnt) <| String.lines str
      newRowsCnt = iF + List.length newVals - Array2D.rows cells - 1
      newCells = if newRowsCnt > 0 then Utils.appendRows newRowsCnt default (Cell.text "") cells else cells
      newVals2 = List.map2 (\i row -> List.map2 (\j col -> (col, i, j)) (List.range jF (Array2D.columns cells - 1)) row) (List.range iF (iF + List.length newVals - 2)) newVals |> List.concat
  in 
    List.foldr 
      (\(v, i, j) cs -> updateArray2D i j (\cell -> Cell.setValue cell v) cs)
      newCells
      newVals2


tableKeys = 
  KE.custom 
    KE.Keydown
    {preventDefault = True, stopPropagation = True}  
    [
      (Keyboard.ArrowRight, MoveRight)
    , (Keyboard.Tab, MoveRight)
    , (Keyboard.Enter, MoveRight)    
    , (Keyboard.ArrowDown, MoveDown)
    , (Keyboard.ArrowLeft, MoveLeft)
    , (Keyboard.ArrowUp, MoveUp)
    , (Keyboard.Escape, Unfocus)    
    ]   

avitoRow : Int -> (Msg -> pmsg) -> (Int -> List (Html.Html pmsg) -> List (Html.Html pmsg)) -> List (Html Msg) -> Html pmsg
avitoRow i t trow rowV = 
  tr 
    [style "height" "1.5em"] 
    (trow i (List.map (Html.map t) rowV))


avitoLastRow : Int -> (Msg -> pmsg) -> (Int -> List (Html.Html pmsg) -> List (Html.Html pmsg)) -> List (Html.Html Msg) -> Html.Html pmsg
avitoLastRow i t trow rowV = 
  tr [style "height" "1.5em"] (trow i (List.map (Html.map t) rowV))

dataToCells : (String -> Cell.Model) -> Array.Array CellInfo -> Array2D.Array2D String -> Array2D.Array2D Cell.Model
dataToCells defaultMkModel info data = 
  Array2D.indexedMap 
    (\_ j val ->  
        (Maybe.map (.mkModel) (Array.get j info) |> Maybe.withDefault defaultMkModel) val
    ) data

viewModel : Model id -> (Msg -> pmsg) -> Html.Html pmsg -> List (Html.Html pmsg)
viewModel model t hcontrol = 
  let currentText = 
        case model.current of
           Just (Focused iF jF) -> "?????????????????????????? ???????????? " ++ String.fromInt iF ++ " " ++ String.fromInt jF
           Just (NotFocused iF jF) -> "?????????????????? ???????????? " ++ String.fromInt iF ++ " " ++ String.fromInt jF
           Nothing -> "?????????????????????? ???????????? ??????"
  in List.map (Html.map t) [ Html.div [] [Html.text currentText]]

emptyCellsRow : Array.Array CellInfo -> Array.Array Cell.Model
emptyCellsRow info = Array.map (\a -> a.mkModel "") info

appendEmptyCellsRow : Int -> Array.Array CellInfo -> Array2D.Array2D Cell.Model -> Array2D.Array2D Cell.Model
appendEmptyCellsRow i info data = appendRow (emptyCellsRow info) (Cell.text "") data

mkCellKey : Int -> Int -> String
mkCellKey i j = (String.fromInt i)  ++ "-" ++ (String.fromInt j)

type MoveFocus = Up | Right | Down | Left

moveFocus : MoveFocus -> Model id -> (Model id, Cmd Msg, Maybe (Array.Array (Maybe id, (Array.Array String))))
moveFocus move model = 
      case model.current of
        Just (NotFocused iF jF) -> 
          let (newIF, newJF) = newFocusIJ move model iF jF
              newModel = {model | current = Just (NotFocused newIF newJF)}
          in
          (newModel, Cmd.none, Nothing)
        Just (Focused iF jF) -> 
          let (newIF, newJF) = newFocusIJ move model iF jF
              newcurrent = Just (Focused newIF newJF)
              newCells = model.cells |> updateArray2D newIF newJF Cell.focusIn |> updateArray2D iF jF Cell.savingFocusOut
              newTask = Maybe.map (\c -> Task.attempt FocusResult <| focus (c.focusId (mkCellKey newIF newJF))) (Array2D.get newIF newJF newCells) |> Maybe.withDefault Cmd.none 
              newModel = {model | cells = newCells, current = newcurrent}
          in
          (newModel, newTask, Just <| getData newModel)          
        _ -> (model, Cmd.none, Nothing)

newFocusIJ : MoveFocus -> Model id -> Int -> Int -> (Int, Int)
newFocusIJ move model i j = 
  case move of
    Right -> 
      let newI = if j == model.colsCnt - 1 then (if i == model.rowsCnt - 1 then 0 else i + 1) else i
          newJ = if j == model.colsCnt - 1 then 0 else j + 1
      in (newI, newJ)

    Left -> 
      let newI = if j == 0 then (if i == 0 then model.rowsCnt - 1 else i - 1) else i
          newJ = if j == 0 then model.colsCnt - 1 else j - 1
      in (newI, newJ)      

    Down -> 
      let newJ = if i == model.rowsCnt - 1 then (if j == model.colsCnt - 1 then 0 else j + 1) else j
          newI = if i == model.rowsCnt - 1 then 0 else i + 1
      in (newI, newJ)      

    Up -> 
      let newJ = if i == 0 then (if j == 0 then model.colsCnt - 1 else j - 1) else j
          newI = if i == 0 then model.rowsCnt - 1 else i - 1
      in (newI, newJ)      
    

clipboardData : D.Decoder String
clipboardData = D.field "clipbloardData" D.string

onPaste : (String -> msg) -> Html.Attribute msg
onPaste msg = on "paste" (D.map msg clipboardData)