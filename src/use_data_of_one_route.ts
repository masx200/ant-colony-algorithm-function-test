import { reactive } from "vue";
import { COMMON_DataOfOneRoute } from "../classic-acs/tsp-interface";

export function use_data_of_one_route() {
    const onreceivedataofoneroute = function onreceivedataofoneroute(
        datas: COMMON_DataOfOneRoute[]
    ): void {
        if (datas.length > dataofoneroute.length) {
            for (let i = dataofoneroute.length; i < datas.length; i++) {
                const data = datas[i];
                dataofoneroute.push(data);
            }
        }
    };

    const clearDataOfOneRoute = function clearDataOfOneRoute() {
        dataofoneroute.length = 0;
    };
    const dataofoneroute = reactive<COMMON_DataOfOneRoute[]>([]);

    const result = {
        dataofoneroute,
        // oneroutetablebody,
        onreceivedataofoneroute,
        clearDataOfOneRoute,
        // oneroutetableheads,
    };
    return result;
}
