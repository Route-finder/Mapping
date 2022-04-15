import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

interface Location {
    x: number
    y: number,
    width: number,
    height: number,
}

interface Bounds {
    min: string;
    max: string;
}

interface Shelf {
    loc: Location,
    left_bounds: Bounds | null,
    right_bounds: Bounds | null,
    color: string,
}

interface Row {
    loc: Location,
    bounds: Bounds,
    contents: Array<Shelf>,
}

class Grid extends React.Component {
    data: Array<Row>;
    constructor(params: any) {
	super(params);
	this.data = [];
    }
}

function App() {
  return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Circle x={200} y={100} radius={50} fill="green" />
        <Line
          x={20}
          y={200}
          points={[0, 0, 100, 0, 100, 100]}
          tension={0.5}
          closed
          stroke="black"
          fillLinearGradientStartPoint={{ x: -50, y: -50 }}
          fillLinearGradientEndPoint={{ x: 50, y: 50 }}
          fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
        />
      </Layer>
    </Stage>
  );
}

export default App;
