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
import { NodeCoordinates } from "./NodeCoordinates";
// import { PathTabooList } from "../pathTabooList/PathTabooList";
import { picknextnodeRoulette } from "./pick-next-node-Roulette";
import { PickNextNodeRouletteOptions } from "./PickNextNodeRouletteOptions";
import { pickRandomOne } from "./pickRandomOne";

// export type PathConstructOptions = ;
/**使用状态转移概率生成路径. */
export function generate_paths_using_state_transition_probabilities(opts: {
    alpha_zero: number;
    beta_zero: number;
    randomselectionprobability: number;
    /**搜索循环次数比例 */
    // searchloopcountratio: number;
    // get_best_length: () => number;
    node_coordinates: NodeCoordinates;
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
    // count_of_nodes: number;
    /* 通过序号获得欧氏距离 */
    // getdistancebyserialnumber: GetDistanceBySerialNumber;

    pheromoneStore: MatrixSymmetry;
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
        // get_best_length,
        //  parameterrandomization,
        // startnode,
        //   count_of_nodes,

        // intersectionfilter,
        node_coordinates,
        // picknextnode,
        pheromoneStore,

        //   ,
        //    ,
        alpha_zero,
        //     ,
        //    ,
        beta_zero,
        // pathTabooList,
    } = opts;

    const count_of_nodes = node_coordinates.length;
    /**单次搜索最多循环次数 */
    // const maximumnumberofloopsforasinglesearch =
    //     count_of_nodes * searchloopcountratio;
    // //console.log("单次搜索最多循环次数", maximumnumberofloopsforasinglesearch);
    const getpheromone = (left: number, right: number) => {
        return pheromoneStore.get(left, right);
    };
    const getdistancebyserialnumber = (left: number, right: number) => {
        return geteuclideandistancebyindex(left, right, node_coordinates);
    };

    // const pathTabooList: pathTabooList = createpathTabooList(count_of_nodes);
    const inputindexs = Array(node_coordinates.length)
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
        route.length !== count_of_nodes /* &&
        trycount < count_of_nodes * searchloopcountratio */
    ) {
        const availablenodes = new Set<number>(
            Array(count_of_nodes)
                .fill(0)
                .map((_v, i) => i)
                .filter((v) => !route.includes(v))
        );
        const filterednodes = availablenodes;
        const nextnode = picknextnode({
            randomselectionprobability,
            //   ,
            //  ,
            alpha_zero,
            //  ,
            //   ,
            beta_zero,
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
        //     `第${trycount}次/${count_of_nodes * searchloopcountratio}`,
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
        //         count_of_nodes,
        //         get_best_length,
        //         filternotforbiddenbeforepick,
        //         getdistancebyserialnumber,
        //         getpheromone,
        //         getroute,
        //         intersectionfilter,
        //         node_coordinates,
        //         pathTabooList,
        //         picknextnode,
        //         alpha_zero,
        //         beta_zero,
        //         randomselectionprobability,
        //     })
        // );
        // debugger;
        /* 路径长度检查 */
    }

    // if (route.length !== count_of_nodes) {
    //     console.warn(
    //         "构建路径超出循环次数,使用贪心算法方式构建剩余的路径",
    //         route
    //     );

    //     while (route.length !== count_of_nodes) {
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
    //                     node_coordinates
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
    asserttrue(route.length == count_of_nodes);
    const routelength = closedtotalpathlength({
        // count_of_nodes: route.length,
        path: route,
        getdistancebyindex: creategetdistancebyindex(node_coordinates),
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
