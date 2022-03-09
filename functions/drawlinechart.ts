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
    data,
    // resize,
    // setOption,
    chart,
    titletext,
}: {
    data: Array<[number, number]>;
    chart: EChartsType;
    titletext: string;
    // resize: EChartsType["resize"];
    // setOption: EChartsType["setOption"];
}) {
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
    // setOption(option);
    chart.setOption(option);
    chart.resize()
    // resize();
    // chart.resize(/* getcharsizeofwindow() */);
}
