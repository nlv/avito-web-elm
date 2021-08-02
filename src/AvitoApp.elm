module AvitoApp exposing (main)

import Html exposing (p, text)

import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid
import Bootstrap.Table as Table
import Html.Attributes exposing (attribute)

view : () -> Html.Html ()
view model = 
    Grid.container []
        [ CDN.stylesheet
        , avitoTable
        ]

main : Html.Html ()
main = view ()


avitoTable : Html.Html ()
avitoTable = 
    let editable = Table.cellAttr (attribute "contenteditable" "true") in
    Table.table {
      options = [ Table.bordered, Table.hover ]
    , thead = Table.simpleThead [ Table.th [] [text "Col1"], Table.th [] [text "Col2"] ]
    , tbody = Table.tbody [] [
            Table.tr [] [ Table.td [editable] [text "1.1"], Table.td [] [text "1.2"]]
        ,   Table.tr [] [ Table.td [] [text "2.1"], Table.td [] [text "2.2"]]
        ]
    }