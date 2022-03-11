import { computed, ComputedRef, ref } from "vue";
import { DataOfGlobalBest } from "../functions/DataOfGlobalBest";
import { dataOfAllResults } from "./onreceiveDataOfGlobalBest";
export function clearDataOfResult() {
    dataofresult.value = undefined;
    dataOfAllResults.length = 0;
}
export const resultTableHeads = [
    "全局最优长度",

    "总共耗时秒",
    "总路径数量",
    "总迭代次数",
    "全局最优路径",
];
export const dataofresult = ref<DataOfGlobalBest>();
export const resultTableBody: ComputedRef<
    [number, number, number, number, string][]
> = computed(() => {
    const result = dataofresult.value;
    return result
        ? [
              [
                  result.globalbestlength,

                  result.total_time_ms / 1000,
                  result.current_search_count + 1,
                  result.current_iterations + 1,
                  JSON.stringify(result.globalbestroute),
              ],
          ]
        : [];
});
