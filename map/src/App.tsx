import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

const data = require("./map.json")
const DEFAULT_SHELF_WIDTH = 200;
const DEFAULT_SHELF_HEIGHT = 50;
const DEFAULT_SHELF_COLOR = "blue"
const DEFAULT_SHELF_TEXT_COLOR = "white"
const DEFAULT_SHELF_DIVIDER_COLOR = "red"

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
    fill: string,
}

function Shelf(s: ShelfI) {
    return (
	 <div>
	 <Rect
	  x={s.x}
          y={s.y}
          width={s.width}
          height={s.height}
          fill={s.fill}
	/>
	<Text
	  x={s.x + (s.width/4)}
	  y={s.y + (s.height/2)}
	  fill={DEFAULT_SHELF_TEXT_COLOR}
	  text={"32423"}
	/>
	<Text
	  x={s.x + (3 * (s.width/4))}
	  y={s.y + (s.height/2)}
	  text={"Other"}
	  fill={DEFAULT_SHELF_TEXT_COLOR}
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

function App() {
  return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Shelf
	  x={30}
	  y={30}
	  width={DEFAULT_SHELF_WIDTH}
	  height={DEFAULT_SHELF_HEIGHT}
	  left_bounds={null}
	  right_bounds={null}
	  fill={DEFAULT_SHELF_COLOR}
	/>
      </Layer>
      <Layer>
        <Rect
          x={234}
          y={50}
          width={100}
          height={100}
          fill="red"
        />
	<Text 
	  text= "seffeffe"
	  x = {222}
	  y = {80}
	  />
      </Layer>
    </Stage>
  );
}

export default App;
