import { cachebestlengthofnode_coordinates } from "../functions/cachebestlengthofnode_coordinates";
import { cachebestrouteofnode_coordinates } from "../functions/cachebestrouteofnode_coordinates";
import { construct_all_greedy_routes_and_lengths } from "../functions/construct_all_greed_routes_and_lengths";
import { get_best_routeOfSeriesRoutesAndLengths } from "../functions/get_best_routeOfSeriesRoutesAndLengths";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { assert_true } from "./assert_true";

export function testgreedyconstructroutebest(
    node_coordinates: NodeCoordinates,
    round = false
): {
    greedypath: number[];
    total_length: number;
} {
    // console.log("贪心算法测试开始");

    // console.log("贪心算法要解决的问题的坐标是", node_coordinates);
    const greedypathsandlengths = construct_all_greedy_routes_and_lengths(
        node_coordinates,
        round
    );
    const { route: greedypath, total_length } =
        get_best_routeOfSeriesRoutesAndLengths(
            greedypathsandlengths.map(({ route, routelength }) => ({
                route,
                total_length: routelength,
            }))
        );
    // console.log("贪心算法得到的路径是", greedypath);

    // const total_length = closedtotalpathlength(greedypath, node_coordinates);
    // console.log("贪心算法得出的路径长度", total_length);

    if (
        typeof cachebestlengthofnode_coordinates.get(node_coordinates) !==
        "number"
    ) {
        cachebestlengthofnode_coordinates.set(node_coordinates, total_length);
        cachebestrouteofnode_coordinates.set(node_coordinates, greedypath);
    } else {
        const bestlength =
            cachebestlengthofnode_coordinates.get(node_coordinates);
        if (bestlength && bestlength > total_length) {
            cachebestlengthofnode_coordinates.set(
                node_coordinates,
                total_length
            );
            cachebestrouteofnode_coordinates.set(node_coordinates, greedypath);
        }
    }
    assert_true(greedypath.length === node_coordinates.length);
    // console.log("贪心算法测试结束");
    return { greedypath, total_length };
}
