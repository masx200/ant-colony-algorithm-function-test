import { computed, reactive } from "vue";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
export function clearDataOfOneIteration() {
    dataofoneiteration.length = 0;
}
export const dataofoneiteration = reactive<DataOfFinishOneIteration[]>([]);
export const oneiterationtablebody = computed<
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
export const oneiterationtableheads = [
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

console.log(dataofoneiteration, oneiterationtableheads);
