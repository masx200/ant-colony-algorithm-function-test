import { closedtotalpathlength } from "../functions/closed-total-path-length";
import { creategetdistancebyindex } from "../functions/creategetdistancebyindex";
import { createchart } from "../functions/createchart";
import { drawlinechart } from "../functions/drawlinechart";
import { getnumberfromarrayofnmber } from "../functions/getnumberfromarrayofnmber";
import { Greedyalgorithmtosolvetspwithselectedstart } from "../functions/Greedyalgorithmtosolvetspwithselectedstart";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { pickRandomOne } from "../functions/pickRandomOne";

export function testGreedyrandomtosolvetsp(node_coordinates: NodeCoordinates) {
    const inputindexs = Array(node_coordinates.length)
        .fill(0)
        .map((_v, i) => i);
    const start = getnumberfromarrayofnmber(pickRandomOne(inputindexs));
    // const { greedypath, totallength } =;
    const route = Greedyalgorithmtosolvetspwithselectedstart(
        node_coordinates,
        start
    );
    const greedypath = route;
    const totallength = closedtotalpathlength({
        path: route,
        getdistancebyindex: creategetdistancebyindex(node_coordinates),
    });
    const linechardata = [...greedypath, greedypath[0]].map(
        (v) => node_coordinates[v]
    );
    console.log("贪心算法路径结果画图坐标", linechardata);
    console.log("test drawlinechart");
    const { chart /*  container */ /* , resize } */ } = createchart();
    drawlinechart({
        // resize,
        data: linechardata,
        chart: chart,
        titletext: `城市数:${node_coordinates.length},路径长度:${totallength}`,
    });
    // cacheechartscontainers.add(container);
}
