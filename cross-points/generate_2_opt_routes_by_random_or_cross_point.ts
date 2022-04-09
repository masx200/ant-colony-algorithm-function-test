import { random } from "lodash-es";
import { NodeCoordinates } from "../functions/NodeCoordinates";
// import { generate_2_opt_cycle_routes } from "../k-opt/generate_2_opt_cycle_routes";
import { generate_k_opt_cycle_routes_limited } from "../k-opt/generate_k_opt_cycle_routes_limited";
import { divide_route_to_2_opt_with_segment } from "./divide_route_to_2-opt-with-segment";
import { find_one_intersection_partial_with_cycle_route } from "./find_one_intersection_partial_with_cycle_route";
import { generate_2_opt_cycle_routes_with_splitted_Routes } from "./generate_2_opt_cycle_routes_with_splitted_Routes";
/**如果当前部分路径还有交叉点,则使用精准的2-opt局部优化,如果当前路径没有交叉点,执行随机2-opt优化,直到达到最大次数(M2opt)为止. */
export function generate_2_opt_routes_by_random_or_cross_point({
    max_of_segments,
    route,
    node_coordinates,
    count_of_nodes,
}: {
    max_of_segments: number;
    route: number[];
    node_coordinates: NodeCoordinates;
    count_of_nodes: number;
}): number[][] {
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
        const k = Math.round(random(2, Math.floor(count_of_nodes / 2), false));
        //生成一条k-opt路径
        return generate_k_opt_cycle_routes_limited({
            k: k,
            oldRoute: route,
            max_results: 1,
        });
    }
}
