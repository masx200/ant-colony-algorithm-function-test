import { PureDataOfFinishOneRoute } from "./PureDataOfFinishOneRoute";
import { SharedOptions } from "./SharedOptions";
import { greedy_first_search_routes_parallel } from "./greedy_first_search_routes_parallel";
import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "../src/Greedy_algorithm_to_solve_tsp_with_selected_start_pool";
import { get_best_routeOfSeriesRoutesAndLengths } from "./get_best_routeOfSeriesRoutesAndLengths";
import { DataOfFinishGreedyIteration } from "./DataOfFinishGreedyIteration";
import { sum } from "lodash-es";

export async function GreedyRoutesGenerator({
    shared,
    emit_finish_greedy_iteration,
    get_best_route,
    get_best_length,
    set_best_length,
    set_best_route,
    onRouteCreated,
    emit_finish_one_route,
    get_probability_of_opt_best,
    get_probability_of_opt_current,
    setPheromoneZero,
    count_of_nodes,
}: {
    shared: SharedOptions;
    emit_finish_greedy_iteration: (data: DataOfFinishGreedyIteration) => void;
    get_best_route: () => number[];
    get_best_length: () => number;
    set_best_length: (bestlength: number) => void;
    set_best_route: (route: number[]) => void;
    onRouteCreated: (route: number[], length: number) => void;
    emit_finish_one_route: (data: PureDataOfFinishOneRoute) => void;
    get_probability_of_opt_best: () => number;
    get_probability_of_opt_current: () => number;
    setPheromoneZero: (value: number) => void;
    count_of_nodes: number;
}) {
    const greedy_results_iter = greedy_first_search_routes_parallel({
        ...shared,
    });
    const parallel_results: {
        total_length: number;
        route: number[];
        time_ms: number;
    }[] = [];

    for await (const { route, total_length, time_ms } of greedy_results_iter) {
        parallel_results.push({
            route,
            total_length,
            time_ms,
        });

        const oldLength = total_length;
        const oldRoute = route;
        if (get_best_route().length === 0) {
            if (oldLength < get_best_length()) {
                set_best_length(oldLength);
                set_best_route(oldRoute);
            }
        }
        if (oldLength < get_best_length()) {
            set_best_length(oldLength);
            set_best_route(oldRoute);
        }
        onRouteCreated(route, total_length);

        emit_finish_one_route({
            probability_of_opt_best: get_probability_of_opt_best(),
            probability_of_opt_current: get_probability_of_opt_current(),
            // weight_of_opt_best,
            // weight_of_opt_current,
            // way_of_construct,
            time_ms_of_one_route: time_ms,
            route,
            total_length,
        });
    }

    const { total_length: best_length, route: optimalrouteofthis_iteration } =
        get_best_routeOfSeriesRoutesAndLengths(parallel_results);

    setPheromoneZero(1 / count_of_nodes / best_length);
    Greedy_algorithm_to_solve_tsp_with_selected_start_pool.clear();
    const time_ms_of_one_iteration = sum(
        parallel_results.map((r) => r.time_ms)
    );
    emit_finish_greedy_iteration({
        current_iterations: 1,
        optimallengthofthis_iteration: best_length,
        optimalrouteofthis_iteration,
        time_ms_of_one_iteration,
        globalbestlength: get_best_length(),
    });
}
