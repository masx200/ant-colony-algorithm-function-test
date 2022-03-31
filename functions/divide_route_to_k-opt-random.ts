import { random, sum } from "lodash";
import { assert_true } from "../test/assert_true";
import { cycle_reorganize } from "./cycle_reorganize";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
import { pickRandomOne } from "./pickRandomOne";
import { reversearray } from "./reversearray";

//解方程
//sum(length_of_parts)=oldRoute.length
//length_of_parts.length=k
//length_of_parts.every((a)=>a>=2)
/**把路径切割成k个片段,每段路径至少含有2个城市 */
export const divide_route_to_k_opt_random = (
    oldRoute: number[],
    k: number
): number[][] => {
    k = Math.round(k);
    assert_true(oldRoute.length >= 2 * k);
    //每段路径至少含有2个城市
    const length_of_old = oldRoute.length;
    //最多切割成 N/2条路段

    assert_true(k <= length_of_old / 2);
    assert_true(k >= 2);
    //环路随机重排
    const start = getnumberfromarrayofnmber(pickRandomOne(oldRoute));

    const cloned = cycle_reorganize(oldRoute, start);
    // console.log("cloned", cloned);
    const routes: number[][] = [];
    // debugger;
    const lengths_of_parts: number[] = Array(k).fill(2);
    while (sum(lengths_of_parts) < length_of_old) {
        const index = random(0, k - 1);

        lengths_of_parts[index] += random(
            1,
            length_of_old - sum(lengths_of_parts)
        );
    }
    // console.log("lengths_of_parts", lengths_of_parts);

    for (let length_of_part of lengths_of_parts) {
        routes.push(cloned.slice(-length_of_part));
        cloned.length = cloned.length - length_of_part;
    }
    const result = reversearray(routes);
    // console.log("divide_route_to_k_opt_random", oldRoute, k, result);
    assert_true(result.length >= 2);
    assert_true(result.length === k);
    assert_true(result.every((r) => r.length >= 2));
    assert_true(length_of_old === sum(result.map((a) => a.length)));
    return result;
};
