import { cachebestlengthofnode_coordinates } from "../functions/cachebestlengthofnode_coordinates";
import { cachebestrouteofnode_coordinates } from "../functions/cachebestrouteofnode_coordinates";
import { construct_all_greed_routes_and_lengths } from "../functions/construct_all_greed_routes_and_lengths";
import { get_best_routeOfSeriesRoutesAndLengths } from "../functions/get_best_routeOfSeriesRoutesAndLengths";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { asserttrue } from "./asserttrue";

export function testgreedyconstructroutebest(
    node_coordinates: NodeCoordinates
): {
    greedypath: number[];
    totallength: number;
} {
    console.log("贪心算法测试开始");

    console.log("贪心算法要解决的问题的坐标是", node_coordinates);
    const greedypathsandlengths =
        construct_all_greed_routes_and_lengths(node_coordinates);
    const { route: greedypath, totallength } =
        get_best_routeOfSeriesRoutesAndLengths(
            greedypathsandlengths.map(({ route, routelength }) => ({
                route,
                totallength: routelength,
            }))
        );
    console.log("贪心算法得到的路径是", greedypath);

    // const totallength = closedtotalpathlength(greedypath, node_coordinates);
    console.log("贪心算法得出的路径长度", totallength);

    if (
        typeof cachebestlengthofnode_coordinates.get(node_coordinates) !==
        "number"
    ) {
        cachebestlengthofnode_coordinates.set(node_coordinates, totallength);
        cachebestrouteofnode_coordinates.set(node_coordinates, greedypath);
    } else {
        const bestlength =
            cachebestlengthofnode_coordinates.get(node_coordinates);
        if (bestlength && bestlength > totallength) {
            cachebestlengthofnode_coordinates.set(
                node_coordinates,
                totallength
            );
            cachebestrouteofnode_coordinates.set(node_coordinates, greedypath);
        }
    }
    asserttrue(greedypath.length === node_coordinates.length);
    console.log("贪心算法测试结束");
    return { greedypath, totallength };
}
