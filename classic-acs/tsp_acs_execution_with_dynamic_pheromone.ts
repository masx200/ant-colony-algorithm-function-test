import {
    COMMON_DataOfOneIteration,
    COMMON_DataOfOneRoute,
    COMMON_TSP_EXECUTION,
    COMMON_TSP_Options,
    COMMON_TSP_Output,
} from "./tsp-interface";
import { generateUniqueArrayOfCircularPath } from "../functions/generateUniqueArrayOfCircularPath";
import { MatrixSymmetryCreate, MatrixFill } from "@masx200/sparse-2d-matrix";
import { run_greedy_once_thread_with_time } from "../functions/run_greedy_once_thread_with_time";
import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "../src/Greedy_algorithm_to_solve_tsp_with_selected_start_pool";
import { calc_population_relative_information_entropy } from "../functions/calc_population-relative-information-entropy";
import { sum } from "lodash-es";
import { cycle_route_to_segments } from "../functions/cycle_route_to_segments";
import { closed_total_path_length } from "../functions/closed-total-path-length";
import { creategetdistancebyindex } from "../functions/creategetdistancebyindex";
import { get_distance_round } from "../src/set_distance_round";
import { assert_true } from "../test/assert_true";

import { geteuclideandistancebyindex } from "../functions/geteuclideandistancebyindex";
import { DefaultOptions } from "../src/default_Options";
import {
    Cached_hash_table_of_path_lengths_and_path_segments,
    update_Cached_hash_table_of_path_lengths_and_path_segments,
} from "../functions/Cached_hash_table_of_path_lengths_and_path_segments";
import { create_collection_of_optimal_routes } from "../collections/collection-of-optimal-routes";
import { update_last_random_selection_probability } from "../functions/update_last_random_selection_probability";
import { max_number_of_stagnation } from "../functions/max_number_of_stagnation";
import { update_convergence_coefficient } from "../functions/update_convergence_coefficient";
import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";

import { CollectionOfOptimalRoutes } from "../collections/collection-of-optimal-routes";
import { calc_pheromone_dynamic } from "../functions/calc_pheromone_dynamic";
import { pickRandomOne } from "../functions/pickRandomOne";
import { calc_state_transition_probabilities } from "../functions/calc_state_transition_probabilities";
import { NodeCoordinates } from "../functions/NodeCoordinates";

/**经典acs +动态信息素*/
export function tsp_acs_execution_with_dynamic_pheromone(
    options: COMMON_TSP_Options
): COMMON_TSP_EXECUTION {
    const {
        count_of_ants = DefaultOptions.count_of_ants,
        node_coordinates,
        distance_round = true,
        max_size_of_collection_of_optimal_routes = DefaultOptions.max_size_of_collection_of_optimal_routes,
        beta_zero = DefaultOptions.beta_zero,
        alpha_zero = DefaultOptions.alpha_zero,
        route_selection_parameters_Q0 = DefaultOptions.route_selection_parameters_Q0,
    } = options;
    let pheromone_exceeds_maximum_range = false;
    const routes_segments_cache: Cached_hash_table_of_path_lengths_and_path_segments =
        new Map();
    const collection_of_optimal_routes = create_collection_of_optimal_routes(
        max_size_of_collection_of_optimal_routes
    );
    let convergence_coefficient = 1;
    let number_of_stagnation = 0;
    let lastrandom_selection_probability = 0;
    const count_of_nodes = node_coordinates.length;
    const pheromoneStore = MatrixSymmetryCreate({ row: count_of_nodes });
    let pheromoneZero = Number.EPSILON;
    let greedy_length: number = Infinity;
    let total_time_ms = 0;
    const get_number_of_iterations = () => {
        return current_search_count / count_of_ants;
    };

    let current_search_count = 0;
    let time_of_best_ms = 0;
    function set_global_best(route: number[], length: number) {
        if (length < global_best.length) {
            const formatted_route = generateUniqueArrayOfCircularPath(route);

            global_best.length = length;
            global_best.route = formatted_route;
            time_of_best_ms = total_time_ms;
            search_count_of_best = current_search_count + 1;
        }
    }
    let search_count_of_best = 0;
    const global_best: {
        length: number;
        route: number[];
    } = { length: Infinity, route: [] };
    const get_best_route = () => {
        return global_best.route;
    };

    const get_best_length = () => {
        return global_best.length;
    };
    function onRouteCreated(route: number[], length: number) {
        if (length < get_best_length()) {
            set_global_best(route, length);
        }
        if (collection_of_optimal_routes) {
            collection_of_optimal_routes.add(route, length);
        }
    }
    const data_of_routes: COMMON_DataOfOneRoute[] = [];
    const data_of_iterations: COMMON_DataOfOneIteration[] = [];
    const picknextnode = create_picknextnode(route_selection_parameters_Q0);

    const generate_paths_using_state_transition_probabilities =
        create_generate_paths_using_state_transition_probabilities(
            get_best_length,
            get_best_route,
            node_coordinates,
            pheromoneStore,
            count_of_nodes,
            picknextnode,
            alpha_zero,
            beta_zero
        );

    function global_pheromone_update(
        last_convergence_coefficient: number,
        routes_and_lengths_of_one_iteration: {
            route: number[];
            length: number;
            time_ms: number;
        }[]
    ) {
        pheromone_exceeds_maximum_range = false;

        if (last_convergence_coefficient < convergence_coefficient) {
            const routes_should_update_pheremone: number[][] = [
                ...routes_and_lengths_of_one_iteration,
                ...collection_of_optimal_routes,
            ].map((a) => a.route);

            for (const route of routes_should_update_pheremone) {
                for (const [city1, city2] of cycle_route_to_segments(route)) {
                    pheromone_exceeds_maximum_range = update_pheromone_segment(
                        collection_of_optimal_routes,
                        city1,
                        city2,
                        greedy_length,
                        convergence_coefficient,
                        routes_segments_cache,
                        pheromone_exceeds_maximum_range,
                        pheromoneStore
                    );
                }
            }
        } else {
            for (const [city1, city2] of pheromoneStore
                .keys()
                .filter(([left, right]) => left >= right)) {
                pheromone_exceeds_maximum_range = update_pheromone_segment(
                    collection_of_optimal_routes,
                    city1,
                    city2,
                    greedy_length,
                    convergence_coefficient,
                    routes_segments_cache,
                    pheromone_exceeds_maximum_range,
                    pheromoneStore
                );
            }
        }
    }
    const runOneIteration = async () => {
        let time_ms_of_one_iteration: number = 0;
        if (current_search_count === 0) {
            const {
                length: best_length,
                route: best_route,
                time_ms,
            } = await run_greedy_once_thread_with_time({
                node_coordinates,
                round: distance_round,
            });
            Greedy_algorithm_to_solve_tsp_with_selected_start_pool.destroy();
            set_global_best(best_route, best_length);

            time_ms_of_one_iteration += time_ms;
            greedy_length = best_length;
            pheromoneZero = 1 / count_of_nodes / greedy_length;

            MatrixFill(pheromoneStore, pheromoneZero);
            update_Cached_hash_table_of_path_lengths_and_path_segments(
                routes_segments_cache,
                collection_of_optimal_routes
            );
            global_pheromone_update(convergence_coefficient, []);
        }
        const routes_and_lengths_of_one_iteration: {
            route: number[];
            length: number;
            time_ms: number;
        }[] = await Promise.all(
            Array.from({ length: count_of_ants }).map(() => {
                return generate_paths_using_state_transition_probabilities(
                    pheromone_exceeds_maximum_range
                );
            })
        );
        for (let {
            route,
            length,
            time_ms: time_ms_of_one_route,
        } of routes_and_lengths_of_one_iteration) {
            onRouteCreated(route, length);

            time_ms_of_one_iteration += time_ms_of_one_route;
            current_search_count++;
            data_of_routes.push({
                global_best_length: get_best_length(),
                current_route_length: length,
                current_search_count,
                time_ms_of_one_route,
            });
        }
        if (routes_and_lengths_of_one_iteration.length === count_of_ants) {
            const starttime_of_process_iteration = Number(new Date());
            const last_convergence_coefficient = convergence_coefficient;
            const current_routes = routes_and_lengths_of_one_iteration.map(
                (a) => a.route
            );
            update_Cached_hash_table_of_path_lengths_and_path_segments(
                routes_segments_cache,
                collection_of_optimal_routes
            );
            global_pheromone_update(
                last_convergence_coefficient,
                routes_and_lengths_of_one_iteration
            );
            const population_relative_information_entropy =
                calc_population_relative_information_entropy(current_routes);
            const average_length_of_iteration =
                sum(routes_and_lengths_of_one_iteration.map((a) => a.length)) /
                routes_and_lengths_of_one_iteration.length;
            const worst_length_of_iteration = Math.max(
                ...routes_and_lengths_of_one_iteration.map((a) => a.length)
            );
            const iterate_best_length = Math.min(
                ...routes_and_lengths_of_one_iteration.map((a) => a.length)
            );
            const current_population_relative_information_entropy =
                population_relative_information_entropy;
            const coefficient_of_diversity_increase = Math.sqrt(
                1 - Math.pow(current_population_relative_information_entropy, 2)
            );
            convergence_coefficient = update_convergence_coefficient({
                number_of_stagnation,
                coefficient_of_diversity_increase,
                convergence_coefficient,
                iterate_best_length,
                greedy_length,
            });
            if (number_of_stagnation >= max_number_of_stagnation) {
                number_of_stagnation = 0;
            }
            number_of_stagnation++;

            lastrandom_selection_probability =
                update_last_random_selection_probability({
                    coefficient_of_diversity_increase,
                    lastrandom_selection_probability,
                });
            const endtime_of_process_iteration = Number(new Date());
            time_ms_of_one_iteration +=
                endtime_of_process_iteration - starttime_of_process_iteration;
            total_time_ms += time_ms_of_one_iteration;
            data_of_iterations.push({
                global_best_length: get_best_length(),
                current_iterations: get_number_of_iterations(),
                time_ms_of_one_iteration,
                population_relative_information_entropy,
                average_length_of_iteration,
                worst_length_of_iteration,
                iterate_best_length,
            });
        }
    };

    function get_output_data(): COMMON_TSP_Output {
        const output: COMMON_TSP_Output = {
            data_of_routes,
            data_of_iterations,
            time_of_best_ms,
            total_time_ms,
            search_count_of_best,
            global_best_length: get_best_length(),
            current_search_count,
            current_iterations: get_number_of_iterations(),
            global_best_route: get_best_route(),
        };
        return output;
    }
    return {
        runOneIteration: runOneIteration,
        get_output_data: get_output_data,
    };
}
function create_generate_paths_using_state_transition_probabilities(
    get_best_length: () => number,
    get_best_route: () => number[],
    node_coordinates: NodeCoordinates,
    pheromoneStore: MatrixSymmetry<number>,
    count_of_nodes: number,
    picknextnode: ({
        beta_zero,
        alpha_zero,
        currentnode,
        getpheromone,
        getdistancebyserialnumber,
        availablenextnodes,
    }: {
        alpha_zero: number;
        beta_zero: number;
        currentnode: number;
        availablenextnodes: number[];
        getpheromone: (left: number, right: number) => number;
        getdistancebyserialnumber: (left: number, right: number) => number;
    }) => number,
    alpha_zero: number,
    beta_zero: number
) {
    return function generate_paths_using_state_transition_probabilities(
        pheromone_exceeds_maximum_range: boolean
    ): {
        route: number[];
        length: number;
        time_ms: number;
    } {
        if (pheromone_exceeds_maximum_range) {
            /* 信息素可能太大.如果有信息素超过浮点数最大范围,则在构建一条路径时,直接返回全局最优路径. */
            return {
                time_ms: 0,
                length: get_best_length(),
                route: get_best_route(),
            };
        }
        const starttime_of_one_route = Number(new Date());

        const inputindexs = Array(node_coordinates.length)
            .fill(0)
            .map((_v, i) => i);
        const startnode = pickRandomOne(inputindexs);
        const route: number[] = [startnode];
        const available_nodes = new Set<number>(
            inputindexs.filter((v) => !route.includes(v))
        );
        const getpheromone = (left: number, right: number) => {
            return pheromoneStore.get(left, right);
        };
        const getdistancebyserialnumber = (left: number, right: number) => {
            return geteuclideandistancebyindex(
                left,
                right,
                node_coordinates,
                get_distance_round()
            );
        };
        while (route.length !== count_of_nodes) {
            const current_city = Array.from(route).slice(-1)[0];

            const nextnode = picknextnode({
                alpha_zero,
                beta_zero,

                currentnode: current_city,
                availablenextnodes: Array.from(available_nodes),
                getpheromone,
                getdistancebyserialnumber,
            });
            route.push(nextnode);
            available_nodes.delete(nextnode);
        }

        const routelength = closed_total_path_length({
            round: get_distance_round(),
            path: route,
            getdistancebyindex: creategetdistancebyindex(
                node_coordinates,
                get_distance_round()
            ),
        });
        const length = routelength;
        assert_true(route.length == count_of_nodes);
        const endtime_of_one_route = Number(new Date());
        const time_ms = endtime_of_one_route - starttime_of_one_route;
        return { time_ms, route, length };
    };
}
function create_picknextnode(route_selection_parameters_Q0: number) {
    return function picknextnode({
        beta_zero,
        alpha_zero,
        currentnode,
        getpheromone,
        getdistancebyserialnumber,
        availablenextnodes,
    }: {
        alpha_zero: number;
        beta_zero: number;
        currentnode: number;
        availablenextnodes: number[];
        getpheromone: (left: number, right: number) => number;
        getdistancebyserialnumber: (left: number, right: number) => number;
    }): number {
        const beta = beta_zero;
        const alpha = alpha_zero;
        const random = Math.random();
        if (random < route_selection_parameters_Q0) {
            const nextnode_and_weights = availablenextnodes.map((nextnode) => {
                const weight = calc_state_transition_probabilities({
                    getpheromone,

                    nextnode,
                    currentnode,
                    alpha,
                    getdistancebyserialnumber,
                    beta,
                });
                return { nextnode, weight };
            });

            return nextnode_and_weights.reduce((c, v) => {
                return c.weight > v.weight ? c : v;
            }, nextnode_and_weights[0]).nextnode;
        }

        const weights = availablenextnodes.map((nextnode) => {
            const weight = calc_state_transition_probabilities({
                getpheromone,

                nextnode,
                currentnode,
                alpha,
                getdistancebyserialnumber,
                beta,
            });

            return weight;
        });
        // debugger
        const result = pickRandomOne(availablenextnodes, weights);
        return result;
    };
}

function update_pheromone_segment(
    collection_of_optimal_routes: CollectionOfOptimalRoutes,
    city1: number,
    city2: number,
    greedy_length: number,
    convergence_coefficient: number,
    routes_segments_cache: Cached_hash_table_of_path_lengths_and_path_segments,
    pheromone_exceeds_maximum_range: boolean,
    pheromoneStore: MatrixSymmetry<number>
) {
    const result = calc_pheromone_dynamic({
        latest_and_optimal_routes: collection_of_optimal_routes,
        // PheromoneZero,
        row: city1,
        column: city2,
        greedy_length,
        convergence_coefficient,
        routes_segments_cache: routes_segments_cache,
    });
    if (result > Number.MAX_VALUE) {
        /* 信息素可能太大.如果有信息素超过浮点数最大范围,则在构建一条路径时,直接返回全局最优路径. */
        pheromone_exceeds_maximum_range = true;
    }
    const max_value = Number.MAX_VALUE;
    const min_value = Number.EPSILON;
    let value = Math.min(result, max_value);
    value = Math.max(value, min_value);
    const phermone = value;
    assert_true(!Number.isNaN(phermone), "phermone should not be NaN");
    pheromoneStore.set(city1, city2, value);
    return pheromone_exceeds_maximum_range;
}
