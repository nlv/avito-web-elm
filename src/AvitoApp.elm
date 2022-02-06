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
import Dict

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

  | GotMeta (Result Http.Error (List Meta)) 

  | GotInitialData (Result Http.Error (List Post)) 
  | DataPosted (Result Http.Error (List Post))
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

type alias Post = {
    id           : Int
  , oid          : String
  , category     : String
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
  , fields       : Array.Array String
  }

type FieldType = TextType | NumberType | EnumType (List (String, String))  

type alias MetaField = {
    name : String
  , label : String
  , ftype : FieldType
  }

type alias Meta = {
    name : String
  , fields : Array.Array MetaField
  }

type alias Data = {
    avitoTable : Table.Model String
  , data : Array.Array Post
  , meta : Meta
  }

type alias Model = {
    httpStatus : HttpStatus 

  , mMeta : Maybe (Dict.Dict String Meta)
  , mName : Maybe String

  , mData : Maybe Data
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

tableInfo0 : (Array.Array (String, (String -> Cell.Model)))
tableInfo0 = 
  let categories = toPair ["Бытовая техника", "Мебель и интерьер", "Посуда и товары для кухни", "Продукты питания", "Ремонт и строительство", "Растения"]
      regions = toPair ["Москва", "Омская обл.", "Новосибирская обл."]
      cities = toPair ["Москва", "Омск", "Новосибирск"]
      toPair = List.map (\i -> (i, i)) 
  in
        Array.fromList [
              ("Категория", Cell.select categories)
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

tableInfo : Meta -> (Array.Array (String, (String -> Cell.Model)))
tableInfo meta =
  let fn ftype =
        case ftype of
          TextType -> Cell.text
          NumberType -> Cell.text
          EnumType opts -> Cell.select opts
  in
  Array.append tableInfo0 (Array.map (\f -> (f.label, fn f.ftype)) meta.fields)

initModel : Model
initModel = 
  {
    httpStatus = Loading "Получаем данные"
  , mMeta = Nothing
  , mName = Nothing
  , mData = Nothing
  , randText = Array.empty

  , procModel = Procedure.Program.init
  }

decodePostList : Meta -> D.Decoder (List Post)
decodePostList meta = 
  D.succeed Post
    |> andMap (D.field "_postId" D.int)
    |> andMap (D.field "_postOid" D.string)
    |> andMap (D.field "_postCategory" D.string)
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
    |> andMap (D.field "_postPost" (decodePostPost meta))
    |> D.list

-- todo: валидация значений, исходя из типа поля (передавать мета)
-- decodePostPost : Meta -> D.Decoder (Dict.Dict String String)
-- decodePostPost = D.map Dict.fromList (D.keyValuePairs D.string)


decodePostPost : Meta -> D.Decoder (Array.Array String)
decodePostPost meta = 
  let dict2array d = Array.map (\f -> Dict.get f.name d) meta.fields |> Maybe.combineArray |> Maybe.withDefault Array.empty
  in
  D.map dict2array (D.dict D.string)

decodeMeta : D.Decoder (List Meta)
decodeMeta = 
  let row = D.list <| D.map2 (\n fs -> {name = n, fields = fs}) (D.field "_metaName" D.string) (D.field "_metaFields" (D.array decodeFieldMeta))
  in
  row

decodeFieldMeta = 
  let
    fTypeDecode ftype =
      case ftype of 
        "TextFieldType" -> D.succeed TextType
        "NumberFieldType" -> D.succeed NumberType
        "EnumFieldType" -> D.map EnumType <| D.at ["_mfType", "contents"] (D.list <| D.map2 (\a b -> (a,b)) (D.index 0 D.string) (D.index 1 D.string))
        _ -> D.fail "Не известный тип поля"
  in
  D.map3 (\n l t -> {name = n, label = l, ftype = t}) 
       (D.field "_mfName" D.string)
       (D.field "_mfLabel" D.string)
       (D.at ["_mfType", "tag"] D.string |> D.andThen fTypeDecode)

getData : Meta -> Cmd Msg
getData meta = Http.get
      { url = "http://localhost:3030/data/for_house"
      , expect = Http.expectJson GotInitialData (decodePostList meta)
      }

getMeta : Cmd Msg
getMeta = Http.get
      { url = "http://localhost:3030/meta"
      , expect = Http.expectJson GotMeta decodeMeta
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

saveData : Meta -> List Post -> Cmd Msg
saveData meta data = 
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
          data2 : Random.Generator (List Post)
          data2 = Random.map (\hs -> List.map2 (\s h -> {h | oid = s}) hs data) (gls goids)
      in
      Procedure.fetch (\tagger -> Random.generate tagger data2)
      |> Procedure.andThen (
          \data3 ->
            Procedure.fetchResult 
              (\tagger -> 
                Http.post 
                  { url = "http://localhost:3030/data/" ++ meta.name
                  , body = E.list (postToValue meta) data3 |>  Http.jsonBody 
                  , expect = Http.expectJson tagger (decodePostList meta)
                  }
              )
      ) |> Procedure.try ProcedureMsg DataPosted

arrayToPost : Int -> Maybe String -> Array.Array String -> Maybe Post
arrayToPost id oid ds =
  Just (Post id (oid |> Maybe.withDefault ""))
    |> Maybe.andMap (Array.get 0 ds)
    |> Maybe.andMap (Array.get 1 ds)
    |> Maybe.andMap (Array.get 2 ds)
    |> Maybe.andMap (Array.get 3 ds)
    |> Maybe.andMap (Just [])
    |> Maybe.andMap (Array.get 4 ds)
    |> Maybe.andMap (Array.get 5 ds)
    |> Maybe.andMap (Array.get 6 ds)
    |> Maybe.andMap (Array.get 7 ds)
    |> Maybe.andMap (Array.get 8 ds)
    |> Maybe.andMap (Array.get 9 ds)
    |> Maybe.andMap (Array.get 10 ds)
    |> Maybe.andMap (Just <| Array.slice 10 ((Array.length ds) - 1) ds)

postToArray : Post -> Array.Array String
postToArray row = 
      let l1 = Array.fromList 
                [
                  row.category
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
        in 
        Array.append l1 row.fields


postToValue : Meta -> Post -> E.Value
postToValue meta row = 
  let fields = Array.toList <| Array.zip (Array.map (.name) meta.fields) (Array.map (\s -> E.string s) row.fields)
  in
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
    , ("_postPost", E.object fields)
    ]    

update : Msg -> Model -> (Model, Cmd Msg)
update action model =
  case action of
    AvitoTable msg -> 
      case model.mData of
        Just mData -> let (t, cmd, i) = Table.update msg mData.avitoTable in
                      case i of
                        Just ds -> 

                            let newData = Array.indexedMap (\j (id, a) -> arrayToPost j id a) ds |> Array.toList |> Maybe.combine |> Maybe.map Array.fromList |> Maybe.withDefault mData.data
                            in  (
                                { model | 
                                    mData = Just { mData | avitoTable = t, data = newData}
                                  , httpStatus = Loading "Сохраняем данные"
                                }
                                , Cmd.batch [Cmd.map AvitoTable cmd, Array.toList newData |> saveData mData.meta]
                                )
                        Nothing -> ({model | mData = Just { mData | avitoTable = t}}, Cmd.map AvitoTable cmd)
        _ -> (model, Cmd.none)

    GotInitialData result ->
      case Maybe.map2 Dict.get model.mName model.mMeta of
         Just (Just meta) -> 
          case result of
            Ok rows ->
              let data = Array.fromList rows 
                  avitoTable = model.mData |> Maybe.andThen (\md -> Just md.avitoTable) |> Maybe.withDefault (Table.initModel (tableInfo meta) Array.empty)
              in
              ({ model | httpStatus = Success, mData = Just { meta = meta, data = data, avitoTable = Array.fromList (List.map postToArray rows) |> Array.zip (Array.map .oid data) |> Table.setData avitoTable }, randText = Debug.log "randText" <| Array.repeat (Array.length (tableInfo meta)) (Just "")}, Cmd.none)

            Err _ -> ({ model | httpStatus = Failure "Ошибка получения данных"}, Cmd.none)
         _ ->  (model, Cmd.none) 

    GotMeta result -> case result of
        Ok meta -> case (List.head meta) of
          Just m -> 
            let namedMeta = List.map (\n -> (n.name, n)) meta
            in
            ({ model | httpStatus = Success, mMeta = Just (Dict.fromList namedMeta),  mName = Just (m.name), mData = Nothing, randText = Array.empty}, getData m)
          Nothing -> ({ model | httpStatus = Failure "Ошибка получения данных"}, Cmd.none)
        
        Err _ -> ({ model | httpStatus = Failure "Ошибка получения данных"}, Cmd.none)

    DataPosted result ->
      case Maybe.map2 Dict.get model.mName model.mMeta of
        Just (Just meta) ->
          case result of
            Ok rows ->
              let data = Array.fromList rows 
                  avitoTable = model.mData |> Maybe.andThen (\md -> Just md.avitoTable) |> Maybe.withDefault (Table.initModel (tableInfo meta) Array.empty)
              in
              ({ model | httpStatus = Success, mData = Just {meta = meta, data = data, avitoTable = Array.fromList (List.map postToArray rows) |> Array.zip (Array.map .oid data) |> Table.setData avitoTable }}, Cmd.none)

            Err _ ->
              ({ model | httpStatus = Failure  "Ошибка сохраннения данных"}, Cmd.none)
        _ -> (model, Cmd.none)  

    RefreshData -> 
        case model.mData of
          Just mData -> (model, getData mData.meta)
          Nothing -> (model, getMeta)

    RandText i -> 
        case model.mData of
            Just mData -> 
                (
                  model 
                , Array.get i model.randText
                    |> Maybe.andThen (Maybe.map <| getRandText (Array.length mData.data) i)
                    |> Maybe.withDefault Cmd.none
                )
            Nothing -> (model, Cmd.none)
    -- Maybe.withDefault Cmd.none (Maybe.map (getRandText (Array.length model.data) i) (Array.get i model.randText)))


    GotRandText i result -> 
      case model.mData of
         Just mData ->
          case result of
            Ok ts -> 
              let newData = updateColumn i (Array.toList mData.data) ts in
              ({model | mData = Just { mData | data = Array.fromList newData, avitoTable = Array.fromList (List.map postToArray newData) |> Array.zip (Array.map .oid mData.data) |> Table.setData mData.avitoTable}}, saveData mData.meta newData)

            Err _ -> ({ model | httpStatus = Failure  "Ошибка получения рандомизированного текста"}, Cmd.none)
         Nothing -> (model, Cmd.none)   
   
    InputRandText i str -> ({model | randText = Array.update i (Maybe.map (\_ -> str)) model.randText}, Cmd.none)

    ProcedureMsg procMsg -> Procedure.Program.update procMsg model.procModel |> Tuple.mapFirst (\updated -> { model | procModel = updated } )     

    GotImage bucket (Just file) -> (model, uploadImage bucket file)

    GotImage _ Nothing -> (model, Cmd.none)

    RemoveImage bucket name -> (model, removeImage bucket name)

    UploadedImage result ->
      case model.mData of
        Just mData -> 
            case result of 
              Ok _ -> (model, getData mData.meta)
              Err _ ->  ({ model | httpStatus = Failure "Ошибка загрузки картинки"}, Cmd.none)
        Nothing -> (model, Cmd.none)

    RemovedImage result ->
      case model.mData of
        Just mData -> 
          case result of 
            Ok _ -> (model, getData mData.meta)
            Err _ ->  ({ model | httpStatus = Failure "Ошибка удаления картинки"}, Cmd.none)        
        Nothing -> (model, Cmd.none)      

updateColumn : Int -> List Post -> List String -> List Post
updateColumn i data ts = 
    let zip2 a b = case (a, b) of
                    (x::xs, y::ys) -> (x, Just y) :: zip2 xs ys
                    (x::xs, []) -> (x, Nothing) :: zip2 xs []
                    ([], _) -> []
    in
         zip2 data ts
      |> List.map (\(a, b) -> (postToArray a, b, a))
      |> List.map (\(a, b, c) -> (Maybe.withDefault a <| Maybe.map (\x -> Array.set i x a) b, c))
      |> List.map (\(a, c) -> arrayToPost c.id (Just c.oid) a |> Maybe.withDefault c)

main : Program () Model Msg
main =  Browser.element { init = \_ -> (initModel, getMeta), update = update, view = view, subscriptions = \model -> Sub.map AvitoTable (Table.subscriptions (Table.initModel Array.empty Array.empty))}

view : Model -> Html.Html Msg
view model = 
    Html.div [] <| viewHttpStatus model.httpStatus ++ viewAvitoTable model 
 
viewAvitoTable : Model -> List (Html.Html Msg)
viewAvitoTable model = 
  case model.mData of
     Nothing -> [Html.div [] [Html.text "Грузится..."]]
     Just mData -> Table.view mData.avitoTable AvitoTable (hcontrols model) viewTableHRow (viewTableRow mData.data) 

hcontrols : Model -> Html.Html Msg
-- hcontrols model = Html.tr [] []
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

viewTableRow : Array.Array Post -> Int -> List (Html.Html Msg) -> List (Html.Html Msg)
viewTableRow data i v = 
  let w = Array.get i data |> Maybe.map ww |> Maybe.withDefault (Html.td [] [Html.text ""])
      ww d = Html.td [] ((upload d.oid :: (List.map (\u -> Html.span [] [Html.img [src u.url, height 50] [], remove d.oid u.name]) d.imageUrl)) ++ [Html.text d.oid])
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
  