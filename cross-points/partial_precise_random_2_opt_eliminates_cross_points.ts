import { NodeCoordinates } from "../functions/NodeCoordinates";
import { closedtotalpathlength } from "../functions/closed-total-path-length";
import { creategetdistancebyindex } from "../functions/creategetdistancebyindex";
import { get_best_routeOfSeriesRoutesAndLengths } from "../functions/get_best_routeOfSeriesRoutesAndLengths";
import { assert_true as assert_true } from "../test/assert_true";
import { generate_2_opt_routes_by_random_or_cross_point } from "./generate_2_opt_routes_by_random_or_cross_point";

/**随机2-opt尝试优化,尽可能去除与原路径一样的路径*/
export function partial_precise_random_2_opt_eliminates_cross_points({
    max_of_segments,
    max_results_of_2_opt,
    route,
    length,
    node_coordinates,
}: {
    /**最多选择几个路径线段 */
    max_of_segments: number;
    /**最多查找几次交叉点 */
    max_results_of_2_opt: number;
    route: number[];
    length: number;
    node_coordinates: NodeCoordinates;
}): { length: number; route: number[] } {
    assert_true(max_results_of_2_opt >= 1);

    for (let count = 0; count <= max_results_of_2_opt; count++) {
        const routes_of_2_opt_accurate =
            generate_2_opt_routes_by_random_or_cross_point(
                max_of_segments,
                route,
                node_coordinates
            );

        const routesAndLengths = routes_of_2_opt_accurate
            .map((route) => {
                const total_length = closedtotalpathlength({
                    // count_of_nodes: route.length,
                    path: route,
                    getdistancebyindex:
                        creategetdistancebyindex(node_coordinates),
                });
                return { total_length, route };
            })
            .filter((a) => a.total_length !== length);
        /* routesAndLengths可能为空了 */
        const {
            route: best_route_of_2_opt,
            total_length: best_length_of_2_opt,
        } = routesAndLengths.length
            ? get_best_routeOfSeriesRoutesAndLengths(routesAndLengths)
            : { total_length: length, route: route };
        if (best_length_of_2_opt < length) {
            route = best_route_of_2_opt;
            length = best_length_of_2_opt;
        }
    }
    // while (true) {
    //     const intersection = find_one_intersection_partial_with_cycle_route({
    //         max_of_segments,
    //         cycle_route: route,
    //         node_coordinates,
    //     });
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
    //                 const total_length = closedtotalpathlength({
    //                     // count_of_nodes: route.length,
    //                     path: route,
    //                     getdistancebyindex:
    //                         creategetdistancebyindex(node_coordinates),
    //                 });
    //                 return { total_length, route };
    //             })
    //             .filter((a) => a.total_length !== length);
    //         /* routesAndLengths可能为空了 */
    //         const {
    //             route: best_route_of_2_opt,
    //             total_length: best_length_of_2_opt,
    //         } = routesAndLengths.length
    //             ? get_best_routeOfSeriesRoutesAndLengths(routesAndLengths)
    //             : { total_length: length, route: route };
    //         if (best_length_of_2_opt <= length) {
    //             route = best_route_of_2_opt;
    //             length = best_length_of_2_opt;
    //         }
    //         // route = best_route_of_2_opt;
    //         // length = best_length_of_2_opt;
    //     }
    //     /* 与消除所有交叉点不一样,由于只判断部分线段是否交叉,故这里可能还有交叉点 */
    //     /* else {
    //         // break;
    //         return { length, route };
    //     } */
    //     count++;
    //     if (count >= max_results_of_2_opt) {
    //         // break;
    //         return { length, route };
    //     }
    // }
    return { length, route };
}
