import React from "react";
import "./App.css";
import { Arrow, Stage, Layer, Rect, Text, Line, Group } from "react-konva";
let lc = require("lc_call_number_compare");

// This shouldn't be a constant, this should be read from
// the database
const BOOKS: Array<BookI> = require("./test_books.json");

const LIBRARY: Array<RowInputI> = require("./map.json");
const DEFAULT_SHELF_WIDTH = 200;
const MINIMUM_SHELF_HEIGHT = 50;
const DEFAULT_SHELF_TEXT_COLOR = "white";
const DEFAULT_FONT_FAMILY = "monospace";

const AISLE_HEIGHT = 40;
const AISLE_WIDTH = 70;

const LONGEST_SHELF_LENGTH = Math.max(
    ...LIBRARY.map((x: RowInputI) => Math.max(x.left.length, x.right.length))
);

interface Bounds {
    min: string;
    max: string;
}

interface BookI {
    name: string;
    section: string;
}

interface ShelfI {
    x: number;
    y: number;
    width: number;
    height: number;
    left_bounds: Printable | null;
    right_bounds: Printable | null;
    left_color: string;
    right_color: string;
}

function betweenLC(b: Bounds, x: string) {
    return lc.lte(x, b.max) && lc.gte(x, b.min);
}

function Shelf(s: ShelfI) {
    return (
        <Group>
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
                x={s.x + s.width / 4}
                y={s.y + s.height / 2}
                text={boundify(s.left_bounds)}
                fontFamily={DEFAULT_FONT_FAMILY}
            />
            <Text
                fill={DEFAULT_SHELF_TEXT_COLOR}
                x={s.x + 3 * (s.width / 4)}
                y={s.y + s.height / 2}
                text={boundify(s.right_bounds)}
                fontFamily={DEFAULT_FONT_FAMILY}
            />
            <Line
                x={s.x + s.width / 2}
                y={s.y}
                // Read this as
                // Line between (0, 0) and (0, s.height)
                points={[0, 0, 0, s.height]}
                stroke="black"
            />
        </Group>
    );
}

interface RowInputI {
    left: Array<Bounds>;
    right: Array<Bounds>;
}

interface RowMappedI {
    left: Array<Printable>;
    right: Array<Printable>;
}

interface Printable {
    bounds: Bounds;
    count: number;
}

function boundify(b: Printable | null) {
    return b ? b.bounds.min + "-" + b.bounds.max : "";
}

interface P {
    r: RowMappedI;
    x: number;
}

function Row(props: P) {
    const screen_based_height =
        Math.floor(window.innerHeight / (LONGEST_SHELF_LENGTH + 1)) -
        AISLE_HEIGHT;
    const height =
        screen_based_height < MINIMUM_SHELF_HEIGHT
            ? MINIMUM_SHELF_HEIGHT
            : screen_based_height;

    return (
        <Group>
            {[...Array(props.r.left.length)].map((_, i) => (
                <Shelf
                    x={props.x}
                    y={i * (height + AISLE_HEIGHT) + AISLE_HEIGHT}
                    width={DEFAULT_SHELF_WIDTH}
                    height={height}
                    left_bounds={props.r.left[i]}
                    right_bounds={props.r.right[i]}
                    left_color={props.r.left[i].count > 0 ? "pink" : "magenta"}
                    right_color={
                        props.r.right[i].count > 0 ? "pink" : "magenta"
                    }
                />
            ))}
        </Group>
    );
}

function App() {
    let for_side = (side: Array<Bounds>) =>
        side.map((shelf) => ({
            bounds: shelf,
            count: BOOKS.filter((book) => betweenLC(shelf, book.section))
                .length,
        }));
    let with_counts = LIBRARY.map((row) => ({
        left: for_side(row.left),
        right: for_side(row.right),
    }));

    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
		<Arrow
		    points={[0,0,500,500]}
		    strokewidth={15}
		    stroke="red"
		/>
                {with_counts.map((row, i) =>
                    Row({
                        r: row,
                        x:
                            AISLE_WIDTH +
                            (AISLE_WIDTH + DEFAULT_SHELF_WIDTH) * i,
                    })
                )}
            </Layer>
        </Stage>
    );
}

export default App;
