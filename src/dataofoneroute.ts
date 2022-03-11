import { computed, reactive } from "vue";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
export function clearDataOfOneRoute() {
    dataofoneroute.length = 0;
}
export const dataofoneroute = reactive<DataOfFinishOneRoute[]>([]);
export const oneroutetablebody = computed<
    [number, number, number, number, number, number][]
>(() => {
    return dataofoneroute.map((data, index) => {
        return [
            index,
            data.totallength,
            data.countofloops,
            data.globalbestlength,
            data.timems / 1000,
            data.total_time_ms / 1000,
        ];
    });
});
export const oneroutetableheads = [
    "序号",
    "当前长度",
    "循环次数",

    "全局最优长度",
    "当前耗时秒",
    "总计耗时秒",
];

console.log(dataofoneroute, oneroutetablebody);
