import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

const LIBRARY = require("./map.json")
const DEFAULT_SHELF_WIDTH = 200;
const DEFAULT_SHELF_HEIGHT = 50;
const DEFAULT_SHELF_COLOR = "blue"
const DEFAULT_SHELF_TEXT_COLOR = "white"
const DEFAULT_SHELF_DIVIDER_COLOR = "red"

const TOTAL_SHELVES = LIBRARY.length
const LONGEST_SHELF_LENGTH = Math.max(
    ...LIBRARY.map((x: RowInputI) => Math.max(x.left.length, x.right.length)))
 
interface Bounds {
    min: string;
    max: string;
}

interface ShelfI {
    x: number
    y: number,
    width: number,
    height: number,
    left_bounds: Bounds | null,
    right_bounds: Bounds | null,
    left_color: string,
    right_color: string,
}

function Shelf(s: ShelfI) {
    return (
	 <div>
	 <Rect
	  x={s.x}
          y={s.y}
          width={s.width / 2}
          height={s.height}
	  fill={s.left_color}
	/>
	<Rect
	  x={s.x + s.width / 2}
          y={s.y}
          width={s.width / 2}
          height={s.height}
	  fill={s.right_color}
	/>
	<Text
	  fill={DEFAULT_SHELF_TEXT_COLOR}
	  x={s.x + (s.width/4)}
	  y={s.y + (s.height/2)}
	  text={"32423"}
	/>
	<Text
	  fill={DEFAULT_SHELF_TEXT_COLOR}
	  x={s.x + (3 * (s.width/4))}
	  y={s.y + (s.height/2)}
	  text={"Other"}
	/>
	<Line
	  x={s.x + s.width/2}
	  y={s.y}

	  // Read this as 
	  // Line between (0, 0) and (0, s.height)
	  points={[0, 0, 0, s.height]}
	  stroke="black"
	/>
	</div>
    )
}

interface RowI {
    x: number
    y: number,
    width: number,
    height: number,
    bounds: Bounds,
    contents: Array<ShelfI>,
}

interface RowInputI {
    left: Array<Array<string>>,
    right: Array<Array<string>>
}

function boundify(a: Array<string>) {
    return { min: a[0], max: a[1] }
}

function Row(r: RowInputI) {
    const height = Math.floor(window.innerHeight / LONGEST_SHELF_LENGTH);
    const width = Math.floor(window.innerWidth / TOTAL_SHELVES);
    // assert(r.left.size == r.right.size);
    [...Array(r.left.length)].map((_, i) => 
      <Shelf
          x={width * i}
          y={height * i}
	  width={DEFAULT_SHELF_WIDTH}
	  height={DEFAULT_SHELF_WIDTH}
	  left_bounds={boundify(r.left[i])}
	  right_bounds={boundify(r.right[i])}
	  left_color="green"
	  right_color="red"
    />)
}

function App() {
  return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
    <Layer>
      <Shelf
        x={30}
        y={30}
        width={DEFAULT_SHELF_WIDTH}
        height={DEFAULT_SHELF_HEIGHT}
        left_bounds={boundify(["sdf", "ddd"])}
        right_bounds={boundify(["dd", "sssa"])}
        right_color="red"
        left_color="blue"
      />
    </Layer>
    </Stage>
  );
}

export default App;
