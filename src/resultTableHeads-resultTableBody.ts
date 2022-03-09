import { computed, ComputedRef, ref } from "vue";
import { DataOfChange } from "../functions/DataOfChange";
export function clearDataOfResult() {
    dataofresult.value = undefined;
}
export const resultTableHeads = [
    "全局最优长度",
    "全局最优路径",
    "总共耗时秒",
    "总迭代次数",
];
export const dataofresult = ref<DataOfChange>();
export const resultTableBody: ComputedRef<[number, string, number, number][]> =
    computed(() => {
        const result = dataofresult.value;
        return result
            ? [
                  [
                      result.globalbestlength,
                      JSON.stringify(result.globalbestroute),
                      result.timems / 1000,
                      result.iterations,
                  ],
              ]
            : [];
    });
