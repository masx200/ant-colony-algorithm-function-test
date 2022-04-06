import { NodeCoordinates } from "./NodeCoordinates";
import { Greedyalgorithmtosolvetspwithselectedstart } from "./Greedyalgorithmtosolvetspwithselectedstart";
import { closedtotalpathlength } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
import { cycle_reorganize } from "./cycle_reorganize";
/* 可选起点的贪心算法 */
export function Greedy_solve_tsp_with_selected_start_length_time_ms(
    node_coordinates: NodeCoordinates,
    start: number
): { total_length: number; route: number[]; time_ms: number } {
    const start_time = Number(new Date());
    const route = Greedyalgorithmtosolvetspwithselectedstart(
        node_coordinates,
        start
    );
    const greedypath = cycle_reorganize(route, 0);
    const total_length = closedtotalpathlength({
        path: greedypath,
        getdistancebyindex: creategetdistancebyindex(node_coordinates),
    });
    const end_time = Number(new Date());
    const time_ms = -start_time + end_time;
    return { total_length, route: greedypath, time_ms };
}
