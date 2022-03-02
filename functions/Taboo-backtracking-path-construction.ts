import { Constants } from "./Constants";
import { FilterForbiddenBeforePick } from "./FilterForbiddenBeforePick.1";
import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { IntersectionFilter } from "./IntersectionFilter.1";
import { Nodecoordinates } from "./Nodecoordinates";
import { PathTabooList } from "./PathTabooList";
import { PickNextNodeRouletteOptions } from "./PickNextNodeRouletteOptions";
import { SparseTwoDimensionalMatrixSymmetry } from "./SparseTwoDimensionalMatrixSymmetry";

export type PathConstructOptions = Constants & {
    nodecoordinates: Nodecoordinates;
    /**交叉点检测器  ,如果是回路还要检查最后一条线是否有交叉点*/
    intersectionfilter: IntersectionFilter;
    /**选择下一个节点使用轮盘选择法 */
    picknextnode(args: PickNextNodeRouletteOptions): number;
    pathTabooList: PathTabooList;
    startnode: number;
    /**过滤禁忌表当中的节点 */
    filterforbiddenbeforepick: FilterForbiddenBeforePick;
    parameterrandomization: boolean;

    /* 通过序号获得信息素 */
    // getpheromone: GetPheromone;
    countofnodes: number;
    /* 通过序号获得欧氏距离 */
    // getdistancebyserialnumber: GetDistanceBySerialNumber;

    pheromonestore: SparseTwoDimensionalMatrixSymmetry;
};
/**禁忌回溯路径构建 */
export function taboo_backtracking_path_construction(
    opts: PathConstructOptions
): number[] {
    const {
        parameterrandomization,
        startnode,
        countofnodes,
        filterforbiddenbeforepick,
        intersectionfilter,
        nodecoordinates,
        picknextnode,
        pheromonestore,

        alphamax,
        alphamin,
        alphazero,
        betamax,
        betamin,
        betazero,
        pathTabooList,
    } = opts;

    const getpheromone = (left: number, right: number) => {
        return pheromonestore.get(left, right);
    };
    const getdistancebyserialnumber = (left: number, right: number) => {
        return geteuclideandistancebyindex(left, right, nodecoordinates);
    };

    // const pathTabooList: PathTabooList = createPathTabooList(countofnodes);

    let route: number[] = [startnode];
    while (route.length !== countofnodes) {
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
        const selectednodes = Array.from(availablenodes).filter((value) => {
            return filterforbiddenbeforepick(
                Array.from(route),
                pathTabooList,
                value
            );
        });
        const intersectionnodes = selectednodes.filter((value) => {
            return intersectionfilter(
                countofnodes,
                Array.from(route),
                nodecoordinates,
                value
            );
        });
        /* 造成交叉点的路线添加到禁忌表中 */
        intersectionnodes
            .map((value) => [...route, value])
            .forEach((r) => pathTabooList.add(r));

        const filterednodes = selectednodes.filter(
            (value) => !intersectionnodes.includes(value)
        );

        /* 可能出现无路可走的情况添加到禁忌表中  ,并回溯*/
        if (filterednodes.length === 0) {
            pathTabooList.add(Array.from(route));
            /* 退回上一步 */
            route = route.slice(0, route.length - 1);
            continue;
        } else {
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
            route = [...route, nextnode];
            continue;
        }
    }
    return route;
}
