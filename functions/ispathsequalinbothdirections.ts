import { isEqual } from "lodash";
//回环双向相等
export function ispathsequalinbothdirections(
    left: Array<number>,
    right: Array<number>
): boolean {
    if (!left.length) {
        return false;
    }
    if (!right.length) {
        return false;
    }

    return (
        isEqual(left, right) ||
        cyclereorganizeequal(left, right) ||
        cyclereorganizeequal(left, reversearray(right))
    );
}
function reversearray<T>(oldarr: Array<T>): Array<T> {
    return Array.from(oldarr).reverse();
}
// function reverseequal(left: Array<number>, right: Array<number>): boolean {
//     if (!left.length) {
//         return false;
//     }
//     if (!right.length) {
//         return false;
//     }
//     return (
//         isEqual(left, right) ||
//         cyclereorganizeequal(left, right) ||
//         cyclereorganizeequal(reversearray(left), right)
//     );
// }
function cyclereorganizeequal(
    left: Array<number>,
    right: Array<number>
): boolean {
    if (!left.length) {
        return false;
    }
    if (!right.length) {
        return false;
    }

    const firstindexinright = right.findIndex((v) => v === left[0]);
    if (firstindexinright < 0) {
        return false;
    }
    const reorganizedright = right
        .slice(firstindexinright)
        .concat(right.slice(0, firstindexinright));
    // console.log(left, right, reorganizedright);
    return isEqual(left, right) || isEqual(left, reorganizedright);
}
