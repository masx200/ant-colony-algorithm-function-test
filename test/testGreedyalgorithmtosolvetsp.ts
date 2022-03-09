import { createchart } from "../functions/createchart";
import { drawlinechart } from "../functions/drawlinechart";
import { Nodecoordinates } from "../functions/Nodecoordinates";

import { testgreedyconstructroutebest } from "./test-greedyconstructroute";
export function testGreedyalgorithmtosolvetsp(
    nodecoordinates: Nodecoordinates
) {
    const { greedypath, totallength } =
        testgreedyconstructroutebest(nodecoordinates);

    const linechardata = [...greedypath, greedypath[0]].map(
        (v) => nodecoordinates[v]
    );
    console.log("贪心算法路径结果画图坐标", linechardata);
    console.log("test drawlinechart");
    const { chart /*  container */ /* resize  */ } = createchart();
    drawlinechart({
        // resize,
        data: linechardata,
        chart: chart,
        titletext: `城市数:${nodecoordinates.length},路径长度:${totallength}`,
    });
    // cacheechartscontainers.add(container);
}
