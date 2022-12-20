import { EChartsType } from "echarts";
import * as echarts from "echarts";
import { debounce } from "lodash-es";
import { debounce_animation_frame } from "./debounce_animation_frame";

/* 创建echarts实例 */
export function createchartofcontainer(
    container: HTMLElement
): Pick<EChartsType, "resize" | "setOption"> {
    const debouncedresize = debounce_animation_frame(
        debounce(() => {
            chart.resize();
        })
    );
    // const container = document.body.appendChild(document.createElement("div"));
    // document.body.appendChild(document.createElement("hr"));

    const chart = echarts.init(container);

    // container.style.width = "100%";
    // container.style.height = "100%";
    const resizeobserver = new ResizeObserver(debouncedresize);
    resizeobserver.observe(container);
    window.addEventListener("resize", debouncedresize);
    const keys = ["resize", "setOption"];
    // const resize = () => {
    //     chart.resize();
    // };
    // return { chart, resize };

    keys.forEach((key) => {
        Reflect.set(chart, key, Reflect.get(chart, key).bind(chart));
    });

    //debounce

    const resize = debounce_animation_frame(
        debounce(chart.resize)
    ) as EChartsType["resize"];

    const setOption = debounce_animation_frame(
        debounce(chart.setOption)
    ) as EChartsType["setOption"];

    // console.log(chart);
    return { resize, setOption } as Pick<EChartsType, "resize" | "setOption">;
}
