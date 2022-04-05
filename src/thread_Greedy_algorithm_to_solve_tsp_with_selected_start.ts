import { NodeCoordinates } from "../functions/NodeCoordinates";
import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "./Greedy_algorithm_to_solve_tsp_with_selected_start_pool";
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
