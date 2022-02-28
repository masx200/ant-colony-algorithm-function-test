// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
// 引入柱状图图表，图表后缀都为 Chart
import {
    LineChart,
    // 系列类型的定义后缀都为 SeriesOption
    BarSeriesOption,
    LineSeriesOption,
} from "echarts/charts";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    DatasetComponent,
    DatasetComponentOption,
    GridComponent,
    GridComponentOption,
    TitleComponent,
    // 组件类型的定义后缀都为 ComponentOption
    TitleComponentOption,
    TooltipComponent,
    TooltipComponentOption,
    TransformComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([
    LineChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,

    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
]);

// 接下来的使用就跟之前一样，初始化图表，设置配置项

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
    | BarSeriesOption
    | LineSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
>;

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

export function drawlinechart(
    data: Array<[number, number]>,
    mychart: echarts.ECharts
) {
    const option: ECOption = {
        xAxis: {},
        yAxis: {},
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
function getcharsizeofwindow(): { width: number; height: number } {
    const min = Math.min(window.innerHeight, window.innerWidth);
    return {
        width: min,
        height: min,
    };
}
export function createmychart(): echarts.ECharts {
    const container = document.body.appendChild(document.createElement("div"));
    const myChart = echarts.init(container);

    // container.style.width = "100%";
    // container.style.height = "100%";
    const resizeobserver = new ResizeObserver(() => {
        myChart.resize(getcharsizeofwindow());
    });
    resizeobserver.observe(container);
    window.addEventListener("resize", () => {
        myChart.resize(getcharsizeofwindow());
    });
    return myChart;
}
