module AvitoApp exposing (main)

import Array as Array
import List exposing (foldr)

import Platform.Cmd as Cmd
import Html
import Html.Attributes exposing (value, src, height, enctype, value, type_, multiple)
import Html.Events exposing (onClick, on)
import Http
import Browser
import Maybe.Extra as Maybe
import Array.Extra as Array

import Json.Decode as D
import Json.Encode as E
import Json.Decode.Extra exposing (andMap)

import File exposing (File)

import AvitoTable as Table
import AvitoCell as Cell
import Html.Events exposing (onInput)

import UUID
import Random
import Procedure
import Procedure.Program
import Html exposing (Attribute)
import Html.Attributes exposing (name)


type Msg = 
    AvitoTable Table.Msg 
  | GotInitialData (Result Http.Error (List ForHouse)) 
  | DataPosted (Result Http.Error (List ForHouse))
  | RefreshData

  | RandText Int
  | InputRandText Int String
  | GotRandText Int (Result Http.Error (List String)) 

  | ProcedureMsg (Procedure.Program.Msg Msg)

  | GotImage String (Maybe File)
  | UploadedImage (Result Http.Error ())
  | RemoveImage String String
  | RemovedImage (Result Http.Error ())  


type HttpStatus = Failure String | Loading String | Success

type alias Image = {
    name : String
  , url  : String
  }

type alias ForHouse = {
    id           : Int
  , oid          : String
  , category     : String
  , goodsType    : String
  , title        : String
  , description  : String
  , price        : String
  , imageUrl     : List Image
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

uploadImage : String -> File.File -> Cmd Msg
uploadImage bucket file =
  Http.request
    { method = "POST"
    , headers = []
    , url = "http://localhost:3030/images/" ++ bucket
    , body = Http.multipartBody [ Http.filePart "image" file ]
    , expect = Http.expectWhatever UploadedImage
    , timeout = Nothing
    , tracker = Nothing
    }  

removeImage : String -> String -> Cmd Msg
removeImage bucket name =
  Http.request
    { method = "DELETE"
    , headers = []
    , url = "http://localhost:3030/images/" ++ bucket ++ "/" ++ name
    , body = Http.emptyBody
    , expect = Http.expectWhatever RemovedImage
    , timeout = Nothing
    , tracker = Nothing
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
                      |> andMap (D.field "_postId" D.int)
                      |> andMap (D.field "_postOid" D.string)
                      |> andMap (D.field "_postCategory" D.string)
                      |> andMap (D.field "_postPost" <| D.field "_postGoodsType" D.string)
                      |> andMap (D.field "_postTitle" D.string)
                      |> andMap (D.field "_postDescription" D.string)
                      |> andMap (D.field "_postPrice" D.string)
                      |> andMap (D.field "_postImageUrl" (D.list (D.map2 (\a b -> Image a b) (D.index 0 D.string) (D.index 1 D.string))))
                      |> andMap (D.field "_postVideoUrl" D.string)
                      |> andMap (D.field "_postAddrRegion" D.string)
                      |> andMap (D.field "_postAddrCity" D.string)
                      |> andMap (D.field "_postAddrPoint" D.string)
                      |> andMap (D.field "_postAddrStreet" D.string)
                      |> andMap (D.field "_postAddrHouse" D.string)
                      |> andMap (D.field "_postContactPhone" D.string)
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

arrayToForHouse : Int -> Maybe String -> Array.Array String -> Maybe ForHouse
arrayToForHouse id oid ds =
  Just (ForHouse id (oid |> Maybe.withDefault ""))
    |> Maybe.andMap (Array.get 0 ds)
    |> Maybe.andMap (Array.get 1 ds)
    |> Maybe.andMap (Array.get 2 ds)
    |> Maybe.andMap (Array.get 3 ds)
    |> Maybe.andMap (Array.get 4 ds)
    |> Maybe.andMap (Just [])
    |> Maybe.andMap (Array.get 5 ds)
    |> Maybe.andMap (Array.get 6 ds)
    |> Maybe.andMap (Array.get 7 ds)
    |> Maybe.andMap (Array.get 8 ds)
    |> Maybe.andMap (Array.get 9 ds)
    |> Maybe.andMap (Array.get 10 ds)
    |> Maybe.andMap (Array.get 11 ds)
    -- |> Maybe.andMap (Array.get 12 ds)
   
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

forHouseToValue : ForHouse -> E.Value
forHouseToValue row = 
  E.object [
      ("_postId", E.int row.id)
    , ("_postOid", E.string row.oid)      
    , ("_postCategory", E.string row.category)
    , ("_postTitle", E.string row.title)
    , ("_postDescription", E.string row.description)
    , ("_postPrice", E.string row.price)
    , ("_postImageUrl", E.list (\x -> E.list E.string [x.name, x.url]) row.imageUrl)
    , ("_postVideoUrl", E.string row.videoUrl)
    , ("_postAddrRegion", E.string row.addrRegion)
    , ("_postAddrCity", E.string row.addrCity)
    , ("_postAddrPoint", E.string row.addrPoint)
    , ("_postAddrStreet", E.string row.addrStreet)
    , ("_postAddrHouse", E.string row.addrHouse)
    , ("_postContactPhone", E.string row.contactPhone)
    , ("_postPost", E.object [("_postGoodsType", E.string row.goodsType)])
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
      case result |> Debug.log "result" of
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

    GotImage bucket (Just file) -> (model, uploadImage bucket file)

    GotImage _ Nothing -> (model, Cmd.none)

    RemoveImage bucket name -> (model, removeImage bucket name)

    UploadedImage result ->
      case result of 
        Ok _ -> (model, getData)
        Err _ ->  ({ model | httpStatus = Failure "Ошибка загрузки картинки"}, Cmd.none)

    RemovedImage result ->
      case result of 
        Ok _ -> (model, getData)
        Err _ ->  ({ model | httpStatus = Failure "Ошибка удаления картинки"}, Cmd.none)        

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
  let w = Array.get i model.data |> Maybe.map ww |> Maybe.withDefault (Html.td [] [Html.text ""])
      ww d = Html.td [] (upload d.oid :: (List.map (\u -> Html.span [] [Html.img [src u.url, height 50] [], remove d.oid u.name]) d.imageUrl))
      upload bucket = 
        Html.input 
        [ type_ "file"
        , multiple True
        , name "image"
        , on "change" (D.map (GotImage bucket) fileDecoder)
        ]
        []
      remove bucket name =
        Html.input 
        [ type_ "button"
        , onClick (RemoveImage bucket name)
        ]
        []
  in w :: v

viewTableHRow : List (Html.Html Msg) -> List (Html.Html Msg)
viewTableHRow v = (Html.td [] [Html.text ""]) :: v  

  

refreshButton : Html.Html Msg
refreshButton = Html.button [onClick RefreshData] [Html.text "Обновить"]    

fileDecoder : D.Decoder (Maybe File)
fileDecoder =
  D.at 
    ["target","files"] 
    (D.map 
      (\fs -> case fs of 
                [] -> Nothing 
                f :: _ -> Just f
      ) <| D.list File.decoder
    )
  