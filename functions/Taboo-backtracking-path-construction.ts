import { Constants } from "./Constants";
import { FilterForbiddenBeforePick } from "./FilterForbiddenBeforePick.funtype";
import { filterforbiddenbeforepickfun } from "./filterforbiddenbeforepickfun";
import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { IntersectionFilter } from "./IntersectionFilter.funtype";
import { intersectionfilterfun } from "./intersectionfilterfun";
import { Nodecoordinates } from "./Nodecoordinates";
import { PathTabooList } from "./PathTabooList";
import { picknextnodeRoulette } from "./pick-next-node-Roulette";
import { PickNextNodeRouletteOptions } from "./PickNextNodeRouletteOptions";
import { SparseTwoDimensionalMatrixSymmetry } from "./SparseTwoDimensionalMatrixSymmetry";

export type PathConstructOptions = Constants & {
    nodecoordinates: Nodecoordinates;
    /**交叉点检测器  ,如果是回路还要检查最后一条线是否有交叉点*/
    // intersectionfilter: IntersectionFilter;
    /**选择下一个节点使用轮盘选择法 */
    // picknextnode(args: PickNextNodeRouletteOptions): number;
    pathTabooList: PathTabooList;
    startnode: number;
    /**过滤禁忌表当中的节点 */
    // filterforbiddenbeforepick: FilterForbiddenBeforePick;
    parameterrandomization: boolean;

    /* 通过序号获得信息素 */
    // getpheromone: GetPheromone;
    // countofnodes: number;
    /* 通过序号获得欧氏距离 */
    // getdistancebyserialnumber: GetDistanceBySerialNumber;

    pheromonestore: SparseTwoDimensionalMatrixSymmetry;
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
        parameterrandomization,
        startnode,
        //   countofnodes,
        //   filterforbiddenbeforepick,
        // intersectionfilter,
        nodecoordinates,
        // picknextnode,
        pheromonestore,

        alphamax,
        alphamin,
        alphazero,
        betamax,
        betamin,
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
    let trycount = 0;
    const starttime = Number(new Date());
    while (route.length !== countofnodes) {
        trycount++;
        console.log("路径构建开始", route);
        // debugger;
        /* 路径长度检查 */
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
        const selectednodes = Array.from(availablenodes).filter((value) => {
            return !filterforbiddenbeforepick(
                Array.from(route),
                pathTabooList,
                value
            );
        });
        // debugger;
        /* 路径交叉检测从第四个节点的选择开始.三个点不会造成交叉. */
        //   /*   let filterednodes: undefined | number[];
        //     if (route.length >= 3) {
        //         const intersectionnodes = selectednodes
        //             //不能取太多点进行检查路径交叉，否则太费时间
        //             .slice(0, 5)
        //             .filter((value) => {
        //                 return intersectionfilter(
        //                     // countofnodes,
        //                     Array.from(route),
        //                     nodecoordinates,
        //                     value
        //                 );
        //             });
        //         /* 造成交叉点的路线添加到禁忌表中 */
        //         intersectionnodes
        //             .map((value) => [...route, value])
        //             .forEach((r) => pathTabooList.add(r));
        //         filterednodes = selectednodes.filter(
        //             (value) => !intersectionnodes.includes(value)
        //         );
        //         // debugger;
        //     } else {
        //         filterednodes = Array.from(selectednodes);
        //     } */
        // debugger;
        const filterednodes = Array.from(selectednodes);
        /* 可能出现无路可走的情况添加到禁忌表中  ,并回溯*/
        if (route.length > 1 && filterednodes.length === 0) {
            pathTabooList.add(Array.from(route));
            console.warn("路径构建失败,无路可走", route);
            /* 退回上一步 */
            route = route.slice(0, route.length - 1);

            // debugger;
            continue;
        } else {
            // debugger;
            if (filterednodes.length === 0) {
                /* 路径长度为1,没有可选的下一个点是不可能的 */
                throw Error("accident");
            }
            //     debugger;
            // }
            const nextnode = picknextnode({
                alphamax,
                alphamin,
                alphazero,
                betamax,
                betamin,
                betazero,
                parameterrandomization,
                currentnode: Array.from(route).slice(-1)[0],
                availablenextnodes: Array.from(filterednodes),
                getpheromone,
                getdistancebyserialnumber,
            });
            if (route.length >= 3) {
                //先选择点再测试是否有交叉点
                // let nextnode: number | undefined;
                // while (true) {
                // const nextnode = picknextnode({
                //     alphamax,
                //     alphamin,
                //     alphazero,
                //     betamax,
                //     betamin,
                //     betazero,
                //     parameterrandomization,
                //     currentnode: Array.from(route).slice(-1)[0],
                //     availablenextnodes: Array.from(filterednodes),
                //     getpheromone,
                //     getdistancebyserialnumber,
                // });
                if (
                    intersectionfilter(
                        Array.from(route),

                        nextnode,
                        nodecoordinates
                    )
                ) {
                    pathTabooList.add([...route, nextnode]);
                    route = route.slice();
                    console.warn("路径构建失败,遇到交叉点", [
                        ...route,
                        nextnode,
                    ]);
                    // debugger;
                    continue;
                } else {
                    route = [...route, nextnode];
                    console.log("路径构建经过节点", route);
                    // debugger;
                    continue;
                }
            } else {
                // const nextnode = picknextnode({
                //     alphamax,
                //     alphamin,
                //     alphazero,
                //     betamax,
                //     betamin,
                //     betazero,
                //     parameterrandomization,
                //     currentnode: Array.from(route).slice(-1)[0],
                //     availablenextnodes: Array.from(filterednodes),
                //     getpheromone,
                //     getdistancebyserialnumber,
                // });
                // debugger;
                route = [...route, nextnode];
                console.log("路径构建经过节点", route);
                continue;
            }
        }
    }
    console.log("路径一条构建完成,循环次数", trycount);
    const endtime = Number(new Date());
    console.log("路径一条构建完成,消耗时间", endtime - starttime);
    return route;
}
