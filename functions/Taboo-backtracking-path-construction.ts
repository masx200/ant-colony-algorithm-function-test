import { pickRandom } from "mathjs";
import { SparseMatrixSymmetry } from "../matrixtools/SparseMatrixSymmetry";
import { asserttrue } from "../test/asserttrue";
import { Constants } from "./Constants";
import { constructonesteproute } from "./constructonesteproute";
import { FilterForbiddenBeforePick } from "./FilterForbiddenBeforePick.funtype";
import { filterforbiddenbeforepickfun } from "./filterforbiddenbeforepickfun";
import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
import { IntersectionFilter } from "./IntersectionFilter.funtype";
import { intersectionfilterfun } from "./intersectionfilterfun";
import { Nodecoordinates } from "./Nodecoordinates";
import { PathTabooList } from "./PathTabooList";
import { picknextnodeRoulette } from "./pick-next-node-Roulette";
import { PickNextNodeRouletteOptions } from "./PickNextNodeRouletteOptions";

export type PathConstructOptions = Constants & {
    /**搜索循环次数比例 */
    searchloopcountratio: number;
    getbestlength: () => number;
    nodecoordinates: Nodecoordinates;
    /**交叉点检测器  ,如果是回路还要检查最后一条线是否有交叉点*/
    // intersectionfilter: IntersectionFilter;
    /**选择下一个节点使用轮盘选择法 */
    // picknextnode(args: PickNextNodeRouletteOptions): number;
    pathTabooList: PathTabooList;
    // startnode: number;
    /**过滤禁忌表当中的节点 */
    // filterforbiddenbeforepick: FilterForbiddenBeforePick;
    // parameterrandomization: boolean;

    /* 通过序号获得信息素 */
    // getpheromone: GetPheromone;
    // countofnodes: number;
    /* 通过序号获得欧氏距离 */
    // getdistancebyserialnumber: GetDistanceBySerialNumber;

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
    const {
        searchloopcountratio,

        randomselectionprobability,
        getbestlength,
        //  parameterrandomization,
        // startnode,
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
    /**单次搜索最多循环次数 */
    // const maximumnumberofloopsforasinglesearch =
    //     countofnodes * searchloopcountratio;
    // console.log("单次搜索最多循环次数", maximumnumberofloopsforasinglesearch);
    const getpheromone = (left: number, right: number) => {
        return pheromonestore.get(left, right);
    };
    const getdistancebyserialnumber = (left: number, right: number) => {
        return geteuclideandistancebyindex(left, right, nodecoordinates);
    };

    // const pathTabooList: PathTabooList = createPathTabooList(countofnodes);
    const inputindexs = Array(nodecoordinates.length)
        .fill(0)
        .map((_v, i) => i);
    const startnode = getnumberfromarrayofnmber(pickRandom(inputindexs));
    let route: number[] = [startnode];
    function getroute() {
        return Array.from(route);
    }
    /**循环次数 */
    let trycount = 0;
    const starttime = Number(new Date());
    while (
        route.length !== countofnodes &&
        trycount <= countofnodes * searchloopcountratio
    ) {
        trycount++;
        console.log(`第${trycount}次`, "路径构建开始", route);
        //接受次优解的概率;
        // let probabilityofacceptingasuboptimalsolution = Math.max(
        //     0,
        //     Math.min(1, trycount / maximumnumberofloopsforasinglesearch)
        // );
        route = Array.from(
            constructonesteproute({
                // probabilityofacceptingasuboptimalsolution,
                // startnode,
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

    if (route.length !== countofnodes) {
        console.warn(
            "构建路径超出循环次数,使用完全随机方式构建剩余的路径",
            route
        );

        while (route.length !== countofnodes) {
            const restcities = inputindexs.filter(
                (city) => !route.includes(city)
            );
            const nextnode = getnumberfromarrayofnmber(pickRandom(restcities));
            route = [...route, nextnode];
        }
    }
    asserttrue(route.length == countofnodes);
    console.log("路径一条构建完成,循环次数", trycount);
    const endtime = Number(new Date());
    console.log("路径一条构建完成,消耗时间毫秒", endtime - starttime);
    console.log(
        "路径一条构建完成,平均每次循环消耗的时间毫秒",
        (endtime - starttime) / trycount
    );
    return route;
}
