import { EChartsType } from "echarts";
import * as echarts from "echarts";
import { debounce } from "lodash";
import { debounce_animation_frame } from "../src/debounce_animation_frame";
/* 创建echarts实例 */
export function createchart(): {
    chart: EChartsType;
    container: HTMLDivElement;
    // resize: () => void;
} {
    const debouncedresize = debounce_animation_frame(
        debounce(() => {
            chart.resize();
        })
    );
    const container = document.body.appendChild(document.createElement("div"));
    // document.body.appendChild(document.createElement("hr"));

    const chart = echarts.init(container);

    container.style.width = "500px";
    container.style.height = "500px";
    const resizeobserver = new ResizeObserver(debouncedresize);
    resizeobserver.observe(container);
    window.addEventListener("resize", debouncedresize);

    // const resize = () => {
    //     chart.resize();
    // }; const keys = ["resize", "setOption"];
    // const resize = () => {
    //     chart.resize();
    // };
    // return { chart, resize };
    const keys = ["resize", "setOption"];
    keys.forEach((key) => {
        Reflect.set(chart, key, Reflect.get(chart, key).bind(chart));
    });
    return { chart, container /*  resize  */ };
}
