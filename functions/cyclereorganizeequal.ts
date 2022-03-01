import { isEqual } from "lodash";
import { cyclereoganize } from "./cyclereoganize";

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

/* 回环路径重新排列判断相等 */
export function cyclereorganizeequal(
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
    // const reorganizedright = right
    //     .slice(firstindexinright)
    //     .concat(right.slice(0, firstindexinright));
    // console.log(left, right, reorganizedright);
    const reorganizedright = cyclereoganize(right, left[0]);
    return isEqual(left, right) || isEqual(left, reorganizedright);
}
