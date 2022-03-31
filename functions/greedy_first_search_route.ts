import { NodeCoordinates } from "./NodeCoordinates";
// import { PureDataOfFinishOneRoute } from "./PureDataOfFinishOneRoute";
import { MatrixFill, MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { assert_true } from "../test/assert_true";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
import { pickRandomOne } from "./pickRandomOne";
import { Greedyalgorithmtosolvetspwithselectedstart } from "./Greedyalgorithmtosolvetspwithselectedstart";
import { closedtotalpathlength } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
import { cycle_reorganize } from "./cycle_reorganize";
// import { PathTabooList } from "../pathTabooList/PathTabooList";

export function greedy_first_search_route({
    node_coordinates,
    // pathTabooList,
    count_of_nodes,
    // setbestlength,
    // setbestroute,
    // emit_finish_one_route,
    pheromoneStore,
}: {
    // pathTabooList: PathTabooList;
    node_coordinates: NodeCoordinates;
    count_of_nodes: number;
    // setbestlength: (bestlength: number) => void;
    // setbestroute: (route: number[]) => void;
    // emit_finish_one_route: (data: PureDataOfFinishOneRoute) => void;
    pheromoneStore: MatrixSymmetry<number>;
}): { route: number[]; totallength: number } {
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
    const totallength = closedtotalpathlength({
        path: greedypath,
        getdistancebyindex: creategetdistancebyindex(node_coordinates),
    });
    //     Greedyalgorithmtosolvetspwithallstartbest(
    //     node_coordinates
    //     // pathTabooList
    // );

    // const countofloops = count_of_nodes * count_of_nodes;

    // setbestlength(totallength);
    // setbestroute(route);

    //信息素初始化
    MatrixFill(pheromoneStore, 1 / count_of_nodes / totallength);
    // debugger
    assert_true(pheromoneStore.values().every((a) => a > 0));
    // const endtime = Number(new Date());
    // const timems = endtime - starttime;
    // emit_finish_one_route({
    //     route,
    //     totallength,
    //     timems,
    //     countofloops,
    // });
    return { route, totallength };
}
