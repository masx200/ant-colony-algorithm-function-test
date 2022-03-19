import { EChartsType } from "echarts";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { drawrouteofnodecoordinates } from "./drawrouteofnodecoordinates";
import { debounce } from "lodash";
export const draw_best_route_debounced = debounce(
    (route: number[], nodecoordinates: Nodecoordinates, chart: EChartsType) => {
        drawrouteofnodecoordinates({
            // resize: chart.resize,
            route,
            nodecoordinates,
            chart: chart,
        });
    },
    100,
    {
        maxWait: 1000,
    }
);
