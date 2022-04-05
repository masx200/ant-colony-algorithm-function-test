import { sum } from "lodash";
import { assert_true } from "../test/assert_true";
import { cycle_reorganize } from "../functions/cycle_reorganize";
import { getnumberfromarrayofnmber } from "../functions/getnumberfromarrayofnmber";

//解方程
//sum(length_of_parts)=oldRoute.length
//length_of_parts.length=k
//length_of_parts.every((a)=>a>=2)
/**把路径切割成2个片段,每段路径至少含有2个城市,按照要切断的线段分割 */
export const divide_route_to_2_opt_with_segment = (
    oldRoute: number[],
    segment: [[number, number], [number, number]]
): [number[], number[]] => {
    const k = 2;
    assert_true(oldRoute.length >= 2 * k);
    //每段路径至少含有2个城市
    const length_of_old = oldRoute.length;
    //最多切割成 N/2条路段

    assert_true(k <= length_of_old / 2);
    assert_true(k >= 2);
    //环路随机重排
    const start = getnumberfromarrayofnmber(segment[0][1]);

    const cloned = cycle_reorganize(oldRoute, start);
    const length_of_first_part = cloned.findIndex((a) => a === segment[1][1]);
    assert_true(length_of_first_part > 1);
    const routes: [number[], number[]] = [
        cloned.slice(0, length_of_first_part),
        cloned.slice(length_of_first_part),
    ];

    assert_true(routes.length >= 2);
    assert_true(routes.length === k);
    assert_true(routes.every((r) => r.length >= 2));
    assert_true(length_of_old === sum(routes.map((a) => a.length)));
    return routes;
};
