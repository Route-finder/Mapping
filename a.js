"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
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
var dat = require("./map.json");
var extract_row = function (n) { return dat.map(function (x) { return [x.left[n], x.right[n]]; }); };
var render = function (n) { return extract_row(n).map(function (arr) {
    return "<table><tr><td>" + arr[0][0] + "</td><td>" + arr[1][0] + "</td></tr><tr><td>" + arr[0][1] + "</td><td>" + arr[1][1] + "</td></tr></table>";
}); };
var aa = __spreadArray([], __read(Array(dat.length + 1).keys()), false).map(render);
console.log("<table>" + aa.map(function (row) { return "<tr><td>" + row.join("</td><td>") + "</td></tr>"; }) + "</table>");
