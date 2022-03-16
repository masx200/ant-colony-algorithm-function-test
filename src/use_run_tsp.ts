import { Ref } from "vue";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { assertnumber } from "../test/assertnumber";
import {
    defaultnumberofants,
    defaultsearchrounds,
    default_local_pheromone_volatilization_rate,
} from "./defaultnumberofants";
import { TSP_cities_map } from "./TSP_cities_map";
import { tsp_runner_run_async } from "./tsp_runner_run_async";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export function use_run_tsp({
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
    TSP_before_Start({
        onGlobalBestRouteChange,
        onLatestRouteChange,
        nodecoordinates,
        numberofants,
        pheromonevolatilitycoefficientR1,
    }: {
        pheromonevolatilitycoefficientR1: number;
        onGlobalBestRouteChange: (
            globalbestroute: number[],
            nodecoordinates: Nodecoordinates
        ) => void;
        onLatestRouteChange: (
            latestroute: number[],
            nodecoordinates: Nodecoordinates
        ) => void;
        numberofants: number;
        nodecoordinates: Nodecoordinates;
    }): Promise<TSP_Worker_Remote>;
    searchrounds: Ref<number>;
    numberofeachround: Ref<number>;
    selecteleref: Ref<HTMLSelectElement | undefined>;
    local_pheromone_volatilization_rate: Ref<number>;
    disablemapswitching: Ref<boolean>;
    is_running: Ref<boolean>;
    onGlobalBestRouteChange: (
        route: number[],
        nodecoordinates: Nodecoordinates
    ) => void;
    onLatestRouteChange: (
        route: number[],
        nodecoordinates: Nodecoordinates
    ) => void;
    finish_one_route_listener: () => void;
    finish_one_iteration_listener: () => void;
}) {
    return async () => {
        console.log("搜索轮次", searchrounds.value);
        console.log("蚂蚁数量", numberofeachround.value);
        const roundofsearch = searchrounds.value;
        const numberofeachroundvalue = numberofeachround.value;
        const element = selecteleref.value;
        // element && (element.selectedIndex = 0);
        const nodecoordinates = TSP_cities_map.get(element?.value || "");
        const pheromonevolatilitycoefficientR1 =
            local_pheromone_volatilization_rate.value;
        if (
            pheromonevolatilitycoefficientR1 > 0 &&
            roundofsearch > 0 &&
            numberofeachroundvalue >= 2 &&
            nodecoordinates
        ) {
            disablemapswitching.value = true;
            const numberofants = numberofeachroundvalue;
            console.log(nodecoordinates);
            assertnumber(numberofants);
            assertnumber(roundofsearch);
            assertnumber(pheromonevolatilitycoefficientR1);
            is_running.value = true;
            // const onFinishIteration = () => {
            //
            // };
            const runner = await TSP_before_Start({
                // onFinishIteration,
                pheromonevolatilitycoefficientR1,
                onGlobalBestRouteChange,
                nodecoordinates,
                numberofants,
                // roundofsearch,
                onLatestRouteChange,
            });
            console.log("runner", runner);

            await runner.on_finish_one_route(finish_one_route_listener);
            await runner.on_finish_one_iteration(finish_one_iteration_listener);
            await tsp_runner_run_async(runner, roundofsearch, numberofants);
            is_running.value = false;
            // runner.onDataChange(data_change_listener);
        } else {
            local_pheromone_volatilization_rate.value =
                default_local_pheromone_volatilization_rate;
            searchrounds.value = defaultsearchrounds;
            numberofeachround.value = defaultnumberofants;
            disablemapswitching.value = false;
            is_running.value = false;
        }
    };
}
