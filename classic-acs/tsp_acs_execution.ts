import {
    COMMON_DataOfOneIteration,
    COMMON_DataOfOneRoute,
    COMMON_TSP_EXECUTION,
    COMMON_TSP_Options,
    COMMON_TSP_Output,
} from "./tsp-interface";
import { generateUniqueArrayOfCircularPath } from "../functions/generateUniqueArrayOfCircularPath";
import { MatrixSymmetryCreate, MatrixFill } from "@masx200/sparse-2d-matrix";
export function tsp_acs_execution(
    options: COMMON_TSP_Options
): COMMON_TSP_EXECUTION {
    const {
        count_of_ants = 20,
        node_coordinates,
        distance_round = true,
    } = options;
    const count_of_nodes = node_coordinates.length;
    const pheromoneStore = MatrixSymmetryCreate({ row: count_of_nodes });
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
    const data_of_routes: COMMON_DataOfOneRoute[] = [];
    const data_of_iterations: COMMON_DataOfOneIteration[] = [];
    const runOneIteration = async () => {
        if (current_search_count === 0) {
        }
    };
    return {
        runOneIteration: runOneIteration,
        get_output_data: (): COMMON_TSP_Output => {
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
        },
    };
}
