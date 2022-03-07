import * as echarts from "echarts/core";
import { debounce } from "lodash";
import { getcharsizeofwindow } from "./getcharsizeofwindow";
/* 创建echarts实例 */
export function createmychart(): {
    myChart: echarts.ECharts;
    container: HTMLDivElement;
} {
    const debouncedresize = debounce(() => {
        myChart.resize(getcharsizeofwindow());
    });
    const container = document.body.appendChild(document.createElement("div"));
    // document.body.appendChild(document.createElement("hr"));

    const myChart = echarts.init(container);

    container.style.width = "100%";
    container.style.height = "100%";
    const resizeobserver = new ResizeObserver(debouncedresize);
    resizeobserver.observe(container);
    window.addEventListener("resize", debouncedresize);
    return { myChart, container };
}
