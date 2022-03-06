import { sum } from "mathjs";
import { assertnumber } from "../test/assertnumber";
import { cycleroutetosegments } from "./cycleroutetosegments";
/* 闭合总路径长度 首尾相连 */
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
    // const
    // if (path.length !== countofnodes) {
    //     throw Error("invalid path not match nodecoordinates");
    // }
    return sum(
        cycleroutetosegments(path).map(function ([left, right]) {
            const distance = getdistancebyindex(left, right);
            assertnumber(distance);
            return distance;
            }
        )
    );
}
