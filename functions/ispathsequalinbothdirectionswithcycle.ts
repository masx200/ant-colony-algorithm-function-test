import { isEqual } from "lodash";
import { cyclereorganizeequal } from "./cyclereorganizeequal";
import { reversearray } from "./reversearray";

//回环双向相等
export function ispathsequalinbothdirectionswithcycle(
    left: Array<number>,
    right: Array<number>
): boolean {
    if (left.length != right.length) {
        return false;
    }
    if (!left.length) {
        return false;
    }
    if (!right.length) {
        return false;
    }

    return (
        isEqual(left, right) ||
        isEqual(reversearray(left), right) ||
        cyclereorganizeequal(left, right) ||
        cyclereorganizeequal(left, reversearray(right))
    );
}
