import * as comlink from "comlink";
import { createTSPrunner, TSPRunner } from "../functions/createTSPrunner";
import { DataOfBestChange } from "../functions/DataOfBestChange";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { TSP_Worker_API } from "./TSP_Worker_API";
let runner: TSPRunner | undefined = undefined;
function init_runner({
    pheromonevolatilitycoefficientR1,
    nodecoordinates,
    numberofants,
}: {
    pheromonevolatilitycoefficientR1: number;
    nodecoordinates: Nodecoordinates;
    numberofants: number;
}) {
    runner ||= createTSPrunner({
        pheromonevolatilitycoefficientR1,
        nodecoordinates,
        numberofants,
    });
}
function runOneRoute() {
    if (!runner) {
        throw new Error("No runner found");
    }
    runner.runOneRoute();
}
const on_finish_one_route = (
    callback: (data: DataOfFinishOneRoute) => void
) => {
    if (!runner) {
        throw new Error("No runner found");
    }
    runner.on_finish_one_route(callback);
};
const on_finish_one_iteration = (
    callback: (data: DataOfFinishOneIteration) => void
) => {
    if (!runner) {
        throw new Error("No runner found");
    }
    runner.on_finish_one_iteration(callback);
};
const on_best_change: (callback: (data: DataOfBestChange) => void) => void = (
    callback
) => {
    if (!runner) {
        throw new Error("No runner found");
    }
    runner.on_best_change(callback);
};
const API: TSP_Worker_API = {
    on_best_change,
    init_runner,
    runOneRoute,
    on_finish_one_iteration,
    on_finish_one_route,
};
comlink.expose(API);
