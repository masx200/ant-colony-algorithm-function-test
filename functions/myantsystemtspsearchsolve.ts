import { Nodecoordinates } from "./Nodecoordinates";
import { PathTabooList } from "./PathTabooList";
import { SparseTwoDimensionalMatrixSymmetry } from "./SparseTwoDimensionalMatrixSymmetry";

export type Mytspsearchoptions = {
    /**信息素强度*/
    pheromoneintensityQ: number;
    /**信息素挥发系数 */
    pheromonevolatilitycoefficientR: number;
    setbestroute: (route: number[]) => void;
    setbestpathlength: (a: number) => void;
    getbestpathlength: () => number;
    nodecoordinates: Nodecoordinates;

    numberofants: number;
    alphazero: number;
    betazero: number;
    pathTabooList: PathTabooList;
    numberofiterations: number;
    pheromonestore: SparseTwoDimensionalMatrixSymmetry;
};
/* 令蚁群算法开始迭代 多少次搜索 */
export function myantsystemtspsearchsolve(opts: Mytspsearchoptions) {
    console.log(opts);
}
