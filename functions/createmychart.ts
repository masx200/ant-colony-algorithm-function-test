import * as echarts from "echarts/core";
import { getcharsizeofwindow } from "./echarts-line";

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
