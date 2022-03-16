import { TSP_RunnerRef, TSP_workerRef } from "./TSP_workerRef";

export function use_tsp_terminate({
    clearDataOfOneRoute,
    clearDataOfOneIteration,
    clearDataOfResult,
}: {
    clearDataOfOneRoute: () => void;
    clearDataOfOneIteration: () => void;
    clearDataOfResult: () => void;
}) {
    return function TSP_terminate() {
        console.log("TSP_terminate");
        TSP_workerRef.value?.terminate();
        TSP_workerRef.value = undefined;
        clearDataOfOneRoute();
        clearDataOfOneIteration();
        clearDataOfResult();
        TSP_RunnerRef.value = undefined;
    };
}
