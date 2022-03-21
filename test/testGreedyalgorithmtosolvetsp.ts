import { createchart } from "../functions/createchart";
import { drawlinechart } from "../functions/drawlinechart";
import { NodeCoordinates } from "../functions/NodeCoordinates";

import { testgreedyconstructroutebest } from "./test-greedyconstructroute";
export function testGreedyalgorithmtosolvetsp(
    node_coordinates: NodeCoordinates
) {
    const { greedypath, totallength } =
        testgreedyconstructroutebest(node_coordinates);

    const linechardata = [...greedypath, greedypath[0]].map(
        (v) => node_coordinates[v]
    );
    console.log("贪心算法路径结果画图坐标", linechardata);
    console.log("test drawlinechart");
    const { chart /*  container */ /* resize  */ } = createchart();
    drawlinechart({
        // resize,
        data: linechardata,
        chart: chart,
        titletext: `城市数:${node_coordinates.length},路径长度:${totallength}`,
    });
    // cacheechartscontainers.add(container);
}
