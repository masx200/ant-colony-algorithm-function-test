import { computed, ComputedRef, ref } from "vue";
import { DataOfChange } from "../functions/DataOfChange";
export function clearDataOfResult() {
    dataofresult.value = undefined;
}
export const resultTableHeads = [
    "全局最优长度",

    "总共耗时秒",
    "总路径数量",
    "总迭代次数",
    "全局最优路径",
];
export const dataofresult = ref<DataOfChange>();
export const resultTableBody: ComputedRef<
    [number, number, number, number, string][]
> = computed(() => {
    const result = dataofresult.value;
    return result
        ? [
              [
                  result.globalbestlength,

                  result.timems / 1000,
                  result.currentsearchcount,
                  result.iterations,
                  JSON.stringify(result.globalbestroute),
              ],
          ]
        : [];
});
