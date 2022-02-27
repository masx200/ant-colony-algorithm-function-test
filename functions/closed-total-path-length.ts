import { sum } from "mathjs";
import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { Nodecoordinates } from "./Nodecoordinates";
/* 闭合总路径长度 首尾相连 */
export function closedtotalpathlength(
    path: number[],
    nodecoordinates: Nodecoordinates
): number {
    return sum(
        path
            .map((value, index, array) => {
                const nextindex = index === array.length - 1 ? 0 : index + 1;
                return [value, array[nextindex]];
            })
            .map(([left, right]) => /* console.log(left, right);*/ geteuclideandistancebyindex(
    left,
    right,
    nodecoordinates
))
    );
}
