import { closedtotalpathlength } from "./closed-total-path-length";
import { fill_sparse_two_dimensional_matrix } from "./fill_sparse_two_dimensional_matrix";
import { Greedyalgorithmtosolvetspwithallstartbest } from "./Greedyalgorithmtosolvetspwithallstartbest";
import { Nodecoordinates } from "./Nodecoordinates";
import { SparseTwoDimensionalMatrixSymmetry } from "./SparseTwoDimensionalMatrixSymmetry";

export type InitializeOptions = {
    setbestroute: (route: number[]) => void;
    setbestpathlength: (a: number) => void;
    getbestpathlength: () => number;
    pheromonestore: SparseTwoDimensionalMatrixSymmetry;
    nodecoordinates: Nodecoordinates;
};

/* 初始化信息素,贪心算法得到最优路径和最短路径长度 */
export function Initializetheantcolony(opts: InitializeOptions) {
    const {
        nodecoordinates,
        getbestpathlength,
        setbestpathlength,
        setbestroute,
        pheromonestore,
    } = opts;
    // console.log(opts);
    const greedypath =
        Greedyalgorithmtosolvetspwithallstartbest(nodecoordinates);
    console.log("贪心算法得到的路径是", greedypath);

    const totallength = closedtotalpathlength(greedypath, nodecoordinates);
    console.log("贪心算法得出的路径长度", totallength);
    if (totallength < getbestpathlength()) {
        setbestpathlength(totallength);
        setbestroute(greedypath);
    }
    const initialpheromone = 1 / nodecoordinates.length / totallength;
    fill_sparse_two_dimensional_matrix(pheromonestore, initialpheromone);
}
