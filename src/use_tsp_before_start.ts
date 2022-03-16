import { Nodecoordinates } from "../functions/Nodecoordinates";
import { TSP_RunnerRef } from "./TSP_workerRef";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export function use_tsp_before_start(
    initializeTSP_runner: ({
        nodecoordinates,
        numberofants,
        onGlobalBestRouteChange,
        onLatestRouteChange,
        pheromonevolatilitycoefficientR1,
    }: {
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
    }) => Promise<TSP_Worker_Remote>
) {
    return async function TSP_before_Start({
        // onFinishIteration,
        onGlobalBestRouteChange,
        onLatestRouteChange,
        // roundofsearch,
        nodecoordinates,
        numberofants,
        pheromonevolatilitycoefficientR1,
    }: {
        // onFinishIteration: () => void;
        pheromonevolatilitycoefficientR1: number;
        onGlobalBestRouteChange: (
            globalbestroute: number[],
            nodecoordinates: Nodecoordinates
        ) => void;
        onLatestRouteChange: (
            latestroute: number[],
            nodecoordinates: Nodecoordinates
        ) => void;
        // roundofsearch: number;
        numberofants: number;
        nodecoordinates: Nodecoordinates;
    }): Promise<TSP_Worker_Remote> {
        console.log("TSP_before_Start", nodecoordinates);
        TSP_RunnerRef.value ||= await initializeTSP_runner({
            // onFinishIteration,
            pheromonevolatilitycoefficientR1,
            onGlobalBestRouteChange,
            onLatestRouteChange,
            nodecoordinates,
            numberofants,
        });
        // TSP_RunnerRef.value?.runIterations(roundofsearch);
        const runner = TSP_RunnerRef.value;
        return runner;
    };
}
