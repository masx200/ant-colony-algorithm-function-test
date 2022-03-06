import { nodecoordinates10 } from "../test/nodecoordinates10";
import { nodecoordinates16 } from "../test/nodecoordinates16";
import { nodecoordinates21 } from "../test/nodecoordinates21";
import { nodecoordinates30 } from "../test/nodecoordinates30";
import { nodecoordinates6 } from "../test/nodecoordinates6";
import { testGreedyalgorithmtosolvetsp } from "../test/testGreedyalgorithmtosolvetsp";
import { test_taboo_backtracking_path_construction } from "../test/testTaboo-backtracking-path-construction";
import { appcontainer } from "./appcontainer";
import { clearallecharts } from "./clearallecharts";
// import { test_taboo_backtracking_path_construction } from "../test/testTaboo-backtracking-path-construction";
import { inserttestbuttton } from "./inserttestbuttton";

export function beforeinitialize() {
    // document.body.appendChild(document.createElement("hr"));

    const button6 = inserttestbuttton(appcontainer, "初始化6", (button) => {
        allinitbuttons
            .filter((a) => button != a)
            .forEach((b) => (b.disabled = true));
        clearallecharts();
        console.log(button);
        // test_taboo_backtracking_path_construction(nodecoordinates6);
        testGreedyalgorithmtosolvetsp(nodecoordinates6);
        button.disabled = true;
        const button6 = inserttestbuttton(appcontainer, "测试6", (button) => {
            console.log(button);
            test_taboo_backtracking_path_construction(nodecoordinates6);
        });
        console.log(button6);
    });
    const button10 = inserttestbuttton(appcontainer, "初始化10", (button) => {
        console.log(button);
        allinitbuttons
            .filter((a) => button != a)
            .forEach((b) => (b.disabled = true));
        clearallecharts();
        // test_taboo_backtracking_path_construction(nodecoordinates10);
        testGreedyalgorithmtosolvetsp(nodecoordinates10);
        button.disabled = true;
        const button10 = inserttestbuttton(appcontainer, "测试10", (button) => {
            console.log(button);
            test_taboo_backtracking_path_construction(nodecoordinates10);
        });
        console.log(button10);
    });
    const button16 = inserttestbuttton(appcontainer, "初始化16", (button) => {
        console.log(button);
        allinitbuttons
            .filter((a) => button != a)
            .forEach((b) => (b.disabled = true));
        clearallecharts();
        // test_taboo_backtracking_path_construction(nodecoordinates10);
        testGreedyalgorithmtosolvetsp(nodecoordinates16);
        button.disabled = true;
        const button16 = inserttestbuttton(appcontainer, "测试16", (button) => {
            console.log(button);
            test_taboo_backtracking_path_construction(nodecoordinates16);
        });
        console.log(button16);
    });
    const button21 = inserttestbuttton(appcontainer, "初始化21", (button) => {
        console.log(button);
        allinitbuttons
            .filter((a) => button != a)
            .forEach((b) => (b.disabled = true));
        clearallecharts();
        // test_taboo_backtracking_path_construction(nodecoordinates21);
        testGreedyalgorithmtosolvetsp(nodecoordinates21);
        button.disabled = true;
        const button21 = inserttestbuttton(appcontainer, "测试21", (button) => {
            console.log(button);
            test_taboo_backtracking_path_construction(nodecoordinates21);
        });
        console.log(button21);
    });
    const button30 = inserttestbuttton(appcontainer, "初始化30", (button) => {
        console.log(button);
        allinitbuttons
            .filter((a) => button != a)
            .forEach((b) => (b.disabled = true));
        clearallecharts();
        // test_taboo_backtracking_path_construction(nodecoordinates30);
        testGreedyalgorithmtosolvetsp(nodecoordinates30);
        button.disabled = true;
        const button30 = inserttestbuttton(appcontainer, "测试30", (button) => {
            console.log(button);
            test_taboo_backtracking_path_construction(nodecoordinates30);
        });
        console.log(button30);
    });
    const allinitbuttons = [button10, button21, button30, button6, button16];
    // document.body.appendChild(document.createElement("hr"));
    console.log(button6);
    console.log(button10);
    console.log(button21);
    console.log(button30);
}
