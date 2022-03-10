import { asserttrue } from "../test/asserttrue";
import { cycleroutetosegments } from "./cycleroutetosegments";
import { haverepetitions } from "./haverepetitions";
import { Nodecoordinates } from "./Nodecoordinates";
import { combinations } from "combinatorial-generators";
import { robustsegmentintersect } from "./robust-segment-intersect";

/**判断环路路径当中是否有交叉点 */
export function intersection_filter_with_cycle_route({
    cycleroute, nodecoordinates,
}: {
    cycleroute: number[];

    nodecoordinates: Nodecoordinates;
}): boolean {
    const countofnodes = nodecoordinates.length;
    asserttrue(countofnodes > 1);
    asserttrue(cycleroute.length === nodecoordinates.length);
    const cyclesegments = cycleroutetosegments(cycleroute);
    return Array.from(combinations(cyclesegments, 2))
        .filter(([[left1, left2], [right1, right2]]) => {
            return !haverepetitions([left1, right1, left2, right2]);
        })
        .some(([[left1, left2], [right1, righ2]]) => {
            const intersectparameters = [left1, left2, right1, righ2].map(
                (node) => nodecoordinates[node]
            );
            return robustsegmentintersect(
                intersectparameters[0],
                intersectparameters[1],
                intersectparameters[2],
                intersectparameters[3]
            );
        });
}
