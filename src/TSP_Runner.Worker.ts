import * as comlink from "comlink";
import { createTSPrunner, TSPRunner } from "../functions/createTSPrunner";
import { DataOfBestChange } from "../functions/DataOfBestChange";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { TSPRunnerOptions } from "./TSPRunnerOptions";
// import { Nodecoordinates } from "../functions/Nodecoordinates";
import { TSP_Worker_API } from "./TSP_Worker_API";
let runner: TSPRunner | undefined = undefined;
function init_runner(options: TSPRunnerOptions) {
    runner ||= createTSPrunner(options);
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
const API: TSP_Worker_API = new Proxy(
    {
        on_best_change,
        init_runner,
        runOneRoute,
        on_finish_one_iteration,
        on_finish_one_route,
    },
    {
        ownKeys(target) {
            return [
                Reflect.ownKeys(target),
                runner ? Reflect.ownKeys(runner) : [],
            ].flat();
        },
        defineProperty: () => false,
        deleteProperty: () => false,
        get(target, key) {
            const value = Reflect.get(target, key);
            if (typeof value !== "undefined") {
                return value;
            } else {
                if (runner) {
                    return Reflect.get(runner, key);
                } else {
                    throw new Error("No runner found");
                }
            }
        },
        has(target, key) {
            return Boolean(
                Reflect.has(target, key) || (runner && Reflect.has(runner, key))
            );
        },
    }
) as TSP_Worker_API;

comlink.expose(API);
