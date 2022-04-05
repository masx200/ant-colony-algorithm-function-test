import { Greedyalgorithmtosolvetspwithselectedstart } from "../functions/Greedyalgorithmtosolvetspwithselectedstart";
import { createWorkerPool } from "./createWorkerPool";
import { create_Worker_comlink } from "./create_Worker_comlink";
import Greedy_algorithm_to_solve_tsp_with_selected_start_Worker from "./Greedy_algorithm_to_solve_tsp_with_selected_start.worker?worker";

export const Greedy_algorithm_to_solve_tsp_with_selected_start_pool = createWorkerPool(
    () => {
        return create_Worker_comlink<{
            Greedyalgorithmtosolvetspwithselectedstart: typeof Greedyalgorithmtosolvetspwithselectedstart;
        }>(() => {
            const w = new Greedy_algorithm_to_solve_tsp_with_selected_start_Worker();
            w.addEventListener("error", (e) => {
                alert(String(e) + e.message);
                throw e;
            });
            return w;
        });
    },
    {
        size: navigator.hardwareConcurrency,
    }
);
