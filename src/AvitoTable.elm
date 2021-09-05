module AvitoTable exposing (Msg, Model, update, view, initModel, setData)

import List as List
import Array as Array
import Array2D as Array2D
import Utils exposing (..)

import Html exposing (Html, text, table, tr, th, td)
import Html.Events exposing (onClick, onDoubleClick)
import Html.Attributes exposing (tabindex, style, autofocus)
import Browser.Dom exposing (focus, Error)
import Task

import Keyboard.Event exposing (KeyboardEvent)
import Keyboard.Key as Key exposing (Key(..))
import Keyboard.Events as KE
import Keyboard

import AvitoCell as Cell

type Msg = 
      SetData (Array.Array (Array.Array String))

    | DeleteRow Int
    | InsertRow Int

    | DeleteCurrentRow
    | InsertCurrentRow 

    | MoveRight
    | MoveDown
    | MoveLeft
    | MoveUp
    | Unfocus

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

type alias Model = {
      cellsInfo : Array.Array CellInfo
    , cells : Array2D.Array2D Cell.Model
    , rowsCnt : Int
    , colsCnt : Int
    , current : Maybe CurrentState
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
  , current = Nothing
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
            case model.current of
              Just (Focused iF jF) -> model.cells |> updateArray2D iF jF Cell.savingFocusOut 
              _ -> model.cells 
          newTask = Cmd.none    
          newModel = {model | cells = newCells, current = Just (NotFocused i j)}
      in (newModel, newTask, Just <| getData newModel)      

    DoubleCellClick i j -> 
      let newCells = 
            case model.current of
              Just (Focused iF jF) -> model.cells |> updateArray2D iF jF Cell.savingFocusOut |> updateArray2D i j Cell.focusIn
              Just (NotFocused _ _) -> model.cells |> updateArray2D i j Cell.focusIn
              Nothing       -> model.cells |> updateArray2D i j Cell.focusIn
          newTask = Maybe.map (\c -> Task.attempt FocusResult <| focus (c.focusId (mkCellKey i j))) (Array2D.get i j newCells) |> Maybe.withDefault Cmd.none    
          newModel = {model | cells = newCells, current = Just (Focused i j)}
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
            newModel = {model | cells = newCells, rowsCnt = newRowsCnt, current = Just (Focused i j)}
          in
          (
             newModel
           , Cmd.map (CellMsg i j) cellCmd
           , if updatedValue then Just <| getData newModel else Nothing
          )
        Nothing -> (model, Cmd.none, Nothing)

    InsertRow i -> 
      let newCells = insertRow i model.cells (emptyCellsRow model.cellsInfo)
          newcurrent = 
            case model.current of
               Just (Focused iF jF) -> if iF == i then Just (Focused (iF + 1) jF) else Just (Focused iF jF)
               Just (NotFocused iF jF) -> if iF == i then Just (NotFocused (iF + 1) jF) else Just (NotFocused iF jF)
               Nothing       -> Nothing
          newModel = {model | cells = newCells, rowsCnt = model.rowsCnt + 1, current = newcurrent}
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
                (newIF, newJF) = (iF, jF)
                newModel = {model | cells = newCells, rowsCnt = model.rowsCnt + 1, current = Just (Focused newIF newJF)}
                newTask = Maybe.map (\c -> Task.attempt FocusResult <| focus (c.focusId (mkCellKey newIF newJF))) (Array2D.get newIF newJF newCells) |> Maybe.withDefault Cmd.none    
            in
              (newModel, newTask, Just <| getData newModel)      
        Just (NotFocused iF jF) -> 
            let newCells = insertRow iF model.cells (emptyCellsRow model.cellsInfo)
                (newIF, newJF) = (iF + 1, jF) 
                newModel = {model | cells = newCells, rowsCnt = model.rowsCnt + 1, current = Just (NotFocused newIF newJF)}
            in
              (newModel, Cmd.none, Nothing)
        Nothing -> (model, Cmd.none, Nothing)

    DeleteRow i -> 
      if i == model.rowsCnt - 1 then
        (model, Cmd.none, Nothing)
      else
        let newCells = Array2D.deleteRow i model.cells
            newCells2 = 
              case model.current of
                Just (Focused iF jF) -> if iF == i then newCells |> updateArray2D iF jF Cell.focusIn else newCells
                _             -> newCells
            newModel = {model | cells = newCells2, rowsCnt = model.rowsCnt - 1}
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
                newModel = {model | cells = newCells2, rowsCnt = model.rowsCnt - 1}
                newTask = 
                  Maybe.map (\c -> Task.attempt FocusResult <| focus (c.focusId (mkCellKey iF jF))) (Array2D.get iF jF newCells) |> Maybe.withDefault Cmd.none    
            in
              (newModel, newTask, Just <| getData newModel)        
        Just (NotFocused iF _) ->
          if iF == model.rowsCnt - 1 
          then (model, Cmd.none, Nothing)
          else
            let newCells = Array2D.deleteRow iF model.cells
                newModel = {model | cells = newCells, rowsCnt = model.rowsCnt - 1}
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

view : Model -> List (Html.Html Msg)
view model = [Html.div [tableKeys] <|topButtons model :: avitoTable model :: viewModel model]

topButtons : Model -> Html.Html Msg
topButtons _ = Html.div [] [
                        Html.button [tabindex (-1), onClick DeleteCurrentRow] [text "Удалить"]
                      , Html.button [tabindex (-1), onClick InsertCurrentRow] [text "Добавить"]]
 
avitoTable : Model -> Html.Html Msg
avitoTable model = 
    let 
        cellsInfoL = Array.toList model.cellsInfo
        headP = List.map (\i -> [text i.name]) cellsInfoL

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
    table [tabindex 1, autofocus True] [      
        Html.thead [] <| List.map (th []) headP ++ [th [] []]
      , Html.tbody [] (List.indexedMap (\i -> if i + 1 == List.length rows then avitoLastRow i else avitoRow i) (rows))
    ]


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

avitoRow : Int -> List (Html Msg) -> Html Msg
avitoRow _ rowV = 
  tr 
    [style "height" "1.5em"] 
    rowV

avitoLastRow : Int -> List (Html.Html Msg) -> Html.Html Msg
avitoLastRow _ rowV = Html.tr [style "height" "1.5em"] rowV

dataToCells : (String -> Cell.Model) -> Array.Array CellInfo -> Array2D.Array2D String -> Array2D.Array2D Cell.Model
dataToCells defaultMkModel info data = 
  Array2D.indexedMap 
    (\_ j val ->  
        (Maybe.map (.mkModel) (Array.get j info) |> Maybe.withDefault defaultMkModel) val
    ) data

viewModel : Model -> List (Html.Html Msg)
viewModel model = 
  let currentText = 
        case model.current of
           Just (Focused iF jF) -> "Сфокусирована ячейка " ++ String.fromInt iF ++ " " ++ String.fromInt jF
           Just (NotFocused iF jF) -> "Курсована ячейка " ++ String.fromInt iF ++ " " ++ String.fromInt jF
           Nothing -> "Курсовонной ячейки нет"
  in [ Html.div [] [Html.text currentText]]

emptyCellsRow : Array.Array CellInfo -> Array.Array Cell.Model
emptyCellsRow info = Array.map (\a -> a.mkModel "") info

appendEmptyCellsRow : Int -> Array.Array CellInfo -> Array2D.Array2D Cell.Model -> Array2D.Array2D Cell.Model
appendEmptyCellsRow i info data = appendRow (emptyCellsRow info) (Cell.text "") data

mkCellKey : Int -> Int -> String
mkCellKey i j = (String.fromInt i)  ++ "-" ++ (String.fromInt j)

type MoveFocus = Up | Right | Down | Left

moveFocus : MoveFocus -> Model -> (Model, Cmd Msg, Maybe (Array.Array (Array.Array String)))
moveFocus move model = 
      case model.current of
        Just (NotFocused iF jF) -> 
          let (newIF, newJF) = newFocusIJ move model iF jF
              newcurrent = Just (NotFocused newIF newJF)
              newCells = model.cells
              newTask = Cmd.none              
              newModel = {model | cells = newCells, current = newcurrent}
          in
          (newModel, newTask, Nothing)
        Just (Focused iF jF) -> 
          let (newIF, newJF) = newFocusIJ move model iF jF
              newcurrent = Just (Focused newIF newJF)
              newCells = model.cells |> updateArray2D newIF newJF Cell.focusIn |> updateArray2D iF jF Cell.savingFocusOut
              newTask = Maybe.map (\c -> Task.attempt FocusResult <| focus (c.focusId (mkCellKey newIF newJF))) (Array2D.get newIF newJF newCells) |> Maybe.withDefault Cmd.none 
              newModel = {model | cells = newCells, current = newcurrent}
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
    
