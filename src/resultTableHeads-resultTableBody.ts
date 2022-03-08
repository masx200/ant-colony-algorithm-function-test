import { computed, ComputedRef, ref } from "vue";
import { DataOfFinishAllIteration } from "../functions/DataOfFinishAllIteration";
export function clearDataOfResult() {
    dataofresult.value = undefined;
}
export const resultTableHeads = ["全局最优长度", "全局最优路径", "总共耗时秒"];
export const dataofresult = ref<DataOfFinishAllIteration>();
export const resultTableBody: ComputedRef<(string | number)[]> = computed(
    () => {
        const result = dataofresult.value;
        return result
            ? [
                  result.globalbestlength,
                  JSON.stringify(result.globalbestroute),
                  result.timems / 1000,
              ]
            : [];
    }
);
