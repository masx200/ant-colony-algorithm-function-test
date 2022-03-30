import { Ref } from "vue";
import { assertnumber } from "../test/assertnumber";
import {
    defaultnumber_of_ants,
    defaultsearchrounds,
    default_pheromone_volatility_coefficient_R1,
} from "./defaultnumber_of_ants";
import { tsp_runner_run_async } from "./tsp_runner_run_async";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export async function run_tsp_by_search_rounds({
    runner,
    // coefficient_of_pheromone_Increase_Non_Optimal_Paths,
    onprogress,
    // TSP_before_Start,
    searchrounds,
    number_of_ants_ref,
    // selecteleref,
    // local_pheromone_volatilization_rate,
    // disablemapswitching,
    is_running,
}: // onGlobalBestRouteChange,
// onLatestRouteChange,
// finish_one_route_listener,
// finish_one_iteration_listener,
{
    runner: TSP_Worker_Remote;
    // coefficient_of_pheromone_Increase_Non_Optimal_Paths: Ref<number>;
    onprogress: (percentage: number) => void;
    // TSP_before_Start: Fun_TSP_Before_Start;
    searchrounds: Ref<number>;
    number_of_ants_ref: Ref<number>;
    // selecteleref: Ref<HTMLSelectElement | undefined>;
    // local_pheromone_volatilization_rate: Ref<number>;
    // disablemapswitching: Ref<boolean>;
    is_running: Ref<boolean>;
    // onGlobalBestRouteChange: (
    //     route: number[],
    //     node_coordinates: NodeCoordinates
    // ) => void;
    // onLatestRouteChange: (
    //     route: number[],
    //     node_coordinates: NodeCoordinates
    // ) => void;
    // finish_one_route_listener: () => void;
    // finish_one_iteration_listener: () => void;
}): Promise<void> {
    // return async () => {
    // const coefficient_of_pheromone_Increase_Non_Optimal_Paths_value =
    // coefficient_of_pheromone_Increase_Non_Optimal_Paths.value;
    // console.log("搜索轮次", searchrounds.value);
    // console.log("蚂蚁数量", number_of_ants_ref.value);
    const round_of_search = searchrounds.value;
    const number_of_ants_value = number_of_ants_ref.value;
    // const element = selecteleref.value;
    // element && (element.selectedIndex = 0);
    // const node_coordinates = TSP_cities_map.get(element?.value || "");
    // const pheromone_volatility_coefficient_R1 =
    // local_pheromone_volatilization_rate.value;
    if (
        // pheromone_volatility_coefficient_R1 > 0 &&
        round_of_search > 0 &&
        number_of_ants_value >= 2 /* &&
        node_coordinates */
    ) {
        // disablemapswitching.value = true;
        const number_of_ants = number_of_ants_value;
        // console.log(node_coordinates);
        assertnumber(number_of_ants);
        assertnumber(round_of_search);
        // assertnumber(pheromone_volatility_coefficient_R1);
        is_running.value = true;
        // const onFinishIteration = () => {
        //
        // };
        // const runner = await TSP_before_Start({
        //     coefficient_of_pheromone_Increase_Non_Optimal_Paths:
        //         coefficient_of_pheromone_Increase_Non_Optimal_Paths_value,
        //     // onFinishIteration,
        //     pheromone_volatility_coefficient_R1,
        //     onGlobalBestRouteChange,
        //     node_coordinates: await node_coordinates(),
        //     number_of_ants,
        //     // round_of_search,
        //     onLatestRouteChange,
        // });
        // // console.log("runner", runner);

        // await runner.on_finish_one_route(finish_one_route_listener);
        // await runner.on_finish_one_iteration(finish_one_iteration_listener);
        const count_of_search = number_of_ants * round_of_search;
        await tsp_runner_run_async({
            count_of_search,
            runner,
            // round_of_search,
            // number_of_ants,
            onprogress,
        });
        is_running.value = false;
        // runner.onDataChange(data_change_listener);
    } else {
        // local_pheromone_volatilization_rate.value =
        default_pheromone_volatility_coefficient_R1;
        searchrounds.value = defaultsearchrounds;
        number_of_ants_ref.value = defaultnumber_of_ants;
        // disablemapswitching.value = false;
        is_running.value = false;
    }
    // };
}
