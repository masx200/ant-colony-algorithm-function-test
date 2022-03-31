import { Greedyalgorithmtosolvetspwithallstartbest } from "./Greedyalgorithmtosolvetspwithallstartbest";
import { NodeCoordinates } from "./NodeCoordinates";
// import { PureDataOfFinishOneRoute } from "./PureDataOfFinishOneRoute";
import { MatrixFill, MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { assert_true } from "../test/assert_true";
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
    // const starttime = Number(new Date());
    const { route, totallength } = Greedyalgorithmtosolvetspwithallstartbest(
        node_coordinates
        // pathTabooList
    );

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
