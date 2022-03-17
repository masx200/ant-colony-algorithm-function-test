import { asserttrue } from "../test/asserttrue";
import { cycleroutetosegments } from "./cycleroutetosegments";
import { haverepetitions } from "./haverepetitions";
import { Nodecoordinates } from "./Nodecoordinates";
import { combinations } from "combinatorial-generators";
import { robustsegmentintersect } from "./robust-segment-intersect";
import { cycle_reorganize } from "./cycle_reorganize";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
import { pickRandomOne } from "./pickRandomOne";

/**查找环路路径当中随机找一个交叉点,如果未找到则返回 false,如果找到则返回交叉的2个线段城市序号*/
export function intersection_filter_with_cycle_route_find_one({
    cycleroute,
    nodecoordinates,
}: {
    cycleroute: number[];

    nodecoordinates: Nodecoordinates;
}): [[number, number], [number, number]] | false {
    const countofnodes = nodecoordinates.length;
    asserttrue(countofnodes > 1);
    asserttrue(cycleroute.length === nodecoordinates.length);
    const oldRoute = cycleroute;
    //环路随机重排
    const start = getnumberfromarrayofnmber(pickRandomOne(oldRoute));

    const cloned = cycle_reorganize(oldRoute, start);
    const cyclesegments = cycleroutetosegments(cloned);

    for (let [[left1, left2], [right1, right2]] of combinations(
        cyclesegments,
        2
    )) {
        if (!haverepetitions([left1, right1, left2, right2])) {
            const intersectparameters = [left1, left2, right1, right2].map(
                (node) => nodecoordinates[node]
            );
            if (
                robustsegmentintersect(
                    intersectparameters[0],
                    intersectparameters[1],
                    intersectparameters[2],
                    intersectparameters[3]
                )
            ) {
                return [
                    [left1, left2],
                    [right1, right2],
                ];
            }
        }
    }
    return false;
}
