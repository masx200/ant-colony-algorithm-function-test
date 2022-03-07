import { pickRandom } from "mathjs";
import { closedtotalpathlength } from "../functions/closed-total-path-length";
import { creategetdistancebyindex } from "../functions/creategetdistancebyindex";
import { drawlinechart } from "../functions/drawlinechart";
import { getnumberfromarrayofnmber } from "../functions/getnumberfromarrayofnmber";
import { Greedyalgorithmtosolvetspwithselectedstart } from "../functions/Greedyalgorithmtosolvetspwithselectedstart";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { createchartofcontainer } from "./createchartofcontainer";

export function showanddrawrandomgreedyoftsp(
    nodecoordinates: Nodecoordinates,

    chart: ReturnType<typeof createchartofcontainer>
) {
    console.log(nodecoordinates, chart);

    const inputindexs = Array(nodecoordinates.length)
        .fill(0)
        .map((_v, i) => i);
    const start = getnumberfromarrayofnmber(pickRandom(inputindexs));
    // const { greedypath, totallength } =;
    const route = Greedyalgorithmtosolvetspwithselectedstart(
        nodecoordinates,
        start
    );
    const greedypath = route;
    const totallength = closedtotalpathlength({
        path: route,
        getdistancebyindex: creategetdistancebyindex(nodecoordinates),
    });
    const linechardata = [...greedypath, greedypath[0]].map(
        (v) => nodecoordinates[v]
    );
    console.log("贪心算法路径结果画图坐标", linechardata);
    console.log("贪心算法得到的路径是", greedypath);
    console.log("贪心算法得到的长度是", totallength);
    console.log("test drawlinechart");
    const myChart = chart;
    drawlinechart(
        linechardata,
        myChart,
        `城市数:${nodecoordinates.length},路径长度:${totallength}`
    );
}
