import { EChartsType } from "echarts";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { drawrouteofnodecoordinates } from "./drawrouteofnodecoordinates";
import { debounce } from "lodash";
import { drawChartMaxWait, drawChartWait } from "./drawChartMaxWait";
import { debounce_animation_frame } from "./debounce_animation_frame";
export const draw_best_route_debounced = debounce_animation_frame(
    debounce(
        (
            route: number[],
            nodecoordinates: Nodecoordinates,
            chart: EChartsType
        ) => {
            drawrouteofnodecoordinates({
                // resize: chart.resize,
                route,
                nodecoordinates,
                chart: chart,
            });
        },
        drawChartWait,
        {
            maxWait: drawChartMaxWait,
        }
    )
);
