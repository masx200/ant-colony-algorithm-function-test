import { closedtotalpathlength } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
import { Greedyalgorithmtosolvetspwithselectedstart } from "./Greedyalgorithmtosolvetspwithselectedstart";
import { NodeCoordinates } from "./NodeCoordinates";

export function construct_all_greed_routes_and_lengths(
    node_coordinates: NodeCoordinates
) {
    const inputindexs = Array(node_coordinates.length)
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
            node_coordinates,
            start
        );
        const routelength = closedtotalpathlength({
            // count_of_nodes: route.length,
            path: route,
            getdistancebyindex: creategetdistancebyindex(node_coordinates),
        });
        return { routelength, route };
    });
    return greedypathsandlengths;
}
