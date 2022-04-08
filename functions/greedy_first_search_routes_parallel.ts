import { NodeCoordinates } from "./NodeCoordinates";
// import { PureDataOfFinishOneRoute } from "./PureDataOfFinishOneRoute";
import { SharedOptions } from "./SharedOptions";
import { run_greedy_once_thread } from "./run_greedy_once_thread";
import { Greedy_algorithm_to_solve_tsp_with_selected_start_pool } from "../src/Greedy_algorithm_to_solve_tsp_with_selected_start_pool";
// import { PathTabooList } from "../pathTabooList/PathTabooList";
/**并行计算贪心算法搜索路径 */
export async function* greedy_first_search_routes_parallel({
    max_routes_of_greedy,
    node_coordinates,
    // pathTabooList,
    count_of_nodes,
    round = false,
}: // set_best_length,
// set_best_route,
// emit_finish_one_route,
// pheromoneStore,
{
    round?: boolean;
    // pathTabooList: PathTabooList;
    node_coordinates: NodeCoordinates;
    count_of_nodes: number;
    // set_best_length: (bestlength: number) => void;
    // set_best_route: (route: number[]) => void;
    // emit_finish_one_route: (data: PureDataOfFinishOneRoute) => void;
    // pheromoneStore: MatrixSymmetry<number>;
} & SharedOptions): AsyncGenerator<
    { total_length: number; route: number[]; time_ms: number },
    void,
    unknown
> {
    const routes_of_greedy = Math.min(max_routes_of_greedy, count_of_nodes);

    const inputindexs = Array(node_coordinates.length)
        .fill(0)
        .map((_v, i) => i);
    const max_current =
        Greedy_algorithm_to_solve_tsp_with_selected_start_pool.size;
    let rest_count = routes_of_greedy;
    while (rest_count > 0) {
        const current_threads = Math.min(max_current, rest_count);
        const parallel_results = await Promise.all(
            Array.from<
                Promise<{
                    total_length: number;
                    route: number[];
                    time_ms: number;
                }>
            >({ length: current_threads }).map(() =>
                run_greedy_once_thread(inputindexs, node_coordinates, round)
            )
        );
        rest_count -= current_threads;
        for (const result of parallel_results) {
            yield result;
        }
    }

    // return parallel_results;
}
