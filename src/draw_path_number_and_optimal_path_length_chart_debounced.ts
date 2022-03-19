import { debounce } from "lodash";
import { draw_path_number_and_optimal_path_length_chart } from "./draw_path_number_and_optimal_path_length_chart";
export const draw_path_number_and_optimal_path_length_chart_debounced =
    debounce(draw_path_number_and_optimal_path_length_chart, 100, {
        maxWait: 1000,
    });
// export function draw_path_number_and_optimal_path_length_chart_debounced(
//     path_number_and_optimal_path_length_chart: ShallowRef<
//         EChartsType | undefined
//     >,
//     dataofoneroute: DataOfFinishOneRoute[]
// ) {
//     const titletext = "路径序号和最优路径长度";
//     const chart = path_number_and_optimal_path_length_chart.value;
//     // debugger
//     if (chart) {
//         console.log("dataofoneroute", dataofoneroute);
//         const data: [number, number][] = dataofoneroute.map((a) => [
//             a.current_search_count,
//             a.globalbestlength,
//         ]);
//         console.log("路径序号和最优路径长度", data);

//         drawlinechart({
//             // xAxis_min: 0,
//             yAxis_min: 0,
//             titletext,
//             data: data,
//             chart: chart,
//         });
//     }
// }
