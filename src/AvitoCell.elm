module AvitoCell exposing (Msg, Model, update, view, text, setValue)

import Task
import Html as Html
import Html.Events exposing (onClick)
import Html.Attributes exposing (id)
import Browser.Dom exposing (focus, Error)

import Bootstrap.Table as Table
import Bootstrap.Button as Button
import Bootstrap.Utilities.Flex as Flex
import Bootstrap.Form.Input as Input


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
    , normal  : String -> Table.Cell Msg
    , edit    : String -> Table.Cell Msg    
    , focusId : String
    }

text : String -> String -> Model
text key val0 = let focusId = "cell-editable-input-" ++ key in 
  { value = val0
  , key = key
  , status = Normal
  , normal = \val -> Table.td [Table.cellAttr (onClick SetEditable)] [Html.text val]
  , edit = \val -> Table.td [] [
      Html.div [Flex.inline] [
        Input.text [Input.attrs [id focusId], Input.small, Input.value val, Input.onInput Input]
      , Button.button [Button.small, Button.onClick SetNormal] [Html.text "V"]
      , Button.button [Button.small, Button.onClick CancelEditable] [Html.text "X"]
      ]
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

    SetEditable -> ({ model | status = Editable model.value}, Cmd.none, False)

    CancelEditable -> ({ model | status = Normal}, Task.attempt FocusResult (focus model.focusId), False)

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

view : Model -> Table.Cell Msg
view model = 
  case model.status of
    Normal       -> model.normal model.value
    Editable str -> model.edit str 

view2 : Model -> Table.Cell msg
view2 model = 
  case model.status of
    Normal       -> model.normal model.value
    Editable str -> model.edit str     
 
