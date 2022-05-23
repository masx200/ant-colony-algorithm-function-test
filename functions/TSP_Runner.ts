import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
// import { DataOfBestChange } from "./DataOfBestChange";
// import { DataOfFinishGreedyIteration } from "./DataOfFinishGreedyIteration";
// import { DataOfFinishOneIteration } from "./DataOfFinishOneIteration";
// import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";
// import { DataOfTotal } from "./DataOfTotal";
import { NodeCoordinates } from "./NodeCoordinates";
import { ReadOnlyPheromone } from "./ReadOnlyPheromone";
import { SharedOptions } from "./SharedOptions";
import { TSP_Output_Data } from "./TSP_Output_Data";

export type TSP_Runner = Required<TSPRunnerOptions> &
    SharedOptions & {
        count_of_nodes: number;
        get_random_selection_probability(): number;
        get_time_of_best(): number;
        get_search_count_of_best(): number;
        // on_best_change: (callback: (data: DataOfBestChange) => void) => void;
        runOneIteration: () => Promise<void>;

        get_total_time_ms: () => number;

        runIterations: (iterations: number) => Promise<void>;
        // on_finish_one_iteration: (
        //     callback: (data: DataOfFinishOneIteration) => void
        // ) => void;
        // on_finish_one_route: (
        //     callback: (data: DataOfFinishOneRoute) => void
        // ) => void;

        get_number_of_iterations: () => number;

        get_best_length: () => number;
        get_best_route: () => number[];
        get_current_search_count: () => number;
        pheromoneStore: ReadOnlyPheromone;

        [Symbol.toStringTag]: string;

        node_coordinates: NodeCoordinates;
        alpha_zero: number;
        beta_zero: number;
        count_of_ants: number;
        // on_finish_greedy_iteration: (
        // callback: (data: DataOfFinishGreedyIteration) => void
        // ) => void;
        // on_total_change: (callback: (data: DataOfTotal) => void) => void;
        get_output_data: () => TSP_Output_Data;
    };
