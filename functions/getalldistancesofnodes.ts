import { combinations } from "combinatorial-generators";
import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { NodeCoordinates } from "./NodeCoordinates";

/* 获得节点的所有组合之间的距离数组,无固定顺序 */
export function getalldistancesofnodes(
    node_coordinates: NodeCoordinates
): number[] {
    // let { length } = node_coordinates;
    let inputarray = Array(node_coordinates.length)
        .fill(0)
        .map((_v, i) => i);
    return [...combinations(inputarray, 2)].map(([left, right]) =>
        geteuclideandistancebyindex(left, right, node_coordinates)
    );
}
