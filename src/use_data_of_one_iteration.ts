import { computed, ComputedRef, reactive } from "vue";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";

export function use_data_of_one_iteration(): {
    onreceivedataofoneIteration: (data: DataOfFinishOneIteration) => void;
    clearDataOfOneIteration: () => void;
    dataofoneiteration: {
        relative_deviation_from_optimal: number;
        current_iterations: number;
        population_relative_information_entropy: number;
        ispheromoneDiffusion: boolean;
        randomselectionprobability: number;
        pheromoneDiffusionProbability: number;
        optimallengthofthisround: number;
        optimalrouteofthisround: number[];
        timems: number;
        globalbestlength: number;
        locally_optimized_length: number;
    }[];
    oneiterationtablebody: ComputedRef<
        [
            number,
            number,
            number,
            boolean,
            number,
            number,
            number,
            number,
            number,
            number
        ][]
    >;
    oneiterationtableheads: string[];
} {
    const oneiterationtableheads = [
        "序号",
        "信息熵",
        "随机选择概率",
        "是否信息素扩散",
        "信息素扩散概率",

        "耗时秒",
        "迭代最优长度",
        "与最优的相对偏差",
        "全局最优长度",
        "局部优化长度",
    ];
    const onreceivedataofoneIteration = function onreceivedataofoneIteration(
        data: DataOfFinishOneIteration
    ) {
        console.log("onreceivedataofoneIteration");
        dataofoneiteration.push(data);
        console.log(dataofoneiteration);
        console.log(oneiterationtablebody);
    };
    const clearDataOfOneIteration = function clearDataOfOneIteration(): void {
        dataofoneiteration.length = 0;
    };
    const dataofoneiteration = reactive<DataOfFinishOneIteration[]>([]);
    const oneiterationtablebody = computed<
        [
            number,
            number,
            number,
            boolean,
            number,
            number,
            number,
            number,
            number,
            number
        ][]
    >(() => {
        return dataofoneiteration.map((data, index) => {
            return [
                index + 1,
                data.population_relative_information_entropy,
                data.randomselectionprobability,
                data.ispheromoneDiffusion,
                data.pheromoneDiffusionProbability,
                data.timems / 1000,
                data.optimallengthofthisround,
                data.relative_deviation_from_optimal,
                //找到这一轮的迭代的数据
                data.globalbestlength,
                data.locally_optimized_length,
            ];
        });
    });
    return {
        oneiterationtableheads,
        onreceivedataofoneIteration,
        clearDataOfOneIteration,
        dataofoneiteration,
        oneiterationtablebody,
    };
}
