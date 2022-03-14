import { cachebestlengthofnodecoordinates } from "../functions/cachebestlengthofnodecoordinates";
import { cachebestrouteofnodecoordinates } from "../functions/cachebestrouteofnodecoordinates";
import { construct_all_greed_routes_and_lengths } from "../functions/construct_all_greed_routes_and_lengths";
import { getbestRouteOfSeriesRoutesAndLengths } from "../functions/getbestRouteOfSeriesRoutesAndLengths";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { asserttrue } from "./asserttrue";

export function testgreedyconstructroutebest(
    nodecoordinates: Nodecoordinates
): {
    greedypath: number[];
    totallength: number;
} {
    console.log("贪心算法测试开始");

    console.log("贪心算法要解决的问题的坐标是", nodecoordinates);
    const greedypathsandlengths =
        construct_all_greed_routes_and_lengths(nodecoordinates);
    const { route: greedypath, totallength } =
        getbestRouteOfSeriesRoutesAndLengths(
            greedypathsandlengths.map(({ route, routelength }) => ({
                route,
                totallength: routelength,
            }))
        );
    console.log("贪心算法得到的路径是", greedypath);

    // const totallength = closedtotalpathlength(greedypath, nodecoordinates);
    console.log("贪心算法得出的路径长度", totallength);

    if (
        typeof cachebestlengthofnodecoordinates.get(nodecoordinates) !==
        "number"
    ) {
        cachebestlengthofnodecoordinates.set(nodecoordinates, totallength);
        cachebestrouteofnodecoordinates.set(nodecoordinates, greedypath);
    } else {
        const bestlength =
            cachebestlengthofnodecoordinates.get(nodecoordinates);
        if (bestlength && bestlength > totallength) {
            cachebestlengthofnodecoordinates.set(nodecoordinates, totallength);
            cachebestrouteofnodecoordinates.set(nodecoordinates, greedypath);
        }
    }
    asserttrue(greedypath.length === nodecoordinates.length);
    console.log("贪心算法测试结束");
    return { greedypath, totallength };
}
