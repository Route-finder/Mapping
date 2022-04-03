const dat = require("./map.json")
interface Bookshelf {
    left: Array<string>,
    right: Array<string>,
}
const extract_row = (n: number) => dat.map((x: Bookshelf) => [x.left[n], x.right[n]])
const render = (n: number) => extract_row(n).map((arr: Array<Array<string>>) => 
    `<table><tr><td>${arr[0][0]}</td><td>${arr[1][0]}</td></tr><tr><td>${arr[0][1]}</td><td>${arr[1][1]}</td></tr></table>`)
const aa = [...Array(dat.length+1).keys()].map(render)
console.log("<table>" + aa.map(row => `<tr><td>${row.join("</td><td>")}</td></tr>`) + "</table>")
