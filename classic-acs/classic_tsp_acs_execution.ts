import {
    COMMON_DataOfOneIteration,
    COMMON_DataOfOneRoute,
    COMMON_TSP_EXECUTION,
    COMMON_TSP_Options,
    COMMON_TSP_Output,
} from "./tsp-interface";
import { generateUniqueArrayOfCircularPath } from "../functions/generateUniqueArrayOfCircularPath";
import {
    MatrixSymmetryCreate,
    MatrixFill,
    MatrixSymmetry,
} from "@masx200/sparse-2d-matrix";
import { run_greedy_once_thread_with_time } from "../functions/run_greedy_once_thread_with_time";
import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "../src/Greedy_algorithm_to_solve_tsp_with_selected_start_pool";
import { calc_population_relative_information_entropy } from "../functions/calc_population-relative-information-entropy";
import { sum } from "lodash-es";
import { cycle_route_to_segments } from "../functions/cycle_route_to_segments";
import { closed_total_path_length } from "../functions/closed-total-path-length";
import { creategetdistancebyindex } from "../functions/creategetdistancebyindex";
import { get_distance_round } from "../src/set_distance_round";
import { assert_true } from "../test/assert_true";
// import { getnumberfromarrayofnmber } from "../functions/getnumberfromarrayofnmber";
import { pickRandomOne } from "../functions/pickRandomOne";
import { geteuclideandistancebyindex } from "../functions/geteuclideandistancebyindex";
import { calc_state_transition_probabilities } from "../functions/calc_state_transition_probabilities";
import { DefaultOptions } from "../src/default_Options";
import { NodeCoordinates } from "../functions/NodeCoordinates";
/**经典acs */
export function classic_tsp_acs_execution(
    options: COMMON_TSP_Options,
): COMMON_TSP_EXECUTION {
    const {
        count_of_ants = DefaultOptions.count_of_ants,
        node_coordinates,
        distance_round = true,
        pheromone_volatility_coefficient_local = DefaultOptions.pheromone_volatility_coefficient_local,
        pheromone_volatility_coefficient_global = DefaultOptions.pheromone_volatility_coefficient_global,
        beta_zero = DefaultOptions.beta_zero,
        alpha_zero = DefaultOptions.alpha_zero,
        route_selection_parameters_Q0 = DefaultOptions.route_selection_parameters_Q0,
    } = options;
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
    }
    const data_of_routes: COMMON_DataOfOneRoute[] = [];
    const delta_data_of_iterations: COMMON_DataOfOneIteration[] = [];
    const picknextnode = create_picknextnode(route_selection_parameters_Q0);
    const generate_paths_using_state_transition_probabilities =
        create_generate_paths_using_state_transition_probabilities(
            node_coordinates,
            pheromoneStore,
            count_of_nodes,
            picknextnode,
            alpha_zero,
            beta_zero,
            local_pheromone_update,
        );
    function local_pheromone_update(route: number[]) {
        for (const [city1, city2] of cycle_route_to_segments(route)) {
            const changed_pheromone =
                (1 - pheromone_volatility_coefficient_local) *
                    pheromoneStore.get(city1, city2) +
                pheromone_volatility_coefficient_local * pheromoneZero;
            pheromoneStore.set(city1, city2, changed_pheromone);
        }
    }
    function global_pheromone_update() {
        const best_route = get_best_route();
        const best_length = get_best_length();

        const delta_pheromone = 1 / best_length;
        for (const [city1, city2] of cycle_route_to_segments(best_route)) {
            const changed_pheromone =
                (1 - pheromone_volatility_coefficient_global) *
                    pheromoneStore.get(city1, city2) +
                pheromone_volatility_coefficient_global * delta_pheromone;
            pheromoneStore.set(city1, city2, changed_pheromone);
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
        }
        const routes_and_lengths_of_one_iteration: {
            route: number[];
            length: number;
            time_ms: number;
        }[] = await Promise.all(
            Array.from({ length: count_of_ants }).map(() => {
                return generate_paths_using_state_transition_probabilities();
            }),
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

            const current_routes = routes_and_lengths_of_one_iteration.map(
                (a) => a.route,
            );

            global_pheromone_update();
            const population_relative_information_entropy =
                calc_population_relative_information_entropy(current_routes);
            const average_length_of_iteration =
                sum(routes_and_lengths_of_one_iteration.map((a) => a.length)) /
                routes_and_lengths_of_one_iteration.length;
            const worst_length_of_iteration = Math.max(
                ...routes_and_lengths_of_one_iteration.map((a) => a.length),
            );
            const iterate_best_length = Math.min(
                ...routes_and_lengths_of_one_iteration.map((a) => a.length),
            );
            const endtime_of_process_iteration = Number(new Date());
            time_ms_of_one_iteration +=
                endtime_of_process_iteration - starttime_of_process_iteration;
            total_time_ms += time_ms_of_one_iteration;
            delta_data_of_iterations.push({
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

    function get_output_data_and_consume_iteration_data(): COMMON_TSP_Output {
        const output: COMMON_TSP_Output = {
            data_of_routes,
            delta_data_of_iterations: Array.from(delta_data_of_iterations),
            time_of_best_ms,
            total_time_ms,
            search_count_of_best,
            global_best_length: get_best_length(),
            current_search_count,
            current_iterations: get_number_of_iterations(),
            global_best_route: get_best_route(),
        };
        delta_data_of_iterations.length = 0;
        return output;
    }
    return {
        runOneIteration: runOneIteration,
        get_output_data_and_consume_iteration_data:
            get_output_data_and_consume_iteration_data,
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

        const result = pickRandomOne(
            availablenextnodes,
            availablenextnodes.map((nextnode) => {
                const weight = calc_state_transition_probabilities({
                    getpheromone,

                    nextnode,
                    currentnode,
                    alpha,
                    getdistancebyserialnumber,
                    beta,
                });

                return weight;
            }),
        );
        return result;
    };
}

function create_generate_paths_using_state_transition_probabilities(
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
    beta_zero: number,
    local_pheromone_update: (route: number[]) => void,
) {
    return function generate_paths_using_state_transition_probabilities(): {
        route: number[];
        length: number;
        time_ms: number;
    } {
        const starttime_of_one_route = Number(new Date());

        const inputindexs = Array(node_coordinates.length)
            .fill(0)
            .map((_v, i) => i);
        const startnode = pickRandomOne(inputindexs);
        const route: number[] = [startnode];
        const available_nodes = new Set<number>(
            inputindexs.filter((v) => !route.includes(v)),
        );
        const getpheromone = (left: number, right: number) => {
            return pheromoneStore.get(left, right);
        };
        const getdistancebyserialnumber = (left: number, right: number) => {
            return geteuclideandistancebyindex(
                left,
                right,
                node_coordinates,
                get_distance_round(),
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

        local_pheromone_update(route);
        const routelength = closed_total_path_length({
            round: get_distance_round(),
            path: route,
            getdistancebyindex: creategetdistancebyindex(
                node_coordinates,
                get_distance_round(),
            ),
        });
        const length = routelength;
        assert_true(route.length == count_of_nodes);
        const endtime_of_one_route = Number(new Date());
        const time_ms = endtime_of_one_route - starttime_of_one_route;
        return { time_ms, route, length };
    };
}
