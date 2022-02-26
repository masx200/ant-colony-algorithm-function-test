import { isEqual } from "lodash";
//回环双向相等
export function ispathsequalinbothdirections(
    left: Array<number>,
    right: Array<number>
): boolean {
    return isEqual(left, right) || isEqual(reversearray(left), right);
}
function reversearray<T>(oldarr: Array<T>): Array<T> {
    return Array.from(oldarr).reverse();
}
