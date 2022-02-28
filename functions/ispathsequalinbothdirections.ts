import { isEqual } from "lodash";
import { cyclereorganizeequal } from "./cyclereorganizeequal";
//回环双向相等
export function ispathsequalinbothdirections(
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
export function reversearray<T>(oldarr: Array<T>): Array<T> {
    return Array.from(oldarr).reverse();
}
