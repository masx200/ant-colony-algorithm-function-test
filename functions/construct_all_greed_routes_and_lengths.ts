import { closedtotalpathlength } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
import { Greedyalgorithmtosolvetspwithselectedstart } from "./Greedyalgorithmtosolvetspwithselectedstart";
import { Nodecoordinates } from "./Nodecoordinates";

export function construct_all_greed_routes_and_lengths(
    nodecoordinates: Nodecoordinates) {
    const inputindexs = Array(nodecoordinates.length)
        .fill(0)
        .map((_v, i) => i);

    const greedypathsandlengths: {
        routelength: number;
        route: number[];
    }[] = inputindexs.map(function (start): {
        routelength: number;
        route: number[];
    } {
        const route = Greedyalgorithmtosolvetspwithselectedstart(
            nodecoordinates,
            start
        );
        const routelength = closedtotalpathlength({
            // countofnodes: route.length,
            path: route,
            getdistancebyindex: creategetdistancebyindex(nodecoordinates),
        });
        return { routelength, route };
    });
    return greedypathsandlengths;
}
