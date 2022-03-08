import { clearDataOfOneIteration } from "./dataofoneiteration";
import { clearDataOfOneRoute } from "./dataofoneroute";
import { clearDataOfResult } from "./resultTableHeads-resultTableBody";
import { TSP_worker } from "./tsp-start";

export function TSP_terminate() {
    console.log("TSP_terminate");
    TSP_worker.value?.terminate();
    TSP_worker.value = undefined;
    clearDataOfOneRoute();
    clearDataOfOneIteration();
    clearDataOfResult();
}
