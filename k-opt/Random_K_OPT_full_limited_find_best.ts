// import { random_k_opt_limited_full } from "./random_k_opt_limited_full";

import { NodeCoordinates } from "../functions/NodeCoordinates";
import { closed_total_path_length } from "../functions/closed-total-path-length";
import { creategetdistancebyindex } from "../functions/creategetdistancebyindex";
import { get_best_routeOfSeriesRoutesAndLengths } from "../functions/get_best_routeOfSeriesRoutesAndLengths";
import { get_distance_round } from "../src/set_distance_round";
import { random } from "lodash-es";
import { generate_k_opt_cycle_routes_limited } from "./generate_k_opt_cycle_routes_limited";

/** 有限随机k-opt优化,并找出其中的最优,尽可能去除与原路径一样的路径  */
export function Random_K_OPT_full_limited_find_best({
    count_of_nodes,
    oldRoute,
    max_results_of_k_opt,
    node_coordinates,
    oldLength,
}: {
    count_of_nodes: number;
    oldRoute: number[];
    max_results_of_k_opt: number;
    node_coordinates: NodeCoordinates;
    oldLength: number;
}): { route: number[]; length: number } {
    /* 先随机生成Mkopt个在[2,N/2]范围内的整数放入列表中，然后对列表中每个数作为k，生成一条k-opt路径，总共生成Mkopt条路径。 */
    const routes_of_k_opt: number[][] = Array.from({
        length: max_results_of_k_opt,
    })
        .map(() => Math.round(random(2, Math.floor(count_of_nodes / 2), false)))
        .map((k) =>
            generate_k_opt_cycle_routes_limited({
                k: k,
                oldRoute,
                max_results: 1,
            })
        )
        .flat();
    /* random_k_opt_limited_full({
            oldRoute: oldRoute,
            max_results_of_k_opt,
        }); */

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
