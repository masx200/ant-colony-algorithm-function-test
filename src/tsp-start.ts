import { TSPRunner } from "../functions/createTSPrunner";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { initializeTSP_runner } from "./initializeTSP_runner";

export function TSP_Start({
    onGlobalBestRouteChange,
    onLatestRouteChange,
    roundofsearch,
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
    roundofsearch: number;
    numberofants: number;
    nodecoordinates: Nodecoordinates;
}): void {
    console.log("TSP_Start", nodecoordinates);
    TSP_RunnerRef.value ||= initializeTSP_runner({
        pheromonevolatilitycoefficientR1,
        onGlobalBestRouteChange,
        onLatestRouteChange,
        nodecoordinates,
        numberofants,
    });
    TSP_RunnerRef.value?.runiterations(roundofsearch);
}
export const TSP_workerRef: { value?: Worker | undefined } = {};
export const TSP_RunnerRef: { value?: TSPRunner | undefined } = {};
