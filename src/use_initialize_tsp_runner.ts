import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { Nodecoordinates } from "../functions/Nodecoordinates";
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
        nodecoordinates,
        numberofants,
        onGlobalBestRouteChange,
        onLatestRouteChange,
        pheromonevolatilitycoefficientR1,
    }: {
        // onFinishIteration: () => void;
        pheromonevolatilitycoefficientR1: number;
        nodecoordinates: Nodecoordinates;
        numberofants: number;
        onGlobalBestRouteChange: (
            globalbestroute: number[],
            nodecoordinates: Nodecoordinates
        ) => void;
        onLatestRouteChange: (
            latestroute: number[],
            nodecoordinates: Nodecoordinates
        ) => void;
    }): Promise<TSP_Worker_Remote> {
        const runner = await create_TSP_Worker_comlink({
            pheromonevolatilitycoefficientR1,
            nodecoordinates,
            numberofants,
        });
        console.log(runner);
        await runner.on_best_change((data) => {
            onreceiveDataOfGlobalBest(data);
            onGlobalBestRouteChange(data.globalbestroute, nodecoordinates);
        });
        // runner.on_finish_one_route(onreceivedataofoneroute);
        await runner.on_finish_one_route((data) => {
            onreceivedataofoneroute(data);
            const { route } = data;
            onLatestRouteChange(route, nodecoordinates);
        });
        // runner.onDataChange(onDataChange);
        // runner.on_finish_one_iteration(onDataChange);
        // runner.on_finish_one_route(onDataChange);
        await runner.on_finish_one_iteration((data) => {
            onreceivedataofoneIteration(data);
            // onGlobalBestRouteChange(data.globalbestroute, nodecoordinates);
        });
        // debugger
        return runner;
    };
}
