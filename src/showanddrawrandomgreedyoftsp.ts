import { EChartsType } from "echarts";
import { getnumberfromarrayofnmber } from "../functions/getnumberfromarrayofnmber";
import { Greedyalgorithmtosolvetspwithselectedstart } from "../functions/Greedyalgorithmtosolvetspwithselectedstart";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { pickRandomOne } from "../functions/pickRandomOne";
import { drawrouteofnode_coordinates } from "./drawrouteofnode_coordinates";

export function showanddrawrandomgreedyoftsp({
    node_coordinates,
    chart,
}: // resize,
{
    node_coordinates: NodeCoordinates;
    chart: EChartsType;
    // resize: () => void;
}) {
    console.log(node_coordinates, chart);

    const inputindexs = Array(node_coordinates.length)
        .fill(0)
        .map((_v, i) => i);
    const start = getnumberfromarrayofnmber(pickRandomOne(inputindexs));
    // const { greedypath, totallength } =;
    const route = Greedyalgorithmtosolvetspwithselectedstart(
        node_coordinates,
        start
    );
    // const greedypath = route;
    drawrouteofnode_coordinates({
        /*  resize, */ route,
        node_coordinates,
        chart,
    });
}
