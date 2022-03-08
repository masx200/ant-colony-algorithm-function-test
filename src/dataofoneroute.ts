import { computed, reactive } from "vue";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
export function clearDataOfOneRoute() {
    dataofoneroute.length = 0;
}
export const dataofoneroute = reactive<DataOfFinishOneRoute[]>([]);
export const oneroutetablebody = computed<
    [number, number, number, number, string][]
>(() => {
    return dataofoneroute.map((data, index) => {
        return [
            index,
            data.totallength,
            data.countofloops,
            data.timems / 1000,
            JSON.stringify(data.route),
        ];
    });
});
export const oneroutetableheads = [
    "序号",
    "长度",
    "循环次数",
    "耗时秒",
    "路径",
];

console.log(dataofoneroute, oneroutetablebody);
