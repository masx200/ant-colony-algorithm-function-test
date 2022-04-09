import {
    get_distance_round,
    set_distance_round,
} from "../src/set_distance_round";
import { ArrayShuffle } from "./ArrayShuffle";
import { closed_total_path_length } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
import { cycle_reorganize } from "./cycle_reorganize";
import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { NodeCoordinates } from "./NodeCoordinates";

/* 可选起点的贪心算法 */
export function Greedyalgorithmtosolvetspwithselectedstart({
    node_coordinates,
    start,
    round = false,
    max_cities_of_greedy = Infinity,
}: {
    node_coordinates: NodeCoordinates;
    start: number;
    round?: boolean;
    max_cities_of_greedy?: number;
}): { route: number[]; length: number } {
    set_distance_round(round);
    if (start < 0 || start >= node_coordinates.length) {
        throw new Error("incorrect start");
    }
    // const { length } = node_coordinates;
    const inputindexs = Array(node_coordinates.length)
        .fill(0)
        .map((_v, i) => i);
    const indexsset = new Set(inputindexs);
    /* 第一个点随机选择 */
    const firstnode = start;
    const result = [firstnode];
    indexsset.delete(firstnode);

    while (indexsset.size) {
        // console.log(indexsset.size);
        /* 当前的节点 */
        const currentnode = result.slice(-1)[0];
        /* 剩余 的节点 */
        const restnodes =
            max_cities_of_greedy < Infinity
                ? ArrayShuffle(Array.from(indexsset)).slice(
                      0,
                      max_cities_of_greedy
                  )
                : Array.from(indexsset);
        /* 计算其他点与此点的距离的最小值 */
        /*  const mindistance = Math.min(
            ...restnodes.map((value) =>
                geteuclideandistancebyindex(currentnode, value, node_coordinates)
            )
        );
*/
        // console.log(mindistance);
        /* 下一个点选择距离最近的点 */
        /*   const nextnode = restnodes.find((value) => {
            return (
                mindistance ===
                geteuclideandistancebyindex(currentnode, value, node_coordinates)
            );
        });
        */

        const nextnodesanddistances: {
            nextnode: number;
            distance: number;
        }[] = restnodes.map((value) => {
            return {
                nextnode: value,
                distance: geteuclideandistancebyindex(
                    currentnode,
                    value,
                    node_coordinates,
                    round
                ),
            };
        });
        const bestnextnodeanddistance: {
            nextnode: number;
            distance: number;
        } = nextnodesanddistances.reduce((previous, current) => {
            return previous.distance < current.distance ? previous : current;
        }, nextnodesanddistances[0]);
        const nextnode = bestnextnodeanddistance.nextnode;
        // const mindistance = bestnextnodeanddistance.distance;
        // for (let [nodeindex, distance] of) {
        //     if (distance < mindistance) {
        //         mindistance = distance;
        //         nextnode = nodeindex;
        //     }
        // }
        if (typeof nextnode !== "number" || nextnode === -1) {
            throw new Error("Accident");
        }
        indexsset.delete(nextnode);
        result.push(nextnode);
    }

    const route = result;
    const greedypath = cycle_reorganize(route, 0);
    const length = closed_total_path_length({
        round: get_distance_round(),
        path: greedypath,
        getdistancebyindex: creategetdistancebyindex(node_coordinates, round),
    });
    return { route: result, length: length };
}
