import { SparseMatrixSymmetry } from "../matrixtools/SparseMatrixSymmetry";
import { Constants } from "./Constants";
import { constructonesteproute } from "./constructonesteproute";
import { FilterForbiddenBeforePick } from "./FilterForbiddenBeforePick.funtype";
import { filterforbiddenbeforepickfun } from "./filterforbiddenbeforepickfun";
import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { IntersectionFilter } from "./IntersectionFilter.funtype";
import { intersectionfilterfun } from "./intersectionfilterfun";
import { Nodecoordinates } from "./Nodecoordinates";
import { PathTabooList } from "./PathTabooList";
import { picknextnodeRoulette } from "./pick-next-node-Roulette";
import { PickNextNodeRouletteOptions } from "./PickNextNodeRouletteOptions";

export type PathConstructOptions = Constants & {
    getbestlength: () => number;
    nodecoordinates: Nodecoordinates;
    /**交叉点检测器  ,如果是回路还要检查最后一条线是否有交叉点*/
    // intersectionfilter: IntersectionFilter;
    /**选择下一个节点使用轮盘选择法 */
    // picknextnode(args: PickNextNodeRouletteOptions): number;
    pathTabooList: PathTabooList;
    startnode: number;
    /**过滤禁忌表当中的节点 */
    // filterforbiddenbeforepick: FilterForbiddenBeforePick;
    // parameterrandomization: boolean;

    /* 通过序号获得信息素 */
    // getpheromone: GetPheromone;
    // countofnodes: number;
    /* 通过序号获得欧氏距离 */
    // getdistancebyserialnumber: GetDistanceBySerialNumber;
probabilityofacceptingasuboptimalsolution:number,
    pheromonestore: SparseMatrixSymmetry;
};
/**禁忌回溯路径构建 */
export function taboo_backtracking_path_construction(
    opts: PathConstructOptions
): number[] {
    const filterforbiddenbeforepick: FilterForbiddenBeforePick =
        filterforbiddenbeforepickfun;
    const intersectionfilter: IntersectionFilter = intersectionfilterfun;
    const picknextnode: (args: PickNextNodeRouletteOptions) => number =
        picknextnodeRoulette;
    const {probabilityofacceptingasuboptimalsolution,
        randomselectionprobability,
        getbestlength,
        //  parameterrandomization,
        startnode,
        //   countofnodes,
        //   filterforbiddenbeforepick,
        // intersectionfilter,
        nodecoordinates,
        // picknextnode,
        pheromonestore,

        //   ,
        //    ,
        alphazero,
        //     ,
        //    ,
        betazero,
        pathTabooList,
    } = opts;
    const countofnodes = nodecoordinates.length;
    const getpheromone = (left: number, right: number) => {
        return pheromonestore.get(left, right);
    };
    const getdistancebyserialnumber = (left: number, right: number) => {
        return geteuclideandistancebyindex(left, right, nodecoordinates);
    };

    // const pathTabooList: PathTabooList = createPathTabooList(countofnodes);

    let route: number[] = [startnode];
    function getroute() {
        return Array.from(route);
    }
    let trycount = 0;
    const starttime = Number(new Date());
    while (route.length !== countofnodes) {
        trycount++;
        console.log("路径构建开始", route);

        route = Array.from(
            constructonesteproute({probabilityofacceptingasuboptimalsolution,
                startnode,
                countofnodes,
                getbestlength,
                filterforbiddenbeforepick,
                getdistancebyserialnumber,
                getpheromone,
                getroute,
                intersectionfilter,
                nodecoordinates,
                pathTabooList,
                picknextnode,
                alphazero,
                betazero,
                randomselectionprobability,
            })
        );
        // debugger;
        /* 路径长度检查 */
    }
    console.log("路径一条构建完成,循环次数", trycount);
    const endtime = Number(new Date());
    console.log("路径一条构建完成,消耗时间毫秒", endtime - starttime);
    console.log(
        "路径一条构建完成,平均每次循环消耗的时间毫秒",
        (endtime - starttime) / trycount
    );
    return route;
}
