import { isEqual } from "lodash";

export function pathsequalinbothdirections(
    left: Array<number>,
    right: Array<number>
): boolean {
    return isEqual(left, right) || isEqual(reversearray(left), right);
}
function reversearray<T>(oldarr: Array<T>): Array<T> {
    return Array.from(oldarr).reverse();
}
