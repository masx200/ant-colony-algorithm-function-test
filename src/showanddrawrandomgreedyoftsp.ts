import { pickRandom } from "mathjs";
import { getnumberfromarrayofnmber } from "../functions/getnumberfromarrayofnmber";
import { Greedyalgorithmtosolvetspwithselectedstart } from "../functions/Greedyalgorithmtosolvetspwithselectedstart";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { createchartofcontainer } from "./createchartofcontainer";
import { drawrouteofnodecoordinates } from "./drawrouteofnodecoordinates";

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
    // const greedypath = route;
    drawrouteofnodecoordinates({ route, nodecoordinates, chart });
}
