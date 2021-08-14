module AvitoCell exposing (Msg, Model, update, view, text, setValue)

import Task
import Browser.Dom exposing (focus, Error)

import Html exposing (Html, Attribute, td, input)
import Html.Events exposing (onClick, onInput, on, onBlur, keyCode)
import Html.Attributes exposing (id, value, style)

import Json.Decode as Json



type Msg = 
      SetValue String

    | Input String
    | SetEditable 
    | SetNormal

    | FocusResult (Result Error ())
    | KeyUp Int


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
        input [id focusId, value val, onInput Input, onKeyUp KeyUp, onBlur SetNormal, style "width" "580px", style "border" "none"] []
    ]  
  , focusId = focusId
  }

setValue : Model -> String -> Model
setValue model val = {model | value = val}

update : Msg -> Model -> (Model, Cmd Msg, Bool)
update action model =
  case action of
    SetValue val -> (setValue model val, Cmd.none, False)

    Input str -> ({ model | value = str}, Cmd.none, False)

    SetEditable -> ({ model | status = Editable model.value}, Task.attempt FocusResult (focus model.focusId), False)

    SetNormal -> ({ model | status = Normal }, Cmd.none, True)

    FocusResult result ->
            case result of
                Err _ -> (model, Cmd.none, False)
                Ok _ -> (model, Cmd.none, False)

    KeyUp 27 -> (calceledModel model, Cmd.none, False)
    KeyUp _ ->  (model, Cmd.none, False)          

calceledModel : Model -> Model
calceledModel model = 
      let newValue = case model.status of 
                        Editable str -> str  
                        _ -> model.value
      in { model | status = Normal, value = newValue}

view : Model -> Html Msg
view model = 
  case model.status of
    Normal       -> model.normal model.value
    Editable _   -> model.edit model.value

onKeyUp : (Int -> msg) -> Attribute msg
onKeyUp tagger =
  on "keydown" (Json.map tagger keyCode)