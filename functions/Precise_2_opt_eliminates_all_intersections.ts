import { NodeCoordinates } from "./NodeCoordinates";
import { closedtotalpathlength } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
import { get_best_routeOfSeriesRoutesAndLengths } from "./get_best_routeOfSeriesRoutesAndLengths";
import { cacheble_intersection_filter_with_cycle_route_find_one } from "./cacheble_intersection_filter_with_cycle_route_find_one";
import { divide_route_to_2_opt_with_segment } from "./divide_route_to_2-opt-with-segment";
import { generate_2_opt_cycle_routes_with_splitted_Routes } from "./generate_2_opt_cycle_routes_with_splitted_Routes";
import { default_max_results_of_2_opt } from "../src/default_Options";
import { assert_true as assert_true } from "../test/assert_true";

/**精准2-opt消除所有交叉点 ,尽可能去除与原路径一样的路径*/
export function Precise_2_opt_eliminates_all_intersections({
    max_results_of_2_opt = default_max_results_of_2_opt,
    route,
    length,
    node_coordinates,
}: {
    max_results_of_2_opt?: number;
    route: number[];
    length: number;
    node_coordinates: NodeCoordinates;
}): { length: number; route: number[] } {
    assert_true(max_results_of_2_opt >= 1);
    let count = 0;
    while (true) {
        const intersection =
            cacheble_intersection_filter_with_cycle_route_find_one({
                cycle_route: route,
                node_coordinates,
            });
        if (intersection) {
            const splitted_Routes = divide_route_to_2_opt_with_segment(
                route,
                intersection
            );
            const routes_of_2_opt_accurate =
                generate_2_opt_cycle_routes_with_splitted_Routes(
                    route,
                    splitted_Routes
                );
            const routesAndLengths = routes_of_2_opt_accurate
                .map((route) => {
                    const totallength = closedtotalpathlength({
                        // count_of_nodes: route.length,
                        path: route,
                        getdistancebyindex:
                            creategetdistancebyindex(node_coordinates),
                    });
                    return { totallength, route };
                })
                .filter((a) => a.totallength !== length);
            /* routesAndLengths可能为空了 */
            const {
                route: best_route_of_2_opt,
                totallength: best_length_of_2_opt,
            } = routesAndLengths.length
                ? get_best_routeOfSeriesRoutesAndLengths(routesAndLengths)
                : { totallength: length, route: route };

            route = best_route_of_2_opt;
            length = best_length_of_2_opt;
        } else {
            // break;
            return { length, route };
        }
        count++;
        if (count >= max_results_of_2_opt) {
            // break;
            return { length, route };
        }
    }
    // return { length, route };
}
