import { nodecoordinates10 } from "./nodecoordinates10";
import { nodecoordinates21 } from "./nodecoordinates21";
import { nodecoordinates30 } from "./nodecoordinates30";
import { nodecoordinates6 } from "./nodecoordinates6";
import { testGreedyalgorithmtosolvetsp } from "./testGreedyalgorithmtosolvetsp";
addEventListener("load",()=>{


console.time();
// import { test_taboo_backtracking_path_construction } from "./testTaboo-backtracking-path-construction";
// console.log("hello world");

testGreedyalgorithmtosolvetsp(nodecoordinates30);
// test_taboo_backtracking_path_construction(nodecoordinates6);

// (() => {
//     let nodecoordinates1 = nodecoordinates21;
//     let greedypath = [
//         10, 11, 9, 12, 8, 1, 0, 3, 2, 4, 5, 6, 7, 20, 18, 15, 13, 17, 14, 19,
//         16,
//     ];
//     const linechardata = [...greedypath, greedypath[0]].map(
//         (v) => nodecoordinates1[v]
//     );
//     const mychart = createmychart();
//     drawlinechart(linechardata, mychart);
// })();

testGreedyalgorithmtosolvetsp(nodecoordinates6);
// test_taboo_backtracking_path_construction(nodecoordinates6);
testGreedyalgorithmtosolvetsp(nodecoordinates10);
// test_taboo_backtracking_path_construction(nodecoordinates10);
testGreedyalgorithmtosolvetsp(nodecoordinates21);
// test_taboo_backtracking_path_construction(nodecoordinates21);
console.timeEnd();


})
