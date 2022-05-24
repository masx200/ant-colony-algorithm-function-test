import * as comlink from "comlink";
import { COMMON_TSP_EXECUTION } from "../classic-acs/tsp-interface";
import { tsp_acs_execution } from "../classic-acs/tsp_acs_execution";
import { create_run_iterations } from "../functions/create_run_iterations";

import { TSP_Runner } from "../functions/TSP_Runner";
import { assert_true } from "../test/assert_true";
import { Runner_Init_Options } from "./Runner_Init_Options";

import { TSP_Worker_API } from "./TSP_Worker_API";
let runner:
    | (Pick<TSP_Runner, "runOneIteration" | "runIterations"> &
          COMMON_TSP_EXECUTION)
    | undefined = undefined;
function init_runner(options: Runner_Init_Options) {
    const { algorithm } = options;
    if (!Reflect.has(ant_colony_algorithms, algorithm)) {
        throw new Error("unknown ant_colony_algorithm");
    }
    if (runner) {
        throw new Error("cannot init runner twice");
    }
    const createTSPrunner = Reflect.get(ant_colony_algorithms, algorithm);
    assert_true(typeof createTSPrunner === "function");
    const rawrunner = createTSPrunner(options) as COMMON_TSP_EXECUTION;
    runner = Object.assign(rawrunner, {
        runIterations: create_run_iterations(rawrunner.runOneIteration),
    });
}
const ant_colony_algorithms = {
    "经典蚁群算法,ACS": tsp_acs_execution,
};
function get_ant_colony_algorithms() {
    return Object.keys(ant_colony_algorithms);
}
const API: TSP_Worker_API = new Proxy(
    { get_ant_colony_algorithms, init_runner },
    {
        ownKeys(target) {
            return [
                Reflect.ownKeys(target),
                runner ? Reflect.ownKeys(runner) : [],
            ].flat();
        },

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
