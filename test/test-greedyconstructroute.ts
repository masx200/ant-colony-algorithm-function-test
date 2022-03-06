import { cachebestlengthofnodecoordinates } from "../functions/cachebestlengthofnodecoordinates";
import { cachebestrouteofnodecoordinates } from "../functions/cachebestrouteofnodecoordinates";
import { Greedyalgorithmtosolvetspwithallstartbest } from "../functions/Greedyalgorithmtosolvetspwithallstartbest";
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

    const { route: greedypath, totallength } =
        Greedyalgorithmtosolvetspwithallstartbest(nodecoordinates);
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
