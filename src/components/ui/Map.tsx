import React from "react";
import "./Map.css";
import { Arrow, Stage, Layer, Rect, Text, Line, Group } from "react-konva";
const lc = require("lc_call_number_compare");

// Make consts actually const
type Array<T> = ReadonlyArray<T>;

// This shouldn't be a constant, this should be read from
// the database
const BOOKS: Array<BookI> = require("./test_books.json");

const LIBRARY: Array<LeftRight<Array<Bounds>>> = require("./map.json");
const DEFAULT_SHELF_WIDTH = 200;
const MINIMUM_SHELF_HEIGHT = 50;
const DEFAULT_SHELF_TEXT_COLOR = "white";
const DEFAULT_FONT_FAMILY = "monospace";

const AISLE_HEIGHT = 40;
const AISLE_WIDTH = 70;

const LONGEST_SHELF_LENGTH = Math.max(
    ...LIBRARY.map((x: LeftRight<Array<Bounds>>) =>
        Math.max(x.left.length, x.right.length)
    )
);

interface Bounds {
    readonly min: string;
    readonly max: string;
}

interface BookI {
    readonly name: string;
    readonly section: string;
}

interface ShelfI {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly left_bounds: Printable | null;
    readonly right_bounds: Printable | null;
    readonly left_color: string;
    readonly right_color: string;
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
                x={s.x}
                y={s.y + s.height / 2}
                width={s.width / 2}
                text={boundify(s.left_bounds)}
                fontFamily={DEFAULT_FONT_FAMILY}
                align="center"
            />
            <Text
                fill={DEFAULT_SHELF_TEXT_COLOR}
                x={s.x + s.width / 2}
                width={s.width / 2}
                y={s.y + s.height / 2}
                text={boundify(s.right_bounds)}
                fontFamily={DEFAULT_FONT_FAMILY}
                align="center"
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

function Path(k: Array<LeftRight<Array<Printable>>>) {
    const shelves_to_visit: Array<LeftRight<boolean>> = k.map((row) =>
        lrmap(row, (side) => side.some((x) => x.count > 0))
    );

    const v = shelves_to_visit.map((shelf, i) => 
	shelf.left ? 
	 AISLE_WIDTH / 2 + (AISLE_WIDTH + DEFAULT_SHELF_WIDTH) * i 
	 : null).filter(x => x);
    console.log( v);
}

interface LeftRight<T> {
    readonly left: T;
    readonly right: T;
}

interface Printable {
    readonly bounds: Bounds;
    readonly count: number;
}

function boundify(b: Printable | null) {
    return b ? b.bounds.min + "-" + b.bounds.max : "";
}

function Row(r: LeftRight<Array<Printable>>, x: number) {
    const screen_based_height =
        Math.floor(window.innerHeight / (LONGEST_SHELF_LENGTH + 1)) -
        AISLE_HEIGHT;
    const height =
        screen_based_height < MINIMUM_SHELF_HEIGHT
            ? MINIMUM_SHELF_HEIGHT
            : screen_based_height;

    return (
        <Group>
            {[...Array(r.left.length)].map((_, i) => (
                <Shelf
                    x={x}
                    y={i * (height + AISLE_HEIGHT) + AISLE_HEIGHT}
                    width={DEFAULT_SHELF_WIDTH}
                    height={height}
                    left_bounds={r.left[i]}
                    right_bounds={r.right[i]}
                    left_color={r.left[i].count > 0 ? "pink" : "magenta"}
                    right_color={r.right[i].count > 0 ? "pink" : "magenta"}
                />
            ))}
        </Group>
    );
}

function lrmap<T, U>(lr: LeftRight<T>, f: (a: T) => U) {
    return {
        left: f(lr.left),
        right: f(lr.right),
    };
}

function Map() {
    // The infered type doesn't use constants, so it needs to be written out
    const with_counts: Array<LeftRight<Array<Printable>>> = LIBRARY.map((row) =>
        lrmap(row, (side) =>
            side.map((shelf) => ({
                bounds: shelf,
                count: BOOKS.filter((book) => betweenLC(shelf, book.section))
                    .length,
            }))
        )
    );

    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                {with_counts.map((row, i) =>
                    Row(
                        row,
                        AISLE_WIDTH + (AISLE_WIDTH + DEFAULT_SHELF_WIDTH) * i
                    )
                )}
		{Path(with_counts)}
            </Layer>
        </Stage>
    );
}

export default Map;
