import { EChartsType } from "echarts";
import { ShallowRef } from "vue";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { drawlinechart } from "../functions/drawlinechart";

export function draw_iteration_rounds_and_relative_deviation_from_optimal_chart(
    iteration_rounds_and_relative_deviation_from_optimal_chart: ShallowRef<
        EChartsType | undefined
    >,
    dataofoneiteration: DataOfFinishOneIteration[]
) {
    {
        const titletext = "迭代轮次和与最优的相对偏差";
        const chart =
            iteration_rounds_and_relative_deviation_from_optimal_chart.value;
        if (chart) {
            console.log("dataofoneiteration", dataofoneiteration);
            const data: [number, number][] = dataofoneiteration.map((a) => [
                a.current_iterations,
                a.relative_deviation_from_optimal,
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
