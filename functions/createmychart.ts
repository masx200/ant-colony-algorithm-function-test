import * as echarts from "echarts/core";
import { debounce } from "lodash";
import { getcharsizeofwindow } from "./echarts-line";
/* 创建echarts实例 */
export function createmychart(): echarts.ECharts {
    const debouncedresize = debounce(() => {
        myChart.resize(getcharsizeofwindow());
    });
    const container = document.body.appendChild(document.createElement("div"));
    const myChart = echarts.init(container);

    container.style.width = "100%";
    container.style.height = "100%";
    const resizeobserver = new ResizeObserver(debouncedresize);
    resizeobserver.observe(container);
    window.addEventListener("resize", debouncedresize);
    return myChart;
}
