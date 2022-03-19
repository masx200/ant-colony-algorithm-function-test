import { sum } from "lodash";
import { assertnumber } from "../test/assertnumber";
import { cycleroutetosegments } from "./cycleroutetosegments";
import { cycle_reorganize } from "./cycle_reorganize";
/* 计算闭合总路径长度 首尾相连 */
export function closedtotalpathlength(
    {
        // countofnodes,
        path,
        getdistancebyindex,
    }: {
        // countofnodes: number;
        path: number[];
        getdistancebyindex: (left: number, right: number) => number;
    } // nodecoordinates: Nodecoordinates
): number {
    /* 由于浮点数精度问题,重新排序,一样的路径可以输出一样的长度 */
    const route = cycle_reorganize(path, 0);
    return sum(
        cycleroutetosegments(route).map(function ([left, right]) {
            const distance = getdistancebyindex(left, right);
            assertnumber(distance);
            return distance;
        })
    );
}
