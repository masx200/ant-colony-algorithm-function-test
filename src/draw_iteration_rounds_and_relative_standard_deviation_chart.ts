import { ShallowRef } from "vue";
import { drawlinechart } from "../functions/drawlinechart";
import { dataofoneiteration } from "./dataofoneiteration";
import { EChartsType } from "echarts";

export function draw_iteration_rounds_and_relative_standard_deviation_chart(
    iteration_rounds_and_relative_standard_deviation_chart: ShallowRef<
        EChartsType | undefined
    >
) {
    {
        const titletext = "迭代轮次和相对标准差";
        const chart =
            iteration_rounds_and_relative_standard_deviation_chart.value;
        if (chart) {
            console.log("dataofoneiteration", dataofoneiteration);
            const data: [number, number][] = dataofoneiteration.map((a) => [
                a.current_iterations,
                a.relative_standard_deviation,
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
}
