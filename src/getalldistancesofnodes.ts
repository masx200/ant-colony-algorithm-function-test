import { combinations } from "combinatorial-generators";
import { geteuclideandistancebyindex } from "./geteuclideandistance";
import { Nodecoordinates } from "./Nodecoordinates";

/* 获得节点的所有组合之间的距离数组 */
export function getalldistancesofnodes(nodecoordinates: Nodecoordinates): number[] {
    let { length } = nodecoordinates;
    let inputarray = Array(length)
        .fill(0)
        .map((_v, i) => i);
    return [...combinations(inputarray, 2)].map(([left, right]) => geteuclideandistancebyindex(left, right, nodecoordinates)
    );
}
