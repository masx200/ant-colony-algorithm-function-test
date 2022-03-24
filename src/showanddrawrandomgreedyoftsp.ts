import { EChartsType } from "echarts";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { cacheble_greed_random_route } from "./cacheble_greed_random_route";
import { drawrouteofnode_coordinates } from "./drawrouteofnode_coordinates";

export async function showanddrawrandomgreedyoftsp({
    node_coordinates,
    chart,
}: // resize,
{
    node_coordinates: NodeCoordinates;
    chart: Pick<EChartsType,"resize"|"setOption">
}) {
    // console.log(node_coordinates, chart);

    const route = await cacheble_greed_random_route(node_coordinates);
    // const greedypath = route;
    drawrouteofnode_coordinates({
        /*  resize, */ route,
        node_coordinates,
        chart,
    });
}
