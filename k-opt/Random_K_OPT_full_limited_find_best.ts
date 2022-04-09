import { random_k_opt_limited_full } from "./random_k_opt_limited_full";

import { NodeCoordinates } from "../functions/NodeCoordinates";
import { closed_total_path_length } from "../functions/closed-total-path-length";
import { creategetdistancebyindex } from "../functions/creategetdistancebyindex";
import { get_best_routeOfSeriesRoutesAndLengths } from "../functions/get_best_routeOfSeriesRoutesAndLengths";
import { get_distance_round } from "../src/set_distance_round";

/** 有限随机k-opt优化,并找出其中的最优,尽可能去除与原路径一样的路径  */
export function Random_K_OPT_full_limited_find_best({
    oldRoute,
    max_results_of_k_opt,
    node_coordinates,
    oldLength,
}: {
    oldRoute: number[];
    max_results_of_k_opt: number;
    node_coordinates: NodeCoordinates;
    oldLength: number;
}): { route: number[]; length: number } {
    const routes_of_k_opt = random_k_opt_limited_full({
        oldRoute: oldRoute,
        max_results_of_k_opt,
    });

    const routesAndLengths = routes_of_k_opt
        .map((route) => {
            const length = closed_total_path_length({
                round: get_distance_round(),
                // count_of_nodes: route.length,
                path: route,
                getdistancebyindex: creategetdistancebyindex(
                    node_coordinates,
                    get_distance_round()
                ),
            });
            return { length, route };
        })
        .filter((a) => a.length !== oldLength);
    /* routesAndLengths可能为空了 */
    const { route: best_route_of_k_opt, length: best_length_of_k_opt } =
        routesAndLengths.length
            ? get_best_routeOfSeriesRoutesAndLengths(routesAndLengths)
            : { route: oldRoute, length: oldLength };
    let route = best_route_of_k_opt;
    let length = best_length_of_k_opt;
    return { route, length };
}
