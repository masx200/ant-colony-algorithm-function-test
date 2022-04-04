import { assert_true } from "../test/assert_true";
import { cycle_routetosegments } from "./cycle_routetosegments";
import { haverepetitions } from "./haverepetitions";
import { NodeCoordinates } from "./NodeCoordinates";
import { combinations } from "combinatorial-generators";
import { robustsegmentintersect } from "./robust-segment-intersect";

/**判断环路路径当中是否有交叉点 */
export function is_intersection_filter_with_cycle_route_old({
    cycle_route,
    node_coordinates,
}: {
    cycle_route: number[];

    node_coordinates: NodeCoordinates;
}): boolean {
    const count_of_nodes = node_coordinates.length;
    assert_true(count_of_nodes > 1);
    assert_true(cycle_route.length === node_coordinates.length);
    const cyclesegments = cycle_routetosegments(cycle_route);

    for (let [[left1, left2], [right1, right2]] of combinations(
        cyclesegments,
        2
    )) {
        if (!haverepetitions([left1, right1, left2, right2])) {
            const intersectparameters = [left1, left2, right1, right2].map(
                (node) => node_coordinates[node]
            );
            if (
                robustsegmentintersect(
                    intersectparameters[0],
                    intersectparameters[1],
                    intersectparameters[2],
                    intersectparameters[3]
                )
            ) {
                return true;
            }
        }
    }

    return false;
    // return Array.from(combinations(cyclesegments, 2))
    //     .filter(([[left1, left2], [right1, right2]]) => {
    //         return !haverepetitions([left1, right1, left2, right2]);
    //     })
    //     .some(([[left1, left2], [right1, right2]]) => {
    //         const intersectparameters = [left1, left2, right1, right2].map(
    //             (node) => node_coordinates[node]
    //         );
    //         return robustsegmentintersect(
    //             intersectparameters[0],
    //             intersectparameters[1],
    //             intersectparameters[2],
    //             intersectparameters[3]
    //         );
    //     });
}
