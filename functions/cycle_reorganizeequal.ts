import { isEqual } from "lodash";
import { cycle_reorganize } from "./cycle_reorganize";

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
    const reorganizedright = cycle_reorganize(right, left[0]);
    return isEqual(left, right) || isEqual(left, reorganizedright);
}
