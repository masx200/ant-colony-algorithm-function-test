import { sum, uniqBy } from "lodash-es";
import { local_optimization_route_thread } from "../functions/local_optimization_route_thread";
import { get_best_route_Of_Series_routes_and_lengths } from "../functions/get_best_route_Of_Series_routes_and_lengths";
import { NodeCoordinates } from "../functions/NodeCoordinates";

export async function run_local_optimization(
    routes_and_lengths_of_one_iteration: {
        route: number[];
        length: number;
        time_ms: number;
    }[],
    get_best_route: () => number[],
    get_best_length: () => number,
    count_of_nodes: number,
    max_segments_of_cross_point: number,
    distance_round: boolean,
    max_results_of_k_opt: number,
    node_coordinates: NodeCoordinates,
    max_results_of_k_exchange: number,
    max_results_of_2_opt: number
): Promise<{ time_ms: number; length: number; route: number[] }> {
    const routes_and_lengths = routes_and_lengths_of_one_iteration;
    const best_half_routes = Array.from(routes_and_lengths)
        .sort((a, b) => a.length - b.length)
        .slice(0, routes_and_lengths.length / 2);
    const need_to_optimization_routes_and_lengths = uniqBy(
        [
            { route: get_best_route(), length: get_best_length() },
            ...best_half_routes,
        ],
        (a) => a.length
    );
    const optimization_results = await Promise.all(
        need_to_optimization_routes_and_lengths.map((v) =>
            local_optimization_route_thread({
                count_of_nodes,
                max_segments_of_cross_point,
                distance_round,
                route: v.route,
                max_results_of_k_opt,
                node_coordinates,
                length: v.length,
                max_results_of_k_exchange,
                max_results_of_2_opt,
            })
        )
    );
    const {
        route: optimal_route_of_iteration,
        length: optimal_length_of_iteration,
    } = get_best_route_Of_Series_routes_and_lengths(optimization_results);
    const optimal_time_ms = sum(optimization_results.map((v) => v.time_ms));

    return {
        time_ms: optimal_time_ms,
        length: optimal_length_of_iteration,
        route: optimal_route_of_iteration,
    };
}
