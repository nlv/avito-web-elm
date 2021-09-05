module AvitoCell exposing (Msg, Model, update, view, text, select, setValue, focusIn, savingFocusOut, cancelingFocusOut)

import Browser.Dom exposing (Error)

import Html exposing (Html)
import Html.Events exposing (onInput)
import Html.Attributes exposing (id, value, style, selected, tabindex)

import Keyboard.Events as KE
import Keyboard

type Msg = 
      SetValue String

    | Input String
    | SetNormal
    | Click

    | FocusResult (Result Error ())
    
    | None


type Status = Normal | Editable String

type alias Model = {
      value   : String  
    -- , key     : String
    , status  : Status
    , normal  : String -> String -> List (Html.Html Msg)
    , edit    : String -> String -> List (Html.Html Msg)
    , focusId : String -> String
    }

text : String -> Model
text val0 = let focusId key = "cell-editable-input-" ++ key in 
  { value = val0
  , status = Normal
  , normal = \_ val -> [Html.span [style "width" "600px"] [Html.text val] ]
  , edit = \key val -> [
        Html.input [id (focusId key), value val, tabindex (-1), onInput Input, style "width" "580px", style "border" "1px blue solid"] []

    ]  
  , focusId = focusId
  }

select : List (String, String) -> String -> Model
select options val0 = 
  let focusId key = "cell-editable-input-" ++ key 
      tableKeys = 
        KE.custom 
          KE.Keydown
          {preventDefault = True, stopPropagation = True}  
          [
            (Keyboard.ArrowRight, None)
          , (Keyboard.ArrowDown, None)
          , (Keyboard.ArrowLeft, None)
          , (Keyboard.ArrowUp, None)
          ] in
    { value = val0
    -- , key = key
    , status = Normal
    , normal = \_ val -> [Html.span [style "width" "600px"] [Html.text val] ]  
    , edit = \key val -> [
          Html.select [tableKeys, id (focusId key), value val, tabindex (-1), style "width" "580px", style "border" "1px blue solid", onInput Input] <|
            List.map (\(v, n) -> Html.option [value v, selected (if v == val0 then True else False)] [Html.text n]) options
      ]    
    , focusId = focusId
    }  

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
    SetValue val -> (setValue model val, Cmd.none, False)

    Input str -> ({ model | value = str}, Cmd.none, False)

    SetNormal -> ({ model | status = Normal }, Cmd.none, True)

    FocusResult result ->
            case result of
                Err _ -> (model, Cmd.none, False)
                Ok _ -> (model, Cmd.none, False)

    Click -> (model, Cmd.none, False)
    None -> (model, Cmd.none, False)

view : String -> Model -> List (Html Msg)
view key model = 
  case model.status of
    Normal       -> model.normal key model.value
    Editable _   -> model.edit key model.value

