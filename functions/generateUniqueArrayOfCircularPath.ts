import { asserttrue } from "../test/asserttrue";
import { cycle_reorganize } from "./cycle_reorganize";
import { reversearray } from "./reversearray";

export function generateUniqueArrayOfCircularPath(route: number[]): number[] {
    asserttrue(route.length > 2);
    const reversed = cycle_reorganize(reversearray(route), 0);

    route = cycle_reorganize(route, 0);

    return route[1] > reversed[1] ? reversed : route;
}
