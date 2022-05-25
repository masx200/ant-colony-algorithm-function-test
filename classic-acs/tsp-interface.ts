export interface COMMON_TSP_EXECUTION {
    runOneIteration: () => Promise<void>;
    get_output_data: () => COMMON_TSP_Output;
}
export interface COMMON_TSP_Output {
    total_time_ms: number;
    current_iterations: number;
    current_search_count: number;
    data_of_routes: COMMON_DataOfOneRoute[];
    data_of_iterations: COMMON_DataOfOneIteration[];
    time_of_best_ms: number;
    global_best_route: number[];
    global_best_length: number;
    search_count_of_best: number;
}
export interface COMMON_DataOfOneRoute {
    global_best_length: number;

    current_search_count: number;
    time_ms_of_one_route: number;

    current_route_length: number;
}
export interface COMMON_DataOfOneIteration {
    current_iterations: number;
    global_best_length: number;
    iterate_best_length: number;
    population_relative_information_entropy: number;
    average_length_of_iteration: number;
    worst_length_of_iteration: number;
    time_ms_of_one_iteration: number;
}
export type COMMON_TSP_Options = {
    distance_round?: boolean;
    alpha_zero?: number | undefined;
    beta_zero?: number | undefined;
    count_of_ants?: number | undefined;
    node_coordinates: NodeCoordinates;

    pheromone_volatility_coefficient_local?: number;
    pheromone_volatility_coefficient_global?: number;
    route_selection_parameters_Q0?: number;
} & TSPRunnerOptions;
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
