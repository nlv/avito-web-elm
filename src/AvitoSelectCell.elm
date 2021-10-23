module AvitoSelectCell exposing (Msg, Model, initModel, setValue, update, view, focusIn, savingFocusOut, cancelingFocusOut)

import Html exposing (Html)
import Html.Events exposing (onInput)
import Html.Attributes exposing (id, value, style, tabindex, selected)

import Keyboard.Events as KE
import Keyboard

type Msg = 
      Input String
    | None

type Status = Normal | Editable String

type alias Model = {
      value   : String  
    , options : List (String, String)
    , status  : Status
    }

initModel : String -> List (String, String) -> Model
initModel value options = {value = value, options = options, status = Normal}

focusId : String -> String
focusId key = "cell-editable-input-" ++ key

view : String -> Model  -> List (Html.Html Msg)
view key model = 
  let tableKeys = 
        KE.custom 
          KE.Keydown
          {preventDefault = True, stopPropagation = True}  
          [
            (Keyboard.ArrowRight, None)
          , (Keyboard.ArrowDown, None)
          , (Keyboard.ArrowLeft, None)
          , (Keyboard.ArrowUp, None)
          ] in
  case model.status of
    Normal -> [Html.span [style "width" "600px"] [Html.text model.value] ]  
    Editable _ -> [
          Html.select [tableKeys, id (focusId key), value model.value, tabindex (-1), style "width" "580px", style "border" "1px blue solid", onInput Input] <|
            List.map (\(v, n) -> Html.option [value v, selected (if v == model.value then True else False)] [Html.text n]) model.options
      ]    

setValue : Model -> String -> Model
setValue model value = {model | value = value}

focusIn : Model -> Model
focusIn model = 
  let newStatus = 
        case model.status of
          Normal -> Editable (model.value)
          Editable str -> Editable str
  in {model | status = newStatus}

savingFocusOut : Model -> Model
savingFocusOut model = {model | status = Normal}  

cancelingFocusOut : Model -> Model
cancelingFocusOut model = 
  let newValue = 
        case model.status of
          Normal -> model.value
          Editable str -> str
  in {model | value = newValue, status = Normal}    

update : Msg -> Model -> (Model, Cmd Msg, Bool)
update action model =
  case action of
    Input str -> ({ model | value = str}, Cmd.none, False)
    None -> (model, Cmd.none, False)

