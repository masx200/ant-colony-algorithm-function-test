import { NodeCoordinates } from "../functions/NodeCoordinates";
import { closed_total_path_length } from "../functions/closed-total-path-length";
import { creategetdistancebyindex } from "../functions/creategetdistancebyindex";
import { get_best_routeOfSeriesRoutesAndLengths } from "../functions/get_best_routeOfSeriesRoutesAndLengths";
import { default_max_results_of_2_opt } from "../src/default_Options";
import { assert_true as assert_true } from "../test/assert_true";
import { generate_2_opt_routes_by_intersection_all } from "./generate_2_opt_routes_by_intersection_all";
import { get_distance_round } from "../src/set_distance_round";

/**精准2-opt消除所有交叉点 ,尽可能去除与原路径一样的路径*/
export function Precise_2_opt_eliminates_all_intersections({
    max_results_of_2_opt = default_max_results_of_2_opt,
    route,
    length,
    node_coordinates,
    count_of_nodes,
}: {
    count_of_nodes: number;
    max_results_of_2_opt?: number;
    route: number[];
    length: number;
    node_coordinates: NodeCoordinates;
}): { length: number; route: number[] } {
    assert_true(max_results_of_2_opt >= 1);
    for (let count = 0; count <= max_results_of_2_opt; count++) {
        const routes_of_2_opt_accurate =
            generate_2_opt_routes_by_intersection_all({
                count_of_nodes,
                // max_of_segments,
                route,
                node_coordinates,
            });

        const routesAndLengths = routes_of_2_opt_accurate
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
            .filter((a) => a.length !== length);
        /* routesAndLengths可能为空了 */
        const { route: best_route_of_2_opt, length: best_length_of_2_opt } =
            routesAndLengths.length
                ? get_best_routeOfSeriesRoutesAndLengths(routesAndLengths)
                : { length: length, route: route };
        if (best_length_of_2_opt < length) {
            route = best_route_of_2_opt;
            length = best_length_of_2_opt;
        }
    }
    // let count = 0;
    // while (true) {
    //     const intersection =
    //         cacheble_intersection_filter_with_cycle_route_find_one({
    //             cycle_route: route,
    //             node_coordinates,
    //         });
    //     if (intersection) {
    //         const splitted_Routes = divide_route_to_2_opt_with_segment(
    //             route,
    //             intersection
    //         );
    //         const routes_of_2_opt_accurate =
    //             generate_2_opt_cycle_routes_with_splitted_Routes(
    //                 route,
    //                 splitted_Routes
    //             );
    //         const routesAndLengths = routes_of_2_opt_accurate
    //             .map((route) => {
    //                 const length = closedtotalpathlength({
    //                     // count_of_nodes: route.length,
    //                     path: route,
    //                     getdistancebyindex:
    //                         creategetdistancebyindex(node_coordinates),
    //                 });
    //                 return { length, route };
    //             })
    //             .filter((a) => a.length !== length);
    //         /* routesAndLengths可能为空了 */
    //         const {
    //             route: best_route_of_2_opt,
    //             length: best_length_of_2_opt,
    //         } = routesAndLengths.length
    //             ? get_best_routeOfSeriesRoutesAndLengths(routesAndLengths)
    //             : { length: length, route: route };
    //         if (best_length_of_2_opt <= length) {
    //             route = best_route_of_2_opt;
    //             length = best_length_of_2_opt;
    //         }
    //     } else {
    //         /* 这里已经没有交叉点了,可以退出 */
    //         // break;
    //         return { length, route };
    //     }
    //     count++;
    //     if (count >= max_results_of_2_opt) {
    //         // break;
    //         return { length, route };
    //     }
    // }
    return { length, route };
}
