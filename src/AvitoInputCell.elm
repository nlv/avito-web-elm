module AvitoInputCell exposing (Msg, Model, initModel, setValue, update, view, focusIn, savingFocusOut, cancelingFocusOut)

import Html exposing (Html)
import Html.Events exposing (onInput)
import Html.Attributes exposing (id, value, style, tabindex)

import Keyboard.Events as KE
import Keyboard

type Msg = 
      Input String
    | None

type Status = Normal | Editable String

type alias Model = {
      value   : String  
    , status  : Status
    }

initModel : String -> Model
initModel value = {value = value, status = Normal}

focusId : String -> String
focusId key = "cell-editable-input-" ++ key

view : String -> Model -> List (Html.Html Msg)
view key model = 
  case model.status of
    Normal -> [Html.span [style "width" "600px"] [Html.text model.value] ]
    Editable val0 -> [
        Html.input [id (focusId key), value val0, tabindex (-1), onInput Input, style "width" "580px", style "border" "1px blue solid"] []
      ]

setValue : Model -> String -> Model
setValue model val = {model | value = val}

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

