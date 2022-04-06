import { Greedy_solve_tsp_with_selected_start_length_time_ms } from "../functions/Greedy-solve-tsp-with-selected-start-length-time-ms";
import { Greedyalgorithmtosolvetspwithselectedstart } from "../functions/Greedyalgorithmtosolvetspwithselectedstart";

export interface GreedyWorkerAPI {
    Greedyalgorithmtosolvetspwithselectedstart: typeof Greedyalgorithmtosolvetspwithselectedstart;
    Greedy_solve_tsp_with_selected_start_length_time_ms: typeof Greedy_solve_tsp_with_selected_start_length_time_ms;
}
