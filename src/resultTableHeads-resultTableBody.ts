import { computed, ComputedRef } from "vue";

import { dataofresult } from "./dataofresult";
export function clearDataOfResult() {
    dataofresult.value = undefined;
}
export const resultTableHeads = [
    "全局最优长度",
    "找到最优解的耗时秒",
    "总共耗时秒",
    "总路径数量",
    "总迭代次数",
    "全局最优路径",
];
export const resultTableBody: ComputedRef<
    [number, number, number, number, number, string][]
> = computed(() => {
    const result = dataofresult.value;
    return result
        ? [
              [
                  result.globalbestlength,
                  result.time_of_best_ms / 1000,
                  result.total_time_ms / 1000,
                  result.current_search_count,
                  result.current_iterations,
                  JSON.stringify(result.globalbestroute),
              ],
          ]
        : [];
});
