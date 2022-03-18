// import { filternotforbiddenbeforepickfun } from "./filterforbiddenbeforepickfun";
import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { asserttrue } from "../test/asserttrue";
import { closedtotalpathlength } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
// import { construct_one_step_route_of_taboo } from "./construct_one_step_route_of_taboo";
// import { FilterForbiddenBeforePick } from "./FilterForbiddenBeforePick.funtype";
import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
// import { IntersectionFilter } from "./IntersectionFilter.funtype";
// import { intersectionfilterfun } from "./intersectionfilterfun";
import { Nodecoordinates } from "./Nodecoordinates";
// import { PathTabooList } from "../pathTabooList/PathTabooList";
import { picknextnodeRoulette } from "./pick-next-node-Roulette";
import { PickNextNodeRouletteOptions } from "./PickNextNodeRouletteOptions";
import { pickRandomOne } from "./pickRandomOne";

// export type PathConstructOptions = ;
/**使用状态转移概率生成路径. */
export function generate_paths_using_state_transition_probabilities(opts: {
    alphazero: number;
    betazero: number;
    randomselectionprobability: number;
    /**搜索循环次数比例 */
    // searchloopcountratio: number;
    // getbestlength: () => number;
    nodecoordinates: Nodecoordinates;
    /**交叉点检测器  ,如果是回路还要检查最后一条线是否有交叉点*/
    // intersectionfilter: IntersectionFilter;
    /**选择下一个节点使用轮盘选择法 */
    // picknextnode(args: PickNextNodeRouletteOptions): number;
    // pathTabooList: PathTabooList;
    // startnode: number;
    /**过滤禁忌表当中的节点 */

    // parameterrandomization: boolean;

    /* 通过序号获得信息素 */
    // getpheromone: GetPheromone;
    // countofnodes: number;
    /* 通过序号获得欧氏距离 */
    // getdistancebyserialnumber: GetDistanceBySerialNumber;

    pheromonestore: MatrixSymmetry;
}): {
    route: number[];
    totallength: number;
    // countofloops: number;
} {
    // const filternotforbiddenbeforepick: FilterForbiddenBeforePick =
    //     filternotforbiddenbeforepickfun;
    // const intersectionfilter: IntersectionFilter = intersectionfilterfun;
    const picknextnode: (args: PickNextNodeRouletteOptions) => number =
        picknextnodeRoulette;
    const {
        // searchloopcountratio,

        randomselectionprobability,
        // getbestlength,
        //  parameterrandomization,
        // startnode,
        //   countofnodes,

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
        // pathTabooList,
    } = opts;

    const countofnodes = nodecoordinates.length;
    /**单次搜索最多循环次数 */
    // const maximumnumberofloopsforasinglesearch =
    //     countofnodes * searchloopcountratio;
    // //console.log("单次搜索最多循环次数", maximumnumberofloopsforasinglesearch);
    const getpheromone = (left: number, right: number) => {
        return pheromonestore.get(left, right);
    };
    const getdistancebyserialnumber = (left: number, right: number) => {
        return geteuclideandistancebyindex(left, right, nodecoordinates);
    };

    // const pathTabooList: pathTabooList = createpathTabooList(countofnodes);
    const inputindexs = Array(nodecoordinates.length)
        .fill(0)
        .map((_v, i) => i);
    const startnode = getnumberfromarrayofnmber(pickRandomOne(inputindexs));
    let route: number[] = [startnode];
    // function getroute() {
    //     return Array.from(route);
    // }
    /**循环次数 */
    // let trycount = 0;
    // const starttime = Number(new Date());
    while (
        route.length !== countofnodes /* &&
        trycount < countofnodes * searchloopcountratio */
    ) {
        const availablenodes = new Set<number>(
            Array(countofnodes)
                .fill(0)
                .map((_v, i) => i)
                .filter((v) => !route.includes(v))
        );
        const filterednodes = availablenodes;
        const nextnode = picknextnode({
            randomselectionprobability,
            //   ,
            //  ,
            alphazero,
            //  ,
            //   ,
            betazero,
            //  parameterrandomization,
            currentnode: Array.from(route).slice(-1)[0],
            availablenextnodes: Array.from(filterednodes),
            getpheromone,
            getdistancebyserialnumber,
        });
        route = [...route, nextnode];
        // route=
        // trycount++;
        //console.log(
        //     `第${trycount}次/${countofnodes * searchloopcountratio}`,
        //     "路径构建开始",
        //     route
        // );
        //接受次优解的概率;
        // let probabilityofacceptingasuboptimalsolution = Math.max(
        //     0,
        //     Math.min(1, trycount / maximumnumberofloopsforasinglesearch)
        // );
        // route = Array.from(
        //     construct_one_step_route_of_taboo({
        //         // probabilityofacceptingasuboptimalsolution,
        //         // startnode,
        //         countofnodes,
        //         getbestlength,
        //         filternotforbiddenbeforepick,
        //         getdistancebyserialnumber,
        //         getpheromone,
        //         getroute,
        //         intersectionfilter,
        //         nodecoordinates,
        //         pathTabooList,
        //         picknextnode,
        //         alphazero,
        //         betazero,
        //         randomselectionprobability,
        //     })
        // );
        // debugger;
        /* 路径长度检查 */
    }

    // if (route.length !== countofnodes) {
    //     console.warn(
    //         "构建路径超出循环次数,使用贪心算法方式构建剩余的路径",
    //         route
    //     );

    //     while (route.length !== countofnodes) {
    //         const currentnode = route.slice(-1)[0];
    //         const restnodes = inputindexs.filter(
    //             (city) => !route.includes(city)
    //         );

    //         const nextnodesanddistances: {
    //             nextnode: number;
    //             distance: number;
    //         }[] = restnodes.map((value) => {
    //             return {
    //                 nextnode: value,
    //                 distance: geteuclideandistancebyindex(
    //                     currentnode,
    //                     value,
    //                     nodecoordinates
    //                 ),
    //             };
    //         });
    //         const bestnextnodeanddistance: {
    //             nextnode: number;
    //             distance: number;
    //         } = nextnodesanddistances.reduce((previous, current) => {
    //             return previous.distance < current.distance
    //                 ? previous
    //                 : current;
    //         }, nextnodesanddistances[0]);
    //         const nextnode = bestnextnodeanddistance.nextnode;
    //         route = [...route, nextnode];
    //     }
    // }
    asserttrue(route.length == countofnodes);
    const routelength = closedtotalpathlength({
        // countofnodes: route.length,
        path: route,
        getdistancebyindex: creategetdistancebyindex(nodecoordinates),
    });
    const totallength = routelength;
    // console.log("路径一条构建完成,循环次数", trycount);
    // const endtime = Number(new Date());
    //console.log("路径一条构建完成,消耗时间毫秒", endtime - starttime);
    //console.log(
    //   "路径一条构建完成,平均每次循环消耗的时间毫秒",
    //    (endtime - starttime) / trycount
    //   );
    return { route, totallength /* countofloops: trycount  */ };
}
