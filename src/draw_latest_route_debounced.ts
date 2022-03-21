import { EChartsType } from "echarts";
import { debounce } from "lodash";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { drawChartMaxWait, drawChartWait } from "./drawChartMaxWait";
import { debounce_animation_frame } from "./debounce_animation_frame";
import { drawrouteofnodecoordinates } from "./drawrouteofnodecoordinates";

export const draw_latest_route_debounced = debounce_animation_frame(
    debounce(
        (
            route: number[],
            nodecoordinates: Nodecoordinates,
            latestchart: EChartsType
        ) => {
            drawrouteofnodecoordinates({
                // resize: latestchart.resize,
                route,
                nodecoordinates,
                chart: latestchart,
            });
        },
        drawChartWait,
        {
            maxWait: drawChartMaxWait,
        }
    )
);
