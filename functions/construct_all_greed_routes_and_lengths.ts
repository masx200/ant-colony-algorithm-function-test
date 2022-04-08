import { distance_round } from "../src/default_Options";
import { closed_total_path_length } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
import { Greedyalgorithmtosolvetspwithselectedstart } from "./Greedyalgorithmtosolvetspwithselectedstart";
import { NodeCoordinates } from "./NodeCoordinates";

export function construct_all_greedy_routes_and_lengths(
    node_coordinates: NodeCoordinates,
    round = false
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
            start,
            round
        );
        const routelength = closed_total_path_length({
            round: distance_round,
            // count_of_nodes: route.length,
            path: route,
            getdistancebyindex: creategetdistancebyindex(
                node_coordinates,
                round
            ),
        });
        return { routelength, route };
    });
    return greedypathsandlengths;
}
