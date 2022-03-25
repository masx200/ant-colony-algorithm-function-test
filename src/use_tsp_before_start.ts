import { NodeCoordinates } from "../functions/NodeCoordinates";
import { Fun_initialize_TSP_runner } from "./Fun_initialize_TSP_runner";
import { Fun_TSP_Before_Start } from "./Fun_TSP_Before_Start";
import { TSP_RunnerRef } from "./TSP_workerRef";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export function use_tsp_before_start(
    initializeTSP_runner: Fun_initialize_TSP_runner
): Fun_TSP_Before_Start {
    return async function TSP_before_Start({
        // onFinishIteration,
        onGlobalBestRouteChange,
        onLatestRouteChange,
        // round_of_search,
        node_coordinates,
        number_of_ants,
        pheromone_volatility_coefficient_R1,
    }: {
        // onFinishIteration: () => void;
        pheromone_volatility_coefficient_R1: number;
        onGlobalBestRouteChange: (
            globalbestroute: number[],
            node_coordinates: NodeCoordinates
        ) => void;
        onLatestRouteChange: (
            latestroute: number[],
            node_coordinates: NodeCoordinates
        ) => void;
        // round_of_search: number;
        number_of_ants: number;
        node_coordinates: NodeCoordinates;
    }): Promise<TSP_Worker_Remote> {
        // console.log("TSP_before_Start", node_coordinates);
        TSP_RunnerRef.value ||= await initializeTSP_runner({
            // onFinishIteration,
            pheromone_volatility_coefficient_R1,
            onGlobalBestRouteChange,
            onLatestRouteChange,
            node_coordinates,
            number_of_ants,
        });
        // TSP_RunnerRef.value?.runIterations(round_of_search);
        const runner = TSP_RunnerRef.value;
        return runner;
    };
}
