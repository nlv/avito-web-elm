module AvitoApp exposing (main)

import List as List
import Tuple as Tuple

import Html exposing (p, text)

import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid
import Bootstrap.Table as Table
import Bootstrap.Form.Input as Input
import Html.Attributes exposing (attribute)
import Bootstrap.Carousel exposing (Msg)

view : Model -> Html.Html ()
view model = 
    Grid.container []
        [ CDN.stylesheet
        , avitoTable model
        ]


{- ------ -}

type CellMessage = 
    CellUpdate Int String

type alias CellInfo = { name : String, normal : String -> List (Html.Html ()), edit : String -> List (Html.Html CellMessage) }

textCell : String -> Int -> CellInfo  
textCell n i = { name = n, normal = \t -> [text t], edit = \t -> [Input.text  [Input.value t, Input.onInput (CellUpdate i)]]  }

type CellStatus = CellNormal -- | CellEditable

type alias Cell = { value : String, status : CellStatus}

{- ----- -}

type alias Model = {
      cellsInfo : List CellInfo
    , cells : List Cell
    }

initCell : Cell
initCell = { value = "", status = CellNormal }

initModel : Model
initModel = {
      cellsInfo = [textCell "col1" 0, textCell "col2" 1, textCell "col3" 2]
    , cells = [initCell, initCell, initCell]
    }

-- type Message = MCellMessage CellMessage

main : Html.Html ()
main = view initModel


avitoTable : Model -> Html.Html ()
avitoTable model = 
    let 
        headP = List.map (\i -> [text i.name]) model.cellsInfo
        cellsP = List.map viewCell (List.map2 Tuple.pair model.cellsInfo model.cells)
        viewCell (info, cell) = case cell.status of
                                 CellNormal -> info.normal cell.value 
    in
    Table.table {
      options = [ Table.bordered, Table.hover ]
    , thead = Table.simpleThead (List.map (\h -> Table.th [] h) headP) 
    , tbody = Table.tbody [] [
            Table.tr [] (List.map (\c -> Table.td [] c) cellsP)-- [ Table.td [] cellsP ]
        ]
    }