import { Nodecoordinates } from "./Nodecoordinates";
import { createPathTabooList, PathTabooList } from "./PathTabooList";

export interface PickNodeOptions {
    parameterrandomization: boolean;
    alphamax: number;
    alphamin: number;
    alphazero: number;
    betamax: number;
    betamin: number;
    betazero: number;
    getpheromone: (left: number, right: number) => number;
    currentroute: number[];
    availablenodes: number[];

    getdistancebyserialnumber: (left: number, right: number) => number;
}

export type IntersectionFilter = (
    countofnodes: number,
    currentroute: number[],
    nodecoordinates: Nodecoordinates,
    nextnode: number
) => boolean;

export type FilterForbiddenBeforePick = (
    currentroute: number[],
    pathTabooList: PathTabooList,
    nextnode: number
) => boolean;

export type GetPheromone = (left: number, right: number) => number;

export type GetDistanceBySerialNumber = (left: number, right: number) => number;
/**一些常数 */
export type Constants = {
    alphamax: number;
    alphamin: number;
    alphazero: number;
    betamax: number;
    betamin: number;
    betazero: number;
};
export type PathConstructOptions = Constants & {
    nodecoordinates: Nodecoordinates;
    /**交叉点检测器  */
    intersectionfilter: IntersectionFilter;
    /**选择下一个节点使用轮盘选择法 */
    picknextnode(args: PickNodeOptions): number;
    pathTabooList: PathTabooList;
    startnode: number;
    /**过滤禁忌表当中的节点 */
    filterforbiddenbeforepick: FilterForbiddenBeforePick;
    parameterrandomization: boolean;

    /* 通过序号获得信息素 */
    getpheromone: GetPheromone;
    countofnodes: number;
    /* 通过序号获得欧氏距离 */
    getdistancebyserialnumber: GetDistanceBySerialNumber;
};
/**禁忌回溯路径构建 */
export function taboo_backtracking_path_construction(
    opts: PathConstructOptions
): number[] {
    const { startnode, countofnodes, filterforbiddenbeforepick } = opts;
    const pathTabooList: PathTabooList = createPathTabooList(countofnodes);

    let route: number[] = [startnode];
    while (true) {
        if (route.length === countofnodes) {
            break;
        } else {
            const availablenodes = new Set<number>(
                Array(countofnodes)
                    .fill(0)
                    .map((_v, i) => i)
                    .filter((v) => route.includes(v))
            );
            const selectednodes = Array.from(availablenodes).filter((value) => {
                return filterforbiddenbeforepick(
                    Array.from(route),
                    pathTabooList,
                    value
                );
            });
        }
    }
    return route;
}
