import { TSP_RunnerRef/* , TSP_workerRef */ } from "./TSP_workerRef";

export function Stop_TSP_Worker() {
    // console.log("Stop_TSP_Worker");
    TSP_RunnerRef.value?.terminate();
    // TSP_workerRef.value?.terminate();
    // TSP_workerRef.value = undefined;
    TSP_RunnerRef.value = undefined;
}
