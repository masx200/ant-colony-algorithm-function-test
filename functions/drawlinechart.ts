import * as echarts from "echarts/core";
import { ECOption } from "./echarts-line";
import { getcharsizeofwindow } from "./getcharsizeofwindow";

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
export function drawlinechart(
    data: Array<[number, number]>,
    mychart: echarts.ECharts,
    titletext: string
) {
    const option: ECOption = {
        title: { text: titletext },
        xAxis: { min: "dataMin", max: "dataMax" },
        yAxis: { min: "dataMin", max: "dataMax" },
        series: [
            {
                label: {
                    show: true,
                    formatter(parm) {
                        // console.log(parm.data);
                        return (
                            "(" + Array.from([parm.data].flat()).join(",") + ")"
                        );
                    },
                },
                emphasis: {
                    label: {
                        show: true,
                    },
                },
                data: data,
                type: "line",
            },
        ],
        // ...
    };
    mychart.setOption(option);
    mychart.resize(getcharsizeofwindow());
}
