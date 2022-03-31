import { Greedyalgorithmtosolvetspwithselectedstart } from "../functions/Greedyalgorithmtosolvetspwithselectedstart";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { createWorkerPool } from "./createWorkerPool";
import { create_Worker_comlink } from "./create_Worker_comlink";
import Greedy_algorithm_to_solve_tsp_with_selected_start_Worker from "./Greedy_algorithm_to_solve_tsp_with_selected_start.worker?worker";
const Greedy_algorithm_to_solve_tsp_with_selected_start_pool = createWorkerPool(
    () => {
        return create_Worker_comlink<{
            Greedyalgorithmtosolvetspwithselectedstart: typeof Greedyalgorithmtosolvetspwithselectedstart;
        }>(() => {
            const w= new Greedy_algorithm_to_solve_tsp_with_selected_start_Worker();
w.addEventListener("error",e=>{
alert(e)
throw e
})
return w
        });
    },
    {
        size: navigator.hardwareConcurrency,
    }
);
export async function thread_Greedy_algorithm_to_solve_tsp_with_selected_start(
    node_coordinates: NodeCoordinates,
    start: number
): Promise<number[]> {
    const remote =
        Greedy_algorithm_to_solve_tsp_with_selected_start_pool.getOne().remote;

    return remote.Greedyalgorithmtosolvetspwithselectedstart(
        node_coordinates,
        start
    );
}
