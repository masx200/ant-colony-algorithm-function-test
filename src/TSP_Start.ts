import { TSPRunner } from "../functions/createTSPrunner";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { initializeTSP_runner } from "./initializeTSP_runner";
import { TSP_RunnerRef } from "./TSP_workerRef";

export function TSP_before_Start({
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
}): TSPRunner {
    console.log("TSP_before_Start", nodecoordinates);
    TSP_RunnerRef.value ||= initializeTSP_runner({
        // onFinishIteration,
        pheromonevolatilitycoefficientR1,
        onGlobalBestRouteChange,
        onLatestRouteChange,
        nodecoordinates,
        numberofants,
    });
    // TSP_RunnerRef.value?.runiterations(roundofsearch);
    const runner = TSP_RunnerRef.value;
    return runner;
}
