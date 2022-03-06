import { createmychart } from "../functions/createmychart";
import { drawlinechart } from "../functions/drawlinechart";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { testgreedyconstructroute } from "./test-greedyconstructroute";
export function testGreedyalgorithmtosolvetsp(
    nodecoordinates: Nodecoordinates
) {
    const { greedypath, totallength } =
        testgreedyconstructroute(nodecoordinates);

    const linechardata = [...greedypath, greedypath[0]].map(
        (v) => nodecoordinates[v]
    );
    console.log("贪心算法路径结果画图坐标", linechardata);
    console.log("test drawlinechart");
    const mychart = createmychart();
    drawlinechart(
        linechardata,
        mychart,
        `城市数:${nodecoordinates.length},路径长度${totallength}`
    );
}
