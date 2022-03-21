import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { create_TSP_Worker_comlink } from "./create_TSP_Worker_comlink";
import { DataOfSummarize } from "./DataOfSummarize";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export function use_initialize_tsp_runner({
    onreceiveDataOfGlobalBest,
    onreceivedataofoneroute,
    onreceivedataofoneIteration,
}: {
    onreceiveDataOfGlobalBest: (data: DataOfSummarize) => void;
    onreceivedataofoneroute: (data: DataOfFinishOneRoute) => void;
    onreceivedataofoneIteration: (data: DataOfFinishOneIteration) => void;
}) {
    return async function initializeTSP_runner({
        // onFinishIteration,
        node_coordinates,
        number_of_ants,
        onGlobalBestRouteChange,
        onLatestRouteChange,
        pheromone_volatility_coefficient_R1,
    }: {
        // onFinishIteration: () => void;
        pheromone_volatility_coefficient_R1: number;
        node_coordinates: NodeCoordinates;
        number_of_ants: number;
        onGlobalBestRouteChange: (
            globalbestroute: number[],
            node_coordinates: NodeCoordinates
        ) => void;
        onLatestRouteChange: (
            latestroute: number[],
            node_coordinates: NodeCoordinates
        ) => void;
    }): Promise<TSP_Worker_Remote> {
        const runner = await create_TSP_Worker_comlink({
            pheromone_volatility_coefficient_R1,
            node_coordinates,
            number_of_ants,
        });
        console.log(runner);
        await runner.on_best_change((data) => {
            onreceiveDataOfGlobalBest(data);
            onGlobalBestRouteChange(data.globalbestroute, node_coordinates);
        });
        // runner.on_finish_one_route(onreceivedataofoneroute);
        await runner.on_finish_one_route((data) => {
            onreceivedataofoneroute(data);
            const { route } = data;
            onLatestRouteChange(route, node_coordinates);
        });
        // runner.onDataChange(onDataChange);
        // runner.on_finish_one_iteration(onDataChange);
        // runner.on_finish_one_route(onDataChange);
        await runner.on_finish_one_iteration((data) => {
            onreceivedataofoneIteration(data);
            // onGlobalBestRouteChange(data.globalbestroute, node_coordinates);
        });
        // debugger
        return runner;
    };
}
