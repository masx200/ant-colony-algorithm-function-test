import { closedtotalpathlength } from "../functions/closed-total-path-length";
import { drawlinechart } from "../functions/drawlinechart";
import { createmychart } from "../functions/createmychart";
import { Greedyalgorithmtosolvetspwithallstartbest } from "../functions/Greedyalgorithmtosolvetsp";
import { Nodecoordinates } from "../functions/Nodecoordinates";
export function testGreedyalgorithmtosolvetsp(
    nodecoordinates1: Nodecoordinates
) {
    console.log("贪心算法测试开始");

    console.log("贪心算法要解决的问题的坐标是", nodecoordinates1);

    const greedypath =
        Greedyalgorithmtosolvetspwithallstartbest(nodecoordinates1);
    console.log("贪心算法得到的路径是", greedypath);

    const totallength = closedtotalpathlength(greedypath, nodecoordinates1);
    console.log("贪心算法得出的路径长度", totallength);
    console.assert(greedypath.length === nodecoordinates1.length);
    console.log("贪心算法测试结束");

    const linechardata = [...greedypath, greedypath[0]].map(
        (v) => nodecoordinates1[v]
    );
    console.log("贪心算法路径结果画图坐标", linechardata);
    console.log("test drawlinechart");
    const mychart = createmychart();
    drawlinechart(linechardata, mychart);
}
