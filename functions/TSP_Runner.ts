import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { DataOfBestChange } from "./DataOfBestChange";
import { DataOfFinishOneIteration } from "./DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";
import { NodeCoordinates } from "./NodeCoordinates";

// import { WayOfConstruct } from "./WayOfConstruct";
export type TSP_Runner = Required<TSPRunnerOptions> & {
    coefficient_of_pheromone_Increase_Non_Optimal_Paths: number;
    min_coefficient_of_pheromone_diffusion: number;
    max_coefficient_of_pheromone_diffusion: number;

    count_of_nodes: number;
    get_random_selection_probability(): number;
    get_time_of_best(): number;
    get_search_count_of_best(): number;
    on_best_change: (callback: (data: DataOfBestChange) => void) => void;
    runOneRoute: () => void;
    runOneIteration: () => void;

    get_total_time_ms: () => number;

    runIterations: (iterations: number) => void;
    on_finish_one_iteration: (
        callback: (data: DataOfFinishOneIteration) => void
    ) => void;
    on_finish_one_route: (
        callback: (data: DataOfFinishOneRoute) => void
    ) => void;

    get_number_of_iterations: () => number;

    get_best_length: () => number;
    get_best_route: () => number[];
    get_current_search_count: () => number;
    pheromoneStore: MatrixSymmetry<number>;

    // pathTabooList: PathTabooList<number>;
    [Symbol.toStringTag]: string;
    pheromone_volatility_coefficient_R2: number;
    pheromone_volatility_coefficient_R1: number;
    pheromone_intensity_Q: number;
    node_coordinates: NodeCoordinates;
    alpha_zero: number;
    beta_zero: number;
    // searchloopcountratio: number;
    count_of_ants: number;
    runRoutes: (count: number) => void;
};
