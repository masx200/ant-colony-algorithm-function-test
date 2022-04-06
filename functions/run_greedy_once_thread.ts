import { NodeCoordinates } from "./NodeCoordinates";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
import { pickRandomOne } from "./pickRandomOne";
import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "../src/Greedy_algorithm_to_solve_tsp_with_selected_start_pool";

export async function run_greedy_once_thread(
    inputindexs: number[],
    node_coordinates: NodeCoordinates
): Promise<{ total_length: number; route: number[]; time_ms: number }> {
    const start = getnumberfromarrayofnmber(pickRandomOne(inputindexs));
    const remote =
        Greedy_algorithm_to_solve_tsp_with_selected_start_pool.getOne().remote;
    return remote.Greedy_solve_tsp_with_selected_start_length_time_ms(
        node_coordinates,
        start
    );
    // return { total_length, route: greedypath, time_ms };
}
