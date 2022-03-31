import { NodeCoordinates } from "../functions/NodeCoordinates";

export type TSPRunnerOptions = {
    max_results_of_2_opt?: number;
    coefficient_of_pheromone_Increase_Non_Optimal_Paths?: number;
    min_coefficient_of_pheromone_diffusion?: number;
    max_coefficient_of_pheromone_diffusion?: number;

    max_results_of_k_opt?: number | undefined;
    pheromone_volatility_coefficient_R1?: number | undefined;
    //   pheromone_volatility_coefficient_R2?: number | undefined;
    pheromone_intensity_Q?: number | undefined;
    node_coordinates: NodeCoordinates;
    alpha_zero?: number | undefined;
    beta_zero?: number | undefined;
    number_of_ants?: number | undefined;
};
