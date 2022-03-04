import { nodecoordinates10 } from "../test/nodecoordinates10";
import { nodecoordinates21 } from "../test/nodecoordinates21";
import { nodecoordinates30 } from "../test/nodecoordinates30";
import { nodecoordinates6 } from "../test/nodecoordinates6";
import { test_taboo_backtracking_path_construction } from "../test/testTaboo-backtracking-path-construction";
import { inserttestbuttton } from "./inserttestbuttton";
document.body.appendChild(document.createElement("hr"));

inserttestbuttton("测试6", () => {
    test_taboo_backtracking_path_construction(nodecoordinates6);
});
inserttestbuttton("测试10", () => {
    test_taboo_backtracking_path_construction(nodecoordinates10);
});
inserttestbuttton("测试21", () => {
    test_taboo_backtracking_path_construction(nodecoordinates21);
});
inserttestbuttton("测试30", () => {
    test_taboo_backtracking_path_construction(nodecoordinates30);
});
document.body.appendChild(document.createElement("hr"));
