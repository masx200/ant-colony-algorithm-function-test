import { computed, reactive } from "vue";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
export function clearDataOfOneIteration() {
    dataofoneiteration.length = 0;
}
export const dataofoneiteration = reactive<DataOfFinishOneIteration[]>([]);
export const oneiterationtablebody = computed<
    [number, number, number, boolean, number, number, number, string][]
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
            JSON.stringify(data.optimalrouteofthisround),
        ];
    });
});
export const oneiterationtableheads = [
    "序号",
    "信息熵",
    "随机选择概率",
    "是否信息素扩散",
    "信息素扩散概率",

    "耗时秒",
    "迭代最优长度",
    "迭代最优路径",
];

console.log(dataofoneiteration, oneiterationtableheads);
