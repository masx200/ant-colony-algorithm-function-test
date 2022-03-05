import { nodecoordinates10 } from "../test/nodecoordinates10";
import { nodecoordinates21 } from "../test/nodecoordinates21";
import { nodecoordinates30 } from "../test/nodecoordinates30";
import { nodecoordinates6 } from "../test/nodecoordinates6";
import { test_taboo_backtracking_path_construction } from "../test/testTaboo-backtracking-path-construction";
import { inserttestbuttton } from "./inserttestbuttton";
document.body.appendChild(document.createElement("hr"));

const button6 = inserttestbuttton("测试6", (button) => {
    console.log(button);
    test_taboo_backtracking_path_construction(nodecoordinates6);
});
const button10 = inserttestbuttton("测试10", (button) => {
    console.log(button);
    test_taboo_backtracking_path_construction(nodecoordinates10);
});
const button21 = inserttestbuttton("测试21", (button) => {
    console.log(button);
    test_taboo_backtracking_path_construction(nodecoordinates21);
});
const button30 = inserttestbuttton("测试30", (button) => {
    console.log(button);
    test_taboo_backtracking_path_construction(nodecoordinates30);
});
document.body.appendChild(document.createElement("hr"));
console.log(button6);
console.log(button10);
console.log(button21);
console.log(button30);
