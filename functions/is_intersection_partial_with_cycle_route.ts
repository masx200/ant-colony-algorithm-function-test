import { assert_true } from "../test/assert_true";
import { cycle_routetosegments } from "./cycle_routetosegments";
import { haverepetitions } from "./haverepetitions";
import { NodeCoordinates } from "./NodeCoordinates";
import { combinations } from "combinatorial-generators";
import { robustsegmentintersect } from "./robust-segment-intersect";
import { copyArrayAndShuffle } from "./copyArrayAndShuffle";
import { generateUniqueStringOfCircularPath } from "./generateUniqueStringOfCircularPath";
import { getOrCreateMapOfMapFun } from "./getOrCreateMapOfMapFun";
import { node_coordinates_to_intersect_routes_unique } from "./node_coordinates_to_intersect_routes_unique";

/**判断环路部分路径当中是否有交叉点 */
export function is_intersection_partial_with_cycle_route({
    cycle_route,
    max_of_segments,
    node_coordinates,
}: {
    cycle_route: number[];

    node_coordinates: NodeCoordinates;
    max_of_segments: number;
}): boolean {
    const map = getOrCreateMapOfMapFun(
        node_coordinates_to_intersect_routes_unique,
        node_coordinates
    );
    const unique_string = generateUniqueStringOfCircularPath(cycle_route);
    if (map.has(unique_string)) {
        const cached = map.get(unique_string);
        if (cached) {
            return true;
        }
    }
    const count_of_nodes = node_coordinates.length;
    assert_true(count_of_nodes > 1);
    assert_true(cycle_route.length === node_coordinates.length);
    const cyclesegments = copyArrayAndShuffle(
        cycle_routetosegments(cycle_route)
    ).slice(0, max_of_segments);

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
                //只缓存有交叉点的
                map.set(unique_string, true);
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
