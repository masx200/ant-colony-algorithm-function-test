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
export type ECOption = echarts.ComposeOption<
    | BarSeriesOption
    | LineSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
>;
/* 获得图表的大小通过窗口的大小 */
export function getcharsizeofwindow(): { width: number; height: number } {
    const min = Math.max(
        300,
        Math.min(
            window.innerHeight,
            window.innerWidth,
            document.body.clientHeight,
            document.body.clientWidth,
        )
    );
    return {
        width: min,
        height: min,
    };
}
