import { NodeCoordinates } from "../functions/NodeCoordinates";
import { generate_2_opt_cycle_routes } from "../k-opt/generate_2_opt_cycle_routes";
import { divide_route_to_2_opt_with_segment } from "./divide_route_to_2-opt-with-segment";
import { find_one_intersection_partial_with_cycle_route } from "./find_one_intersection_partial_with_cycle_route";
import { generate_2_opt_cycle_routes_with_splitted_Routes } from "./generate_2_opt_cycle_routes_with_splitted_Routes";
/**如果当前部分路径还有交叉点,则使用精准的2-opt局部优化,如果当前路径没有交叉点,执行随机2-opt优化,直到达到最大次数(M2opt)为止. */
export function generate_2_opt_routes_by_random_or_cross_point(
    max_of_segments: number,
    route: number[],
    node_coordinates: NodeCoordinates
): number[][] {
    const intersection = find_one_intersection_partial_with_cycle_route({
        max_of_segments,
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
        return routes_of_2_opt_accurate;
        // route = best_route_of_2_opt;
        // length = best_length_of_2_opt;
    } else {
    return generate_2_opt_cycle_routes(route);
    }
}
