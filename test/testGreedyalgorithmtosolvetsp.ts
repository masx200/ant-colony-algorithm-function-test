import { closedtotalpathlength } from "../functions/closed-total-path-length";
import { createmychart } from "../functions/createmychart";
import { drawlinechart } from "../functions/drawlinechart";
import { Greedyalgorithmtosolvetspwithallstartbest } from "../functions/Greedyalgorithmtosolvetsp";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { asserttrue } from "./asserttrue";
import { cachebestrouteofnodecoordinates } from "../functions/cachebestrouteofnodecoordinates";
import { cachebestlengthofnodecoordinates } from "../functions/cachebestlengthofnodecoordinates";
export function testGreedyalgorithmtosolvetsp(
    nodecoordinates: Nodecoordinates
) {
    console.log("贪心算法测试开始");

    console.log("贪心算法要解决的问题的坐标是", nodecoordinates);

    const greedypath =
        Greedyalgorithmtosolvetspwithallstartbest(nodecoordinates);
    console.log("贪心算法得到的路径是", greedypath);

    const totallength = closedtotalpathlength(greedypath, nodecoordinates);
    console.log("贪心算法得出的路径长度", totallength);

    if (
        typeof cachebestlengthofnodecoordinates.get(nodecoordinates) !==
        "number"
    ) {
        cachebestlengthofnodecoordinates.set(nodecoordinates, totallength);
        cachebestrouteofnodecoordinates.set(nodecoordinates, greedypath);
    } else {
        const bestlength =
            cachebestlengthofnodecoordinates.get(nodecoordinates);
        if (bestlength && bestlength > totallength) {
            cachebestlengthofnodecoordinates.set(nodecoordinates, totallength);
            cachebestrouteofnodecoordinates.set(nodecoordinates, greedypath);
        }
    }
    asserttrue(greedypath.length === nodecoordinates.length);
    console.log("贪心算法测试结束");

    const linechardata = [...greedypath, greedypath[0]].map(
        (v) => nodecoordinates[v]
    );
    console.log("贪心算法路径结果画图坐标", linechardata);
    console.log("test drawlinechart");
    const mychart = createmychart();
    drawlinechart(linechardata, mychart);
}
