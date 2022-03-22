import {
    computed,
    ComputedRef,
    DeepReadonly,
    onMounted,
    reactive,
    Ref,
    watch,
} from "vue";
import { DataOfBestChange } from "../functions/DataOfBestChange";

export function use_history_of_best(
    dataofresult: DeepReadonly<Ref<DataOfBestChange | undefined>>
): {
    history_of_best: {
        time_of_best_ms: number;
        globalbestlength: number;
        search_count_of_best: number;
    }[];
    clearData: () => void;
    TableHeads: string[];
    TableBody: ComputedRef<
        [
            number,
            number,
            number
            // number,
            // number,
            // number
            // , string
        ][]
    >;
} {
    const history_of_best = reactive<
        {
            time_of_best_ms: number;
            // globalbestroute: number[];
            globalbestlength: number;
            // total_time_ms: number;
            // current_search_count: number;
            // current_iterations: number;
            search_count_of_best: number;
        }[]
    >([]);
    onMounted(() => {
        watch(dataofresult, (value, old) => {
            const globalbestlength = value?.globalbestlength;
            const old_globalbestlength = old?.globalbestlength;
            if (!globalbestlength) {
                return;
            }
            const { time_of_best_ms, search_count_of_best } = value;
            if (!old_globalbestlength) {
                history_of_best.push({
                    time_of_best_ms,
                    globalbestlength,
                    search_count_of_best,
                });
            }
            if (
                old_globalbestlength &&
                old_globalbestlength > globalbestlength
            ) {
                history_of_best.push({
                    time_of_best_ms,
                    globalbestlength,
                    search_count_of_best,
                });
            }
        });
    });

    const clearData = function clearDataOfResult() {
        history_of_best.length = 0;
    };
    const TableHeads = [
        "最优解路径数量",
        "全局最优长度",
        "最优解的耗时秒",

        // "总共耗时秒",
        // "总计路径数量",
        // "总计迭代次数",
        // "全局最优路径",
    ];

    const TableBody: ComputedRef<
        [
            number,
            number,
            number
            // number,
            // number,
            // number
            // , string
        ][]
    > = computed(() => {
        const resultbest = history_of_best;
        return resultbest.length
            ? resultbest.map((result) => {
                  return [
                      //   [
                      result.search_count_of_best,
                      result.globalbestlength,
                      result.time_of_best_ms / 1000,

                      //   result.total_time_ms / 1000,

                      //   result.current_search_count,
                      //   result.current_iterations,
                      //   JSON.stringify(result.globalbestroute),
                  ];
              })
            : //   ]
              [];
    });

    return {
        clearData,
        TableBody,
        TableHeads,
        history_of_best,
    };
}
