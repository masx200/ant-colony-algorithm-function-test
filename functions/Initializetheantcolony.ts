import { SparseMatrixFill } from "../matrixtools/SparseMatrixFill";
import { SparseMatrixSymmetry } from "../matrixtools/SparseMatrixSymmetry";
import { Greedyalgorithmtosolvetspwithallstartbest } from "./Greedyalgorithmtosolvetspwithallstartbest";
import { Nodecoordinates } from "./Nodecoordinates";

export type InitializeOptions = {
    setbestroute: (route: number[]) => void;
    setbestpathlength: (a: number) => void;
    getbestlength: () => number;
    pheromonestore: SparseMatrixSymmetry;
    nodecoordinates: Nodecoordinates;
};

/* 初始化信息素,贪心算法得到最优路径和最短路径长度 */
export function Initializetheantcolony(opts: InitializeOptions) {
    const {
        nodecoordinates,
        getbestlength,
        setbestpathlength,
        setbestroute,
        pheromonestore,
    } = opts;
    // console.log(opts);
    const { route: greedypath, totallength } =
        Greedyalgorithmtosolvetspwithallstartbest(nodecoordinates);
    console.log("贪心算法得到的路径是", greedypath);

    // const totallength = closedtotalpathlength(greedypath, nodecoordinates);
    console.log("贪心算法得出的路径长度", totallength);
    if (totallength < getbestlength()) {
        setbestpathlength(totallength);
        setbestroute(greedypath);
    }
    const initialpheromone = 1 / nodecoordinates.length / totallength;
    SparseMatrixFill(pheromonestore, initialpheromone);
}
