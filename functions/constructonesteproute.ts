import { asserttrue } from "../test/asserttrue";
import { FilterForbiddenBeforePick } from "./FilterForbiddenBeforePick.funtype";
import { IntersectionFilter } from "./IntersectionFilter.funtype";
import { Nodecoordinates } from "./Nodecoordinates";
import { PathTabooList } from "./PathTabooList";
import { PickNextNodeRouletteOptions } from "./PickNextNodeRouletteOptions";
import { totalpathlengthwithoutcycle } from "./totalpathlengthwithoutcycle";
/**构建一步路径,并返回下一次的路径 */
export function constructonesteproute({
    startnode,
    getdistancebyserialnumber,
    getbestpathlength,
    randomselectionprobability,
    alphazero,
    betazero,
    picknextnode,
    getroute,
    countofnodes,
    filterforbiddenbeforepick,
    pathTabooList,
    nodecoordinates,
    intersectionfilter,
    getpheromone,
}: {
    getdistancebyserialnumber: (left: number, right: number) => number;
    intersectionfilter: IntersectionFilter;
    nodecoordinates: Nodecoordinates;
    getbestpathlength: () => number;
    randomselectionprobability: number;

    alphazero: number;

    betazero: number;
    picknextnode: (args: PickNextNodeRouletteOptions) => number;
    startnode: number;
    pathTabooList: PathTabooList;
    countofnodes: number;
    getroute: () => number[];
    getpheromone: (left: number, right: number) => number;
    filterforbiddenbeforepick: FilterForbiddenBeforePick;
}): number[] {
    let route = getroute();
    if (route.length > countofnodes || route.length < 1) {
        throw Error("route accident");
    }
    const availablenodes = new Set<number>(
        Array(countofnodes)
            .fill(0)
            .map((_v, i) => i)
            .filter((v) => !route.includes(v))
    );
    // debugger;
    /* 找出禁忌表中不包含的路径 */
    const selectednodes = Array.from(availablenodes).filter(
        (value) =>
            !filterforbiddenbeforepick(
                // countofnodes,
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
        route = [startnode];
        // debugger;
        return route;
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
        asserttrue(!pathTabooList.has([...route, nextnode]));
        if (
            route.length >= 2 &&
            totalpathlengthwithoutcycle(route, nodecoordinates) >
                getbestpathlength()
        ) {
            /* .在构建路径过程中,如果当前路径片段总长度已经大于最优解的长度,则停止此路径搜索,并把路径片段加入路径禁忌列表中. */
            pathTabooList.add([...route, nextnode]);
            console.warn(
                "路径构建失败,路径片段长度已经大于最优路径长度,禁忌此路径",
                [...route, nextnode]
            );
            //广度搜索
            route = [startnode];

            //route = route.slice();
            // debugger;
            return route;
        } else if (
            route.length >= 3 &&
            intersectionfilter(
                Array.from(route),

                nextnode,
                nodecoordinates
            )
        ) {
            pathTabooList.add([...route, nextnode]);
            //深度搜索
            route = route.slice();
            console.warn("路径构建失败,遇到交叉点,禁忌此路径", [
                ...route,
                nextnode,
            ]);
            // debugger;
            return route;
        } else {
            route = [...route, nextnode];
            console.log("路径构建经过节点", route);
            return route;
        }
    }
}
