import { NodeCoordinates } from "./NodeCoordinates";
import { Greedyalgorithmtosolvetspwithselectedstart } from "./Greedyalgorithmtosolvetspwithselectedstart";
import { closed_total_path_length } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
import { cycle_reorganize } from "./cycle_reorganize";
import { distance_round } from "../src/default_Options";

/* 可选起点的贪心算法 */
export function Greedy_solve_tsp_with_selected_start_length_time_ms(
    node_coordinates: NodeCoordinates,
    start: number,
    round = false,
    max_cities_of_greedy = Infinity
): { total_length: number; route: number[]; time_ms: number } {
    const start_time = Number(new Date());
    const route = Greedyalgorithmtosolvetspwithselectedstart(
        node_coordinates,
        start,
        round,
        max_cities_of_greedy
    );
    const greedypath = cycle_reorganize(route, 0);
    const total_length = closed_total_path_length({
        round: distance_round,
        path: greedypath,
        getdistancebyindex: creategetdistancebyindex(node_coordinates, round),
    });
    const end_time = Number(new Date());
    const time_ms = -start_time + end_time;
    return { total_length, route: greedypath, time_ms };
}
