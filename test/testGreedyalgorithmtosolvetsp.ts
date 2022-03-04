import { createmychart } from "../functions/createmychart";
import { drawlinechart } from "../functions/drawlinechart";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { greedyconstructroute } from "./greedyconstructroute";
export function testGreedyalgorithmtosolvetsp(
    nodecoordinates: Nodecoordinates
) {
    const { greedypath /*  totallength */ } =
        greedyconstructroute(nodecoordinates);

    const linechardata = [...greedypath, greedypath[0]].map(
        (v) => nodecoordinates[v]
    );
    console.log("贪心算法路径结果画图坐标", linechardata);
    console.log("test drawlinechart");
    const mychart = createmychart();
    drawlinechart(linechardata, mychart);
}
