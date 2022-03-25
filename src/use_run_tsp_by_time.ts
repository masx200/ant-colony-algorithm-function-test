import { Ref } from "vue";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { assertnumber } from "../test/assertnumber";
import { Fun_TSP_Before_Start } from "./Fun_TSP_Before_Start";
import { TSP_cities_map } from "./TSP_cities_map";
import { tsp_runner_run_async } from "./tsp_runner_run_async";

export function use_run_tsp_by_time({
    search_time_seconds,
    numberofeachround,
    selecteleref,
    local_pheromone_volatilization_rate,
    disablemapswitching,
    is_running,
    TSP_before_Start,
    onGlobalBestRouteChange,
    onLatestRouteChange,
    finish_one_route_listener,
    finish_one_iteration_listener,
    onprogress,
}: {
    search_time_seconds: Ref<number>;
    numberofeachround: Ref<number>;
    selecteleref: Ref<HTMLSelectElement | undefined>;
    local_pheromone_volatilization_rate: Ref<number>;
    disablemapswitching: Ref<boolean>;
    is_running: Ref<boolean>;
    TSP_before_Start: Fun_TSP_Before_Start;
    onGlobalBestRouteChange: (
        route: number[],
        node_coordinates: NodeCoordinates
    ) => void;
    onLatestRouteChange: (
        route: number[],
        node_coordinates: NodeCoordinates
    ) => void;
    finish_one_route_listener: () => void;
    finish_one_iteration_listener: () => void;
    onprogress: (p: number) => void;
}) {
    return async () => {
        const search_time_ms = search_time_seconds.value * 1000;
        const numberofeachroundvalue = numberofeachround.value;
        const element = selecteleref.value;
        // element && (element.selectedIndex = 0);
        const node_coordinates = TSP_cities_map.get(element?.value || "");
        const pheromone_volatility_coefficient_R1 =
            local_pheromone_volatilization_rate.value;
        if (
            pheromone_volatility_coefficient_R1 > 0 &&
            search_time_ms > 0 &&
            numberofeachroundvalue >= 2 &&
            node_coordinates
        ) {
            disablemapswitching.value = true;
            const number_of_ants = numberofeachroundvalue;
            // console.log(node_coordinates);
            assertnumber(number_of_ants);
            assertnumber(search_time_ms);
            assertnumber(pheromone_volatility_coefficient_R1);
            is_running.value = true;
            // const onFinishIteration = () => {
            //
            // };
            const runner = await TSP_before_Start({
                // onFinishIteration,
                pheromone_volatility_coefficient_R1,
                onGlobalBestRouteChange,
                node_coordinates: await node_coordinates(),
                number_of_ants,
                // round_of_search,
                onLatestRouteChange,
            });
            // console.log("runner", runner);
            await runner.on_finish_one_route(finish_one_route_listener);
            await runner.on_finish_one_iteration(finish_one_iteration_listener);

            await tsp_runner_run_async({
                time_of_search_ms: search_time_ms,
                runner,

                number_of_ants,
                onprogress,
            });
            is_running.value = false;
        }
    };
}
