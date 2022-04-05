import { NodeCoordinates } from "./NodeCoordinates";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
import { pickRandomOne } from "./pickRandomOne";
import { closedtotalpathlength } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
import { cycle_reorganize } from "./cycle_reorganize";
import { thread_Greedy_algorithm_to_solve_tsp_with_selected_start } from "../src/thread_Greedy_algorithm_to_solve_tsp_with_selected_start";

export async function run_greedy_once_thread(
    inputindexs: number[],
    node_coordinates: NodeCoordinates
): Promise<{ total_length: number; route: number[]; time_ms: number; }> {
    const start_time = Number(new Date());
    const start = getnumberfromarrayofnmber(pickRandomOne(inputindexs));

    const route =
        await thread_Greedy_algorithm_to_solve_tsp_with_selected_start(
            node_coordinates,
            start
        );
    const greedypath = cycle_reorganize(route, 0);
    const total_length = closedtotalpathlength({
        path: greedypath,
        getdistancebyindex: creategetdistancebyindex(node_coordinates),
    });
    const end_time = Number(new Date());
    const time_ms = start_time - end_time;
    return { total_length, route: greedypath, time_ms };
}
