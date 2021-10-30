module AvitoApp exposing (main)

import Array as Array
import List exposing (foldr)

import Platform.Cmd as Cmd
import Html
import Html.Attributes exposing (value)
import Html.Events exposing (onClick)
import Http
import Browser
import Maybe.Extra as Maybe
import Array.Extra as Array

import Json.Decode as D
import Json.Encode as E
import Json.Decode.Extra exposing (andMap)

import AvitoTable as Table
import AvitoCell as Cell
import Html.Events exposing (onInput)

import UUID
import Random
import Procedure
import Procedure.Program


type Msg = 
    AvitoTable Table.Msg 
  | GotInitialData (Result Http.Error (List ForHouse)) 
  | DataPosted (Result Http.Error (List ForHouse))
  | RefreshData

  | RandText Int
  | InputRandText Int String
  | GotRandText Int (Result Http.Error (List String)) 

  | ProcedureMsg (Procedure.Program.Msg Msg)

type HttpStatus = Failure String | Loading String | Success

-- type alias FirstRow = {
--     id   : Int
--   , col1 : String
--   , col2 : String
--   , col3 : String
--   }

type alias ForHouse = {
    id           : Int
  , oid          : String
  , category     : String
  , goodsType    : String
  , title        : String
  , description  : String
  , price        : String
  -- , imageNames   : String
  , videoUrl     : String
  , addrRegion   : String
  , addrCity     : String
  , addrPoint    : String
  , addrStreet   : String
  , addrHouse    : String
  , contactPhone : String
  }

type alias Model = {
    httpStatus : HttpStatus 
  , avitoTable : Table.Model String
  -- , data : List FirstRow
  , data : Array.Array ForHouse
  , randText : Array.Array (Maybe String)

  , procModel: Procedure.Program.Model Msg
  }

initModel : Model
initModel = 
  let categories = toPair ["Бытовая техника", "Мебель и интерьер", "Посуда и товары для кухни", "Продукты питания", "Ремонт и строительство", "Растения"]
      goodsTypes = toPair ["Кондиционеры", "Изоляция"]
      regions = toPair ["Москва", "Омская обл.", "Новосибирская обл."]
      cities = toPair ["Москва", "Омск", "Новосибирск"]
      toPair = List.map (\i -> (i, i)) 
  in
  {
    httpStatus = Loading "Получаем данные"
  , avitoTable = 
      Table.initModel 
        (Array.fromList [
              ("Категория", Cell.select categories)
            , ("Тип договора", Cell.select goodsTypes)
            , ("Заголовок", Cell.text)
            , ("Описание", Cell.text)
            , ("Цена", Cell.text)
            , ("Ссылка на видео", Cell.text)
            , ("Регион РФ", Cell.select regions)
            , ("Город", Cell.select cities)
            , ("Район населенного пункт", Cell.text)
            , ("Улица", Cell.text)
            , ("Номер дома", Cell.text)
            , ("Контактный телефон", Cell.text)
            ]
          ) 
          Array.empty
  , data = Array.fromList []
  , randText = Array.fromList [Nothing, Nothing, Just "", Just "", Nothing, Nothing, Nothing, Nothing, Nothing, Nothing, Nothing, Nothing]

  , procModel = Procedure.Program.init
  }

decodeForHousesList : D.Decoder (List ForHouse)
decodeForHousesList = 
                    D.succeed ForHouse
                      |> andMap (D.field "_forHouseId" D.int)
                      |> andMap (D.field "_forHouseOid" D.string)
                      |> andMap (D.field "_forHouseCategory" D.string)
                      |> andMap (D.field "_forHouseGoodsType" D.string)
                      |> andMap (D.field "_forHouseTitle" D.string)
                      |> andMap (D.field "_forHouseDescription" D.string)
                      |> andMap (D.field "_forHousePrice" D.string)
                      -- |> andMap (D.field "_forHouseImageNames" D.string)
                      |> andMap (D.field "_forHouseVideoUrl" D.string)
                      |> andMap (D.field "_forHouseAddrRegion" D.string)
                      |> andMap (D.field "_forHouseAddrCity" D.string)
                      |> andMap (D.field "_forHouseAddrPoint" D.string)
                      |> andMap (D.field "_forHouseAddrStreet" D.string)
                      |> andMap (D.field "_forHouseAddrHouse" D.string)
                      |> andMap (D.field "_forHouseContactPhone" D.string)
                      |> D.list

getData : Cmd Msg
getData = Http.get
      { url = "http://localhost:3030/data/for_house"
      , expect = Http.expectJson GotInitialData decodeForHousesList
      }

getRandText : Int -> Int -> String -> Cmd Msg
getRandText count i str = Http.request
      { url = "/randtext/"
      , method = "POST"
      , headers = [
                -- Http.header "Content-Type" "application/json;charset=utf-8"
              -- , Http.header "Referrer Policy" "strict-origin-when-cross-origin"
            ]
      , body = Http.jsonBody <| E.object [("text", E.string str), ("count", E.int count)]
      , expect = Http.expectJson (GotRandText i) (D.string |> D.list)
      , timeout = Nothing
      , tracker = Nothing
      }

type alias GLS = Random.Generator (List String)

saveData : List ForHouse -> Cmd Msg
saveData data = 
      let goid oid = 
            if oid == ""
              then UUID.generator |> Random.map (UUID.toRepresentation UUID.Compact)
              else Random.constant oid
          goids = data |> List.map .oid |> List.map goid 
          o : (Random.Generator String) -> GLS -> GLS
          o g gs = g |> Random.andThen (\u -> o3 u gs)
          o3 : String -> GLS -> GLS
          o3 u gs = gs |> Random.andThen (\us -> Random.constant (u :: us))
          gls : List (Random.Generator String) -> GLS
          gls gs = foldr o (Random.constant []) gs
          data2 : Random.Generator (List ForHouse)
          data2 = Random.map (\hs -> List.map2 (\s h -> {h | oid = s}) hs data) (gls goids)
      in
      Procedure.fetch (\tagger -> Random.generate tagger data2)
      |> Procedure.andThen (
          \data3 ->
            Procedure.fetchResult 
              (\tagger -> 
                Http.post 
                  { url = "http://localhost:3030/data/for_house"
                  , body = E.list forHouseToValue data3 |>  Http.jsonBody 
                  , expect = Http.expectJson tagger decodeForHousesList
                  }
              )
      ) |> Procedure.try ProcedureMsg DataPosted

          -- Http.post 
          --   { url = "http://localhost:3030/data/for_house"
          --   , body = E.list forHouseToValue data |>  Http.jsonBody 
          --   , expect = Http.expectWhatever DataPosted
          --   }


arrayToForHouse : Int -> Maybe String -> Array.Array String -> Maybe ForHouse
arrayToForHouse id oid ds =
  Just (ForHouse id (oid |> Maybe.withDefault ""))
    |> Maybe.andMap (Array.get 0 ds)
    |> Maybe.andMap (Array.get 1 ds)
    |> Maybe.andMap (Array.get 2 ds)
    |> Maybe.andMap (Array.get 3 ds)
    |> Maybe.andMap (Array.get 4 ds)
    |> Maybe.andMap (Array.get 5 ds)
    |> Maybe.andMap (Array.get 6 ds)
    |> Maybe.andMap (Array.get 7 ds)
    |> Maybe.andMap (Array.get 8 ds)
    |> Maybe.andMap (Array.get 9 ds)
    |> Maybe.andMap (Array.get 10 ds)
    |> Maybe.andMap (Array.get 11 ds)
    -- |> Maybe.andMap (Array.get 12 ds)
   

-- arrayToFirstRow : Int -> Array.Array String -> Maybe FirstRow
-- arrayToFirstRow id ds =
--   Maybe.map3 (\c1 c2 c3 -> {id = id, col1 = c1, col2 = c2, col3 = c3}) (Array.get 0 ds) (Array.get 1 ds) (Array.get 2 ds)

forHouseToArray : ForHouse -> Array.Array String
forHouseToArray row = 
    Array.fromList [
        row.category
      , row.goodsType
      , row.title
      , row.description
      , row.price
      -- , row.imageNames
      , row.videoUrl
      , row.addrRegion
      , row.addrCity
      , row.addrPoint
      , row.addrStreet
      , row.addrHouse
      , row.contactPhone
    ]

-- firstRowToArray : FirstRow -> Array.Array String
-- firstRowToArray row = Array.fromList [row.col1, row.col2, row.col3]

-- firstRowToValue : FirstRow -> E.Value
-- firstRowToValue row = 
--   E.object [
--       ("_testTableId", E.int row.id)
--     , ("_testTableCol1", E.string row.col1)
--     , ("_testTableCol2", E.string row.col2)
--     , ("_testTableCol3", E.string row.col3)
--     ]

forHouseToValue : ForHouse -> E.Value
forHouseToValue row = 
  E.object [
      ("_forHouseId", E.int row.id)
    , ("_forHouseOid", E.string row.oid)      
    , ("_forHouseCategory", E.string row.category)
    , ("_forHouseGoodsType", E.string row.goodsType)
    , ("_forHouseTitle", E.string row.title)
    , ("_forHouseDescription", E.string row.description)
    , ("_forHousePrice", E.string row.price)
    -- , ("_forHouseImageNames", E.string row.imageNames)
    , ("_forHouseVideoUrl", E.string row.videoUrl)
    , ("_forHouseAddrRegion", E.string row.addrRegion)
    , ("_forHouseAddrCity", E.string row.addrCity)
    , ("_forHouseAddrPoint", E.string row.addrPoint)
    , ("_forHouseAddrStreet", E.string row.addrStreet)
    , ("_forHouseAddrHouse", E.string row.addrHouse)
    , ("_forHouseContactPhone", E.string row.contactPhone)
    ]    

update : Msg -> Model -> (Model, Cmd Msg)
update action model =
  case action of
    AvitoTable msg -> let (t, cmd, i) = Table.update msg model.avitoTable in
                      case i of
                        Just ds -> 

                            let newData = Array.indexedMap (\j (id, a) -> arrayToForHouse j id a) ds |> Array.toList |> Maybe.combine |> Maybe.map Array.fromList |> Maybe.withDefault model.data
                            in  (
                                { model | 
                                    avitoTable = t
                                  , data = newData
                                  , httpStatus = Loading "Сохраняем данные"
                                }
                                , Cmd.batch [Cmd.map AvitoTable cmd, Array.toList newData |> saveData ]
                                )
                        Nothing -> ({model | avitoTable = t}, Cmd.map AvitoTable cmd)


    GotInitialData result ->
      case result of
        Ok rows ->
          let data = Array.fromList rows 
          in
          ({ model | httpStatus = Success, data = data, avitoTable = Array.fromList (List.map forHouseToArray rows) |> Array.zip (Array.map .oid data) |> Table.setData model.avitoTable }, Cmd.none)

        Err _ -> ({ model | httpStatus = Failure "Ошибка получения данных"}, Cmd.none)

    DataPosted result ->
      case result of
        Ok rows ->
          -- ({ model | httpStatus = Success}, Cmd.none)

          let data = Array.fromList rows 
          in
          ({ model | httpStatus = Success, data = data, avitoTable = Array.fromList (List.map forHouseToArray rows) |> Array.zip (Array.map .oid data) |> Table.setData model.avitoTable }, Cmd.none)

        Err _ ->
          ({ model | httpStatus = Failure  "Ошибка сохраннения данных"}, Cmd.none)

    RefreshData -> (model, getData)

    RandText i -> (
          model 
        , Array.get i model.randText
            |> Maybe.andThen (Maybe.map <| getRandText (Array.length model.data) i)
            |> Maybe.withDefault Cmd.none
        )

    
    
    -- Maybe.withDefault Cmd.none (Maybe.map (getRandText (Array.length model.data) i) (Array.get i model.randText)))


    GotRandText i result -> 
      case result of
        Ok ts -> 
          let newData = updateColumn i (Array.toList model.data) ts in
          ({model | data = Array.fromList newData, avitoTable = Array.fromList (List.map forHouseToArray newData) |> Array.zip (Array.map .oid model.data) |> Table.setData model.avitoTable}, saveData newData)

        Err _ -> ({ model | httpStatus = Failure  "Ошибка получения рандомизированного текста"}, Cmd.none)
   
    InputRandText i str -> ({model | randText = Array.update i (Maybe.map (\_ -> str)) model.randText}, Cmd.none)

    ProcedureMsg procMsg -> Procedure.Program.update procMsg model.procModel |> Tuple.mapFirst (\updated -> { model | procModel = updated } )     

updateColumn : Int -> List ForHouse -> List String -> List ForHouse
updateColumn i data ts = 
    let zip2 a b = case (a, b) of
                    (x::xs, y::ys) -> (x, Just y) :: zip2 xs ys
                    (x::xs, []) -> (x, Nothing) :: zip2 xs []
                    ([], _) -> []
    in
         zip2 data ts
      |> List.map (\(a, b) -> (forHouseToArray a, b, a))
      |> List.map (\(a, b, c) -> (Maybe.withDefault a <| Maybe.map (\x -> Array.set i x a) b, c))
      |> List.map (\(a, c) -> arrayToForHouse c.id (Just c.oid) a |> Maybe.withDefault c)

main : Program () Model Msg
main =  Browser.element { init = \_ -> (initModel, getData), update = update, view = view, subscriptions = \model -> Sub.map AvitoTable (Table.subscriptions model.avitoTable)}

view : Model -> Html.Html Msg
view model = 
    Html.div [] <| viewHttpStatus model.httpStatus ++ viewAvitoTable model 
 
viewAvitoTable : Model -> List (Html.Html Msg)
viewAvitoTable model = Table.view model.avitoTable AvitoTable (hcontrols model) viewTableHRow (viewTableRow model) 

hcontrols : Model -> Html.Html Msg
hcontrols model = 
  Html.tr [] 
    <| Html.td [] [] 
        :: (Array.toList 
            <|Array.indexedMap 
              (\i v -> Maybe.map 
                        (\w -> Html.td 
                          [] 
                          [
                            Html.input [onInput (InputRandText i), value w] []
                          , Html.button [Html.Events.onClick (RandText i)] [Html.text "X"]]
                        ) v 
                        |> Maybe.withDefault (Html.td [] [])
              ) 
              model.randText
             ) 

viewHttpStatus : HttpStatus -> List (Html.Html Msg)
viewHttpStatus status = 
  case status of 
    Success -> [Html.text "Норм"]
    Loading s -> [Html.text s]
    Failure s -> [Html.text s, refreshButton]

viewTableRow : Model -> Int -> List (Html.Html Msg) -> List (Html.Html Msg)
viewTableRow model i v = 
  let w = Array.get i model.data |> Maybe.map .oid |> Maybe.map (\oid -> Html.td [] [Html.text oid]) |> Maybe.withDefault (Html.td [] [Html.text ""])
  in w :: v

viewTableHRow : List (Html.Html Msg) -> List (Html.Html Msg)
viewTableHRow v = (Html.td [] [Html.text ""]) :: v  

  

refreshButton : Html.Html Msg
refreshButton = Html.button [onClick RefreshData] [Html.text "Обновить"]    

