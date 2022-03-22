import { TSP_RunnerRef, TSP_workerRef } from "./TSP_workerRef";

export function StopTSPWorker() {
    // console.log("StopTSPWorker");
    TSP_workerRef.value?.terminate();
    TSP_workerRef.value = undefined;
    TSP_RunnerRef.value = undefined;
}
