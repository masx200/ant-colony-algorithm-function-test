import { NodeCoordinates } from "./NodeCoordinates";
// import { PureDataOfFinishOneRoute } from "./PureDataOfFinishOneRoute";
import { SharedOptions } from "./SharedOptions";
import { run_greedy_once_thread } from "./run_greedy_once_thread";
import { get_best_routeOfSeriesRoutesAndLengths } from "./get_best_routeOfSeriesRoutesAndLengths";
// import { PathTabooList } from "../pathTabooList/PathTabooList";
/**并行计算贪心算法搜索路径 */
export async function greedy_first_search_routes_parallel({
    max_routes_of_greedy,
    setPheromoneZero,
    node_coordinates,
    // pathTabooList,
    count_of_nodes,
}: // set_best_length,
// set_best_route,
// emit_finish_one_route,
// pheromoneStore,
{
    // pathTabooList: PathTabooList;
    node_coordinates: NodeCoordinates;
    count_of_nodes: number;
    // set_best_length: (bestlength: number) => void;
    // set_best_route: (route: number[]) => void;
    // emit_finish_one_route: (data: PureDataOfFinishOneRoute) => void;
    // pheromoneStore: MatrixSymmetry<number>;
} & SharedOptions): Promise<
    { time_ms: number; route: number[]; total_length: number }[]
> {
    const routes_of_greedy = Math.min(max_routes_of_greedy, count_of_nodes);
    // console.log(routes_of_greedy);
    //
    const inputindexs = Array(node_coordinates.length)
        .fill(0)
        .map((_v, i) => i);
    const parallel_results = await Promise.all(
        Array.from<
            Promise<{
                total_length: number;
                route: number[];
                time_ms: number;
            }>
        >({ length: routes_of_greedy }).map(() =>
            run_greedy_once_thread(inputindexs, node_coordinates)
        )
    );

    // const { total_length, route,time_ms } = await run_greedy_once_thread(
    //     inputindexs,
    //     node_coordinates
    // );
    //     Greedyalgorithmtosolvetspwithallstartbest(
    //     node_coordinates
    //     // pathTabooList
    // );

    // const countofloops = count_of_nodes * count_of_nodes;

    // set_best_length(total_length);
    // set_best_route(route);

    //信息素初始化
    // MatrixFill(pheromoneStore, 1 / count_of_nodes / total_length);

    const { total_length: best_length } =
        get_best_routeOfSeriesRoutesAndLengths(parallel_results);

    setPheromoneZero(1 / count_of_nodes / best_length);
    // debugger
    // assert_true(pheromoneStore.values().every((a) => a > 0));
    // const endtime = Number(new Date());
    // const timems = endtime - starttime;
    // emit_finish_one_route({
    //     route,
    //     total_length,
    //     timems,
    //     countofloops,
    // });
    // return [{ route, total_length }];
    return parallel_results;
}
