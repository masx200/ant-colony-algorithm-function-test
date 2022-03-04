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
    /**
     * 蚂蚁数量
     */
    numberofants: number;
    alphazero: number;
    betazero: number;
    pathTabooList: PathTabooList;
    /**迭代次数 */
    numberofiterations: number;
    pheromonestore: SparseTwoDimensionalMatrixSymmetry;
    /* 停滞迭代次数.如果连续多少代无法发现新路径,则停止搜索 */
    numberofstagnantiterations: number;
};
/* 令蚁群算法开始迭代 多少次搜索 */
export function myantsystemtspsearchsolve(opts: Mytspsearchoptions) {
    console.log(opts);
}
