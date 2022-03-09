import { EChartsType } from "echarts";
import { pickRandom } from "mathjs";
import { getnumberfromarrayofnmber } from "../functions/getnumberfromarrayofnmber";
import { Greedyalgorithmtosolvetspwithselectedstart } from "../functions/Greedyalgorithmtosolvetspwithselectedstart";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { drawrouteofnodecoordinates } from "./drawrouteofnodecoordinates";

export function showanddrawrandomgreedyoftsp({
    nodecoordinates,
    chart,
}: // resize,
{
    nodecoordinates: Nodecoordinates;
    chart: EChartsType;
    // resize: () => void;
}) {
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
    // const greedypath = route;
    drawrouteofnodecoordinates({
        /*  resize, */ route,
        nodecoordinates,
        chart,
    });
}
