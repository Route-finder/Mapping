"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
require("./App.css");
var react_konva_1 = require("react-konva");
var lc = require("lc_call_number_compare");
var LIBRARY = require("./map.json");
var DEFAULT_SHELF_WIDTH = 200;
var DEFAULT_SHELF_HEIGHT = 50;
var DEFAULT_SHELF_COLOR = "blue";
var DEFAULT_SHELF_TEXT_COLOR = "white";
var DEFAULT_SHELF_DIVIDER_COLOR = "red";
var DEFAULT_FONT_FAMILY = "monospace";
var TOTAL_SHELVES = LIBRARY.length;
var LONGEST_SHELF_LENGTH = Math.max.apply(Math, LIBRARY.map(function (x) { return Math.max(x.left.length, x.right.length); }));
function betweenLC(b, x) {
    return lc.lte(x, b.max) && lc.gte(x, b.min);
}
function Shelf(s) {
    return ((0, jsx_runtime_1.jsxs)(react_konva_1.Group, { children: [(0, jsx_runtime_1.jsx)(react_konva_1.Rect, { x: s.x, y: s.y, width: s.width / 2, height: s.height, fill: s.left_color }, void 0), (0, jsx_runtime_1.jsx)(react_konva_1.Rect, { x: s.x + s.width / 2, y: s.y, width: s.width / 2, height: s.height, fill: s.right_color }, void 0), (0, jsx_runtime_1.jsx)(react_konva_1.Text, { fill: DEFAULT_SHELF_TEXT_COLOR, x: s.x + s.width / 4, y: s.y + s.height / 2, text: boundifystr(s.left_bounds), fontFamily: DEFAULT_FONT_FAMILY }, void 0), (0, jsx_runtime_1.jsx)(react_konva_1.Text, { fill: DEFAULT_SHELF_TEXT_COLOR, x: s.x + 3 * (s.width / 4), y: s.y + s.height / 2, text: boundifystr(s.right_bounds), fontFamily: DEFAULT_FONT_FAMILY }, void 0), (0, jsx_runtime_1.jsx)(react_konva_1.Line, { x: s.x + s.width / 2, y: s.y, 
                // Read this as
                // Line between (0, 0) and (0, s.height)
                points: [0, 0, 0, s.height], stroke: "black" }, void 0)] }, void 0));
}
function boundify(a) {
    return { min: a[0], max: a[1] };
}
function boundifystr(b) {
    return b ? b.min + "-" + b.max : "";
}
function Row(props) {
    var height = Math.floor(window.innerHeight / LONGEST_SHELF_LENGTH);
    var width = Math.floor(window.innerWidth / TOTAL_SHELVES);
    return ((0, jsx_runtime_1.jsx)(react_konva_1.Group, { children: __spreadArray([], Array(props.r.left.length), true).map(function (_, i) { return ((0, jsx_runtime_1.jsx)(Shelf, { x: props.x, y: height * i, width: DEFAULT_SHELF_WIDTH, height: height, left_bounds: boundify(props.r.left[i]), right_bounds: boundify(props.r.right[i]), left_color: "green", right_color: "red" }, void 0)); }) }, void 0));
}
function App() {
    return ((0, jsx_runtime_1.jsx)(react_konva_1.Stage, __assign({ width: window.innerWidth, height: window.innerHeight }, { children: (0, jsx_runtime_1.jsx)(react_konva_1.Layer, { children: LIBRARY.map(function (row, i) { return Row({ r: row, x: (1.2 * DEFAULT_SHELF_WIDTH) * i }); }) }, void 0) }), void 0));
}
exports["default"] = App;
