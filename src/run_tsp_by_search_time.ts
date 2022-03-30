import { Ref } from "vue";
import { assertnumber } from "../test/assertnumber";
import { tsp_runner_run_async } from "./tsp_runner_run_async";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export async function run_tsp_by_search_time({
    runner,
    // coefficient_of_pheromone_Increase_Non_Optimal_Paths,
    search_time_seconds,
    // number_of_ants_ref,
    // selecteleref,
    // local_pheromone_volatilization_rate,
    // disablemapswitching,
    is_running,
    // TSP_before_Start,
    // onGlobalBestRouteChange,
    // onLatestRouteChange,
    // finish_one_route_listener,
    // finish_one_iteration_listener,
    onprogress,
}: {
    runner: TSP_Worker_Remote;
    // coefficient_of_pheromone_Increase_Non_Optimal_Paths: Ref<number>;
    search_time_seconds: Ref<number>;
    // number_of_ants_ref: Ref<number>;
    // selecteleref: Ref<HTMLSelectElement | undefined>;
    // local_pheromone_volatilization_rate: Ref<number>;
    // disablemapswitching: Ref<boolean>;
    is_running: Ref<boolean>;
    // TSP_before_Start: Fun_TSP_Before_Start;
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
    onprogress: (p: number) => void;
}): Promise<void> {
    // return async () => {
    // const coefficient_of_pheromone_Increase_Non_Optimal_Paths_value =
    //     coefficient_of_pheromone_Increase_Non_Optimal_Paths.value;
    const search_time_ms = search_time_seconds.value * 1000;
    // const number_of_ants_value = number_of_ants_ref.value;
    // const element = selecteleref.value;
    // element && (element.selectedIndex = 0);
    // const node_coordinates = TSP_cities_map.get(element?.value || "");
    // const pheromone_volatility_coefficient_R1 =
    //     local_pheromone_volatilization_rate.value;
    if (
        // pheromone_volatility_coefficient_R1 > 0 &&
        search_time_ms > 0 /* &&
        // number_of_ants_value >= 2 &&
        node_coordinates */
    ) {
        // disablemapswitching.value = true;
        // const number_of_ants = number_of_ants_value;
        // console.log(node_coordinates);
        // assertnumber(number_of_ants);
        assertnumber(search_time_ms);
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

        await tsp_runner_run_async({
            time_of_search_ms: search_time_ms,
            runner,

            // number_of_ants,
            onprogress,
        });
        is_running.value = false;
    }
    // };
}
