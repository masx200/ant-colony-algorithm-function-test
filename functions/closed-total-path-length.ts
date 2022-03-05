import { sum } from "mathjs";
import { cycleroutetosegments } from "./cycleroutetosegments";
import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { Nodecoordinates } from "./Nodecoordinates";
/* 闭合总路径长度 首尾相连 */
export function closedtotalpathlength(
    path: number[],
    nodecoordinates: Nodecoordinates
): number {
    if (path.length !== nodecoordinates.length) {
        throw Error("invalid path not match nodecoordinates");
    }
    return sum(
        cycleroutetosegments(path).map(([left, right]) =>
            /* console.log(left, right);*/ geteuclideandistancebyindex(
                left,
                right,
                nodecoordinates
            )
        )
    );
}
