import { Greedyalgorithmtosolvetspwithallstartbest } from "./Greedyalgorithmtosolvetspwithallstartbest";
import { Nodecoordinates } from "./Nodecoordinates";
import { PureDataOfFinishOneRoute } from "./PureDataOfFinishOneRoute";
import { MatrixFill, MatrixSymmetry } from "@masx200/sparse-2d-matrix";

export function greedy_first_search_route({
    nodecoordinates,
    countofnodes,
    setbestlength,
    setbestroute,
    emit_finish_one_route,
    pheromonestore,
}: {
    nodecoordinates: Nodecoordinates;
    countofnodes: number;
    setbestlength: (bestlength: number) => void;
    setbestroute: (route: number[]) => void;
    emit_finish_one_route: (data: PureDataOfFinishOneRoute) => void;
    pheromonestore: MatrixSymmetry<number>;
}) {
    const starttime = Number(new Date());
    const { route, totallength } =
        Greedyalgorithmtosolvetspwithallstartbest(nodecoordinates);
    const endtime = Number(new Date());
    const countofloops = countofnodes * countofnodes;
    const timems = endtime - starttime;
    // totaltimems += timems;
    // current_search_count++;
    //    stagnantlength = totallength;
    setbestlength(totallength);
    setbestroute(route);
    emit_finish_one_route({
        route,
        totallength,
        timems,
        countofloops,
    });
    //信息素初始化
    MatrixFill(pheromonestore, 1 / countofnodes / totallength);
}
