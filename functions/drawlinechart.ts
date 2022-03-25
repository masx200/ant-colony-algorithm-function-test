import { EChartsType } from "echarts";
import { ECOption } from "./echarts-line";

// 注册必须的组件
// const option: ECOption = {
//     xAxis: {},
//     yAxis: {},
//     series: [
//         {
//             data: [
//                 [20, 120],
//                 [50, 200],
//                 [40, 50],
//             ],
//             type: "line",
//         },
//     ],
//     // ...
// };
/* 使用echarts画折线图 */
export function drawlinechart({
    xAxis_min = "dataMin",
    yAxis_min = "dataMin",
    data,
    // resize,
    // setOption,
    chart,
    titletext,
}: {
    xAxis_min?: string | number;
    yAxis_min?: string | number;
    data: Array<[number, number]>;
    chart: Pick<EChartsType, "resize" | "setOption">;
    titletext: string;
    // resize: EChartsType["resize"];
    // setOption: EChartsType["setOption"];
}) {
    const option: ECOption = {
        animation: false,
        title: { text: titletext },
        xAxis: { min: xAxis_min, max: "dataMax" },
        yAxis: { min: yAxis_min, max: "dataMax" },
        series: [
            {
                label: {
                    show: false,
                },
                emphasis: {
                    label: {
                        show: true,
                        formatter(parm) {
                            // console.log(parm.data);
                            return (
                                "(" +
                                Array.from([parm.data].flat()).join(",") +
                                ")"
                            );
                        },
                    },
                },
                data: data,
                type: "line",
            },
        ],
        // ...
    };
    // setOption(option);
    chart.setOption(option);
    chart.resize();
    // resize();
    // chart.resize(/* getcharsizeofwindow() */);
}
