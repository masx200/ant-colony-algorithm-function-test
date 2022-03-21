import { asserttrue } from "../test/asserttrue";
import { FilterForbiddenBeforePick } from "./FilterForbiddenBeforePick.funtype";
import { IntersectionFilter } from "./IntersectionFilter.funtype";
import { NodeCoordinates } from "./NodeCoordinates";
import { PathTabooList } from "../pathTabooList/PathTabooList";
import { PickNextNodeRouletteOptions } from "./PickNextNodeRouletteOptions";
import { closedtotalpathlength } from "./closed-total-path-length";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
import { pickRandomOne } from "./pickRandomOne";

/**构建一步路径,并返回下一次的路径 */
export function construct_one_step_route_of_taboo({
    // searchloopcountratio,
    // probabilityofacceptingasuboptimalsolution,
    // startnode,
    getdistancebyserialnumber,
    get_best_length,
    randomselectionprobability,
    alpha_zero,
    beta_zero,
    picknextnode,
    getroute,
    count_of_nodes,
    filternotforbiddenbeforepick,
    pathTabooList,
    node_coordinates,
    intersectionfilter,
    getpheromone,
}: {
    /**搜索循环次数比例 */
    // searchloopcountratio: number;
    /**接受次优解的概率*/
    // probabilityofacceptingasuboptimalsolution: number;
    getdistancebyserialnumber: (left: number, right: number) => number;
    intersectionfilter: IntersectionFilter;
    node_coordinates: NodeCoordinates;
    get_best_length: () => number;
    randomselectionprobability: number;

    alpha_zero: number;

    beta_zero: number;
    picknextnode: (args: PickNextNodeRouletteOptions) => number;
    // startnode: number;
    pathTabooList: PathTabooList;
    count_of_nodes: number;
    getroute: () => number[];
    getpheromone: (left: number, right: number) => number;
    filternotforbiddenbeforepick: FilterForbiddenBeforePick;
}): number[] {
    const inputindexs = Array(node_coordinates.length)
        .fill(0)
        .map((_v, i) => i);
    const startnode = getnumberfromarrayofnmber(pickRandomOne(inputindexs));
    /**单次搜索最多循环次数 */
    // const maximumnumberofloopsforasinglesearch =
    //     count_of_nodes * searchloopcountratio;
    const route = getroute();
    if (route.length > count_of_nodes || route.length < 1) {
        throw Error("route accident");
    }
    const availablenodes = new Set<number>(
        Array(count_of_nodes)
            .fill(0)
            .map((_v, i) => i)
            .filter((v) => !route.includes(v))
    );
    // debugger;
    /* 找出禁忌表中不包含的路径 */
    const selectednodes = Array.from(availablenodes).filter((value) =>
        filternotforbiddenbeforepick(
            // count_of_nodes,
            Array.from(route),
            pathTabooList,
            value
        )
    );

    const filterednodes = selectednodes;
    /* 可能出现无路可走的情况添加到禁忌表中  ,并回溯*/
    if (route.length > 1 && filterednodes.length === 0) {
        pathTabooList.add(Array.from(route));
        console.warn("路径构建失败,无路可走,禁忌此路径", route);
        /* 退回上一步 */
        // route = route.slice(0, route.length - 1);
        //无路可走开始广度搜索吧
        /* route = */
        // debugger;
        return [startnode];
    } else {
        // debugger;
        if (filterednodes.length === 0) {
            /* 路径长度为1,没有可选的下一个点是不可能的 */
            throw Error("accident");
        }
        //     debugger;
        // }
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
        asserttrue(!pathTabooList.has([...route, nextnode]));

        if (route.length + 1 === count_of_nodes) {
            //已经完成一条路径退出循环
            return [...route, nextnode];
        }
        //先判断交叉点,然后判断路径长度是否大于最短路径
        if (
            route.length >= 3 &&
            intersectionfilter({
                currentroute: Array.from(route),

                nextnode,
                node_coordinates,
            })
        ) {
            pathTabooList.add([...route, nextnode]);
            //深度搜索
            // route = route.slice();
            console.warn("路径构建失败,遇到交叉点,禁忌此路径", [
                ...route,
                nextnode,
            ]);
            // debugger;
            return route;
        }
        if (
            //如果所有城市都经过了,则结束了,如果没走完所有城市,则计算部分城市的环路路径长度
            route.length < count_of_nodes &&
            route.length >= 2 &&
            closedtotalpathlength({
                // count_of_nodes: route.length,
                path: route,
                getdistancebyindex: getdistancebyserialnumber,
            }) > get_best_length()
        ) {
            //测试不接受次优解
            pathTabooList.add([...route, nextnode]);
            console.warn(
                "路径构建失败,路径片段长度已经大于最优路径长度,禁忌此路径",
                [...route, nextnode]
            );
            //广度搜索
            // console.log(
            //     "接受次优解的概率为",
            //     probabilityofacceptingasuboptimalsolution
            // );
            return [startnode];
            // }
            // {
            //             if (Math.random() < probabilityofacceptingasuboptimalsolution) {
            //                 console.warn(
            //                     "接受次优解，路径片段长度已经大于最优路径长度，路径构建经过节点",
            //                     [...route, nextnode]
            //                 );
            //                 return [...route, nextnode];
            //             } else {
            //                 /* .在构建路径过程中,如果当前路径片段总长度已经大于最优解的长度,则停止此路径搜索,并把路径片段加入路径禁忌列表中. */
            //                 pathTabooList.add([...route, nextnode]);
            //                 console.warn(
            //                     "路径构建失败,路径片段长度已经大于最优路径长度,禁忌此路径",
            //                     [...route, nextnode]
            //                 );
            //                 //广度搜索
            //                 return [startnode];
            // }
            //route = route.slice();
            // debugger;
            // return route;
            // }
        } else {
            // route = [...route, nextnode];
            // console.log("路径构建正常经过节点", [...route, nextnode]);
            return [...route, nextnode];
        }
    }
}
