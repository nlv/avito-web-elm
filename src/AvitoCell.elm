module AvitoCell exposing (Msg, Model, update, view, text, setValue)

import Task
import Html exposing (Html, td, input, button)
import Html.Events exposing (onClick, onInput)
import Html.Attributes exposing (id, value, style)
import Browser.Dom exposing (focus, Error)

type Msg = 
      SetValue String

    | Input String
    | SetEditable 
    | CancelEditable
    | SetNormal

    | FocusResult (Result Error ())

type Status = Normal | Editable String

type alias Model = {
      value   : String  
    , key     : String
    , status  : Status
    , normal  : String -> Html.Html Msg
    , edit    : String -> Html.Html Msg    
    , focusId : String
    }

text : String -> String -> Model
text key val0 = let focusId = "cell-editable-input-" ++ key in 
  { value = val0
  , key = key
  , status = Normal
  , normal = \val -> td [style "border" "solid 1px black", style "width" "600px", onClick SetEditable] [Html.text val]
  , edit = \val -> td [style "border" "solid 1px black", style "width" "600px"] [
        input [id focusId, value val, onInput Input] []
      , button [onClick SetNormal] [Html.text "V"] 
      , button [onClick CancelEditable] [Html.text "X"]
    ]  
  , focusId = focusId
  }

setValue : Model -> String -> Model
setValue model val = {model | value = val}

update : Msg -> Model -> (Model, Cmd Msg, Bool)
update action model =
  case action of
    SetValue val -> (setValue model val, Cmd.none, False)

    Input str -> ({ model | status = Editable str}, Cmd.none, False)

    SetEditable -> ({ model | status = Editable model.value}, Task.attempt FocusResult (focus (Debug.log "FOCUS" model.focusId)), False)

    CancelEditable -> ({ model | status = Normal}, Cmd.none, False)

    SetNormal -> 
      let newValue = 
            case model.status of 
              Normal -> model.value 
              Editable str -> str     
      in
        ({ model | value = newValue, status = Normal }, Cmd.none, True)

    FocusResult result ->
            case result of
                Err _ -> (model, Cmd.none, False)
                Ok _ -> (model, Cmd.none, False)

view : Model -> Html Msg
view model = 
  case model.status of
    Normal       -> model.normal model.value
    Editable str -> model.edit str 
