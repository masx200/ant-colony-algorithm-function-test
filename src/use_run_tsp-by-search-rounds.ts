import { Ref } from "vue";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { assertnumber } from "../test/assertnumber";
import {
    defaultnumber_of_ants,
    defaultsearchrounds,
    default_pheromone_volatility_coefficient_R1,
} from "./defaultnumber_of_ants";
import { TSP_cities_map } from "./TSP_cities_map";
import { tsp_runner_run_async } from "./tsp_runner_run_async";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export function use_run_tsp_by_search_rounds({
    onprogress,
    TSP_before_Start,
    searchrounds,
    numberofeachround,
    selecteleref,
    local_pheromone_volatilization_rate,
    disablemapswitching,
    is_running,
    onGlobalBestRouteChange,
    onLatestRouteChange,
    finish_one_route_listener,
    finish_one_iteration_listener,
}: {
    onprogress: (percentage: number) => void;
    TSP_before_Start({
        onGlobalBestRouteChange,
        onLatestRouteChange,
        node_coordinates,
        number_of_ants,
        pheromone_volatility_coefficient_R1,
    }: {
        pheromone_volatility_coefficient_R1: number;
        onGlobalBestRouteChange: (
            globalbestroute: number[],
            node_coordinates: NodeCoordinates
        ) => void;
        onLatestRouteChange: (
            latestroute: number[],
            node_coordinates: NodeCoordinates
        ) => void;
        number_of_ants: number;
        node_coordinates: NodeCoordinates;
    }): Promise<TSP_Worker_Remote>;
    searchrounds: Ref<number>;
    numberofeachround: Ref<number>;
    selecteleref: Ref<HTMLSelectElement | undefined>;
    local_pheromone_volatilization_rate: Ref<number>;
    disablemapswitching: Ref<boolean>;
    is_running: Ref<boolean>;
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
}): () => Promise<void> {
    return async () => {
        // console.log("搜索轮次", searchrounds.value);
        // console.log("蚂蚁数量", numberofeachround.value);
        const round_of_search = searchrounds.value;
        const numberofeachroundvalue = numberofeachround.value;
        const element = selecteleref.value;
        // element && (element.selectedIndex = 0);
        const node_coordinates = TSP_cities_map.get(element?.value || "");
        const pheromone_volatility_coefficient_R1 =
            local_pheromone_volatilization_rate.value;
        if (
            pheromone_volatility_coefficient_R1 > 0 &&
            round_of_search > 0 &&
            numberofeachroundvalue >= 2 &&
            node_coordinates
        ) {
            disablemapswitching.value = true;
            const number_of_ants = numberofeachroundvalue;
            // console.log(node_coordinates);
            assertnumber(number_of_ants);
            assertnumber(round_of_search);
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
            onprogress(0);
            await tsp_runner_run_async({
                runner,
                round_of_search,
                number_of_ants,
                onprogress,
            });
            is_running.value = false;
            // runner.onDataChange(data_change_listener);
        } else {
            local_pheromone_volatilization_rate.value =
                default_pheromone_volatility_coefficient_R1;
            searchrounds.value = defaultsearchrounds;
            numberofeachround.value = defaultnumber_of_ants;
            disablemapswitching.value = false;
            is_running.value = false;
        }
    };
}
