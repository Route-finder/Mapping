import React from 'react';
import logo from './logo.svg';
import './App.css';

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

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> asdf save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
