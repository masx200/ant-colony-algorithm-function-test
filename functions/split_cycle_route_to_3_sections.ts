import { random } from "lodash";

import { asserttrue } from "../test/asserttrue";
import { cycle_reorganize } from "./cycle_reorganize";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
import { pickRandomOne } from "./pickRandomOne";

export function split_cycle_route_to_3_sections(
    oldRoute: number[]
): [number[], number[], number[]] {
    asserttrue(oldRoute.length >= 6);
    const start = getnumberfromarrayofnmber(pickRandomOne(oldRoute));

    const reoganized_route = cycle_reorganize(oldRoute, start);

    const split_point_1 = random(2, oldRoute.length - 4);
    const split_point_2 = random(split_point_1 + 2, oldRoute.length - 2);

    return [
        reoganized_route.slice(0, split_point_1),
        reoganized_route.slice(split_point_1, split_point_2),
        reoganized_route.slice(split_point_2),
    ];
}
