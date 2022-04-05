import { NodeCoordinates } from "./NodeCoordinates";
// import { PureDataOfFinishOneRoute } from "./PureDataOfFinishOneRoute";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
import { pickRandomOne } from "./pickRandomOne";
import { Greedyalgorithmtosolvetspwithselectedstart } from "./Greedyalgorithmtosolvetspwithselectedstart";
import { closedtotalpathlength } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
import { cycle_reorganize } from "./cycle_reorganize";
import { SharedOptions } from "./SharedOptions";
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
    } & SharedOptions): Promise<[{ time_ms: number; route: number[]; total_length: number }]> {
    const inputindexs = Array(node_coordinates.length)
        .fill(0)
        .map((_v, i) => i);
    const start = getnumberfromarrayofnmber(pickRandomOne(inputindexs));
    // const starttime = Number(new Date());
    const route = Greedyalgorithmtosolvetspwithselectedstart(
        node_coordinates,
        start
    );
    const greedypath = cycle_reorganize(route, 0);
    const total_length = closedtotalpathlength({
        path: greedypath,
        getdistancebyindex: creategetdistancebyindex(node_coordinates),
    });
    //     Greedyalgorithmtosolvetspwithallstartbest(
    //     node_coordinates
    //     // pathTabooList
    // );

    // const countofloops = count_of_nodes * count_of_nodes;

    // set_best_length(total_length);
    // set_best_route(route);

    //信息素初始化
    // MatrixFill(pheromoneStore, 1 / count_of_nodes / total_length);
    setPheromoneZero(1 / count_of_nodes / total_length);
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
    return [{ route, total_length }];
}
