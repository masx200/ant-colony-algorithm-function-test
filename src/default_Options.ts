import { COMMON_TSP_Options } from "../classic-acs/tsp-interface";
import { TSPRunnerOptions } from "./TSPRunnerOptions";

export const default_count_of_ants = 20;
export const default_search_rounds = 170;
export const default_search_time_seconds = 600;

export const default_alpha = 1;
export const default_beta = 4;

export const default_max_results_of_k_opt = 10;
export const default_max_results_of_2_opt = 10;
export const default_max_results_of_k_exchange = 10;

export { DefaultOptions };

const DefaultOptions: Omit<
    Required<TSPRunnerOptions & COMMON_TSP_Options>,
    "node_coordinates"
> = {
    pheromone_volatility_coefficient_local: 0.1,
    pheromone_volatility_coefficient_global: 0.1,
    route_selection_parameters_Q0: 0.8,
    max_results_of_k_exchange: default_max_results_of_k_exchange,
    max_cities_of_state_transition: 40,
    max_results_of_2_opt: default_max_results_of_2_opt,
    max_results_of_k_opt: default_max_results_of_k_opt,
    alpha_zero: default_alpha,
    beta_zero: default_beta,
    count_of_ants: default_count_of_ants,
    max_size_of_collection_of_optimal_routes: 10,

    max_routes_of_greedy: 20,
    max_segments_of_cross_point: 40,

    max_cities_of_greedy: 300,
    distance_round: true,
};
