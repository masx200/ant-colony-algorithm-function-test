import { closedtotalpathlength } from "../functions/closed-total-path-length";
import { Greedyalgorithmtosolvetsp } from "../functions/Greedyalgorithmtosolvetsp";
import { Nodecoordinates } from "../functions/Nodecoordinates";

export function testGreedyalgorithmtosolvetsp() {
    console.log("贪心算法测试开始");
    const nodecoordinates1: Nodecoordinates = [
        [0, 0],
        [1, 4],
        [5, 5],
        [6, 8],
        [10, 0],
        [11, 4],
        [51, 5],
        [61, 8],
        [1, 40],
        [5, 50],
        [6, 80],
        [10, 100],
        [11, 40],
        [200, 200],
    ];
    console.log("贪心算法要解决的问题的坐标是", nodecoordinates1);

    const greedypath = Greedyalgorithmtosolvetsp(nodecoordinates1);
    console.log("贪心算法得到的路径是", greedypath);

    const totallength = closedtotalpathlength(greedypath, nodecoordinates1);
    console.log("贪心算法得出的路径长度", totallength);
    console.assert(greedypath.length === nodecoordinates1.length);
    console.log("贪心算法测试结束");
}
