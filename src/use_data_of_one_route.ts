import { computed, reactive } from "vue";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";

export function use_data_of_one_route() {
    const onreceivedataofoneroute = function onreceivedataofoneroute(
        data: DataOfFinishOneRoute
    ): void {
        // console.log("onreceivedataofoneroute");
        dataofoneroute.push(data);
        // console.log(dataofoneroute);
        // console.log(oneroutetablebody);
    };

    const clearDataOfOneRoute = function clearDataOfOneRoute() {
        dataofoneroute.length = 0;
    };
    const dataofoneroute = reactive<DataOfFinishOneRoute[]>([]);
    const oneroutetablebody = computed<
        [
            number,
            number,
            number,
            number,
            number

            // string
        ][]
    >(() => {
        return dataofoneroute.map((data, index) => {
            return [
                index + 1,
                data.totallength,
                // data.countofloops,
                //找到这一条的路径的数据
                data.globalbestlength,
                // dataOfAllResults[index].globalbestlength,
                data.time_ms_of_one_route / 1000,
                data.total_time_ms / 1000,
                // data.way_of_construct,
            ];
        });
    });
    const oneroutetableheads = [
        "序号",
        "当前长度",
        // "循环次数",

        "全局最优长度",
        "当前耗时秒",
        "总计耗时秒",
        // "构建方式",
    ];
    const result = {
        dataofoneroute,
        oneroutetablebody,
        onreceivedataofoneroute,
        clearDataOfOneRoute,
        oneroutetableheads,
    };
    return result;
}
