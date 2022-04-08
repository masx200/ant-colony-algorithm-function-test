import { EChartsType } from "echarts";
import { Ref, ShallowRef } from "vue";
import { DefaultOptions, distance_round } from "./default_Options";
import { showanddrawrandomgreedyoftsp } from "./showanddrawrandomgreedyoftsp";
import { TSP_cities_map } from "./TSP_cities_map";

export function use_submit({
    selecteleref,
    chart_store_latest,
    chart_store_best,
}: {
    selecteleref: Ref<HTMLSelectElement | undefined>;
    chart_store_latest: ShallowRef<
        Pick<EChartsType, "resize" | "setOption"> | undefined
    >;
    chart_store_best: ShallowRef<
        Pick<EChartsType, "resize" | "setOption"> | undefined
    >;
}) {
    return async () => {
        const element = selecteleref.value;
        // console.log(element);
        // console.log(element?.value);
        const node_coordinates = TSP_cities_map.get(element?.value || "");
        if (node_coordinates) {
            // console.log(node_coordinates);
            // setTimeout(() => {
            const latestchart = chart_store_latest.value;
            if (latestchart) {
                await showanddrawrandomgreedyoftsp({
                    // resize: latestchart.resize,
                    node_coordinates: await node_coordinates(),
                    chart: latestchart,
                    round: distance_round,
                    max_cities_of_greedy: DefaultOptions.max_cities_of_greedy,
                });
            }
            // });
            // setTimeout(() => {
            const bestchart = chart_store_best.value;
            if (bestchart) {
                await showanddrawrandomgreedyoftsp({
                    // resize: bestchart.resize,
                    node_coordinates: await node_coordinates(),
                    chart: bestchart,
                    round: distance_round,
                    max_cities_of_greedy: DefaultOptions.max_cities_of_greedy,
                });
            }
            // });
        }
    };
}
