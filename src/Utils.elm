module Utils exposing (appendRow, appendRows, updateArray2D, insertRow, toArrayOfArrays)

import Array as Array
import Array2D as Array2D

toArrayOfArrays : Array2D.Array2D a -> Array.Array (Array.Array a)
toArrayOfArrays a = 
  List.range 0 ((Array2D.rows a) - 1) |> List.map (\i -> Array2D.getRow i a |> Maybe.withDefault Array.empty) |> Array.fromList

updateArray2D : Int -> Int -> (a -> a) -> Array2D.Array2D a -> Array2D.Array2D a
updateArray2D i j f ds =  Array2D.get i j ds |> Maybe.map f |> Maybe.map (\d -> Array2D.set i j d ds) |> Maybe.withDefault ds

insertRow : Int -> Array2D.Array2D a -> Array.Array a -> Array2D.Array2D a
insertRow i ds d = 
  let rows = toArrayOfArrays ds 
  in (Array.slice i (Array.length rows) rows) |> (\rs -> Array.append (Array.slice 0 i rows |> Array.push d) rs) |> Array2D.fromArray

appendRow : Array.Array a -> a -> Array2D.Array2D a -> Array2D.Array2D a
appendRow row default data = 
  if Array2D.rows data == 0
    then Array2D.fromArray (Array.fromList [row]) 
    else Array2D.appendRow row default data

appendRows : Int -> Array.Array a -> a -> Array2D.Array2D a -> Array2D.Array2D a
appendRows n row default data = 
  if n > 0 then appendRows (n - 1) row default (appendRow row default data)
  else data

