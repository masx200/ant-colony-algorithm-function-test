import { ShallowRef } from "vue";
import { drawlinechart } from "../functions/drawlinechart";
import { dataofoneroute } from "./dataofoneroute";
import { EChartsType } from "echarts";

export function draw_path_number_and_current_path_length_chart(
    path_number_and_current_path_length_chart: ShallowRef<
        EChartsType | undefined
    >
) {
    const titletext = "路径序号和当前路径长度";
    const chart = path_number_and_current_path_length_chart.value;
    if (chart) {
        console.log("dataofoneroute", dataofoneroute);
        const data: [number, number][] = dataofoneroute.map((a) => [
            a.current_search_count,
            a.totallength,
        ]);
        console.log(data);
        drawlinechart({
            // xAxis_min: 0,
            yAxis_min: 0,
            titletext,
            data: data,
            chart: chart,
        });
    }
}
