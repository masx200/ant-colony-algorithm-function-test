import { computed, ref } from "vue";
import { DataOfFinishAllIteration } from "../functions/DataOfFinishAllIteration";

export const resultTableHeads = ["全局最优长度", "全局最优路径", "总共耗时秒"];
const dataofresult = ref<DataOfFinishAllIteration>();
export const resultTableBody = computed(() => {
    const result = dataofresult.value;
    return result
        ? [
              result.globalbestlength,
              result.globalbestroute,
              result.timems / 1000,
          ]
        : [];
});
