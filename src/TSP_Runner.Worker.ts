import { expose } from "comlink";
import {
    COMMON_TSP_EXECUTION,
    COMMON_TSP_Options,
} from "../classic-acs/tsp-interface";
import { create_run_iterations } from "../functions/create_run_iterations";

import { TSP_Runner } from "../functions/TSP_Runner";
import { assert_true } from "../test/assert_true";
import { ant_colony_algorithms } from "./ant_colony_algorithms";
import { ant_colony_algorithms_to_creator } from "./ant_colony_algorithms_to_creator";
import { Runner_Init_Options } from "./Runner_Init_Options";

import { TSP_Worker_API } from "./TSP_Worker_API";
let runner:
    | (Pick<TSP_Runner, "runOneIteration" | "runIterations"> &
          COMMON_TSP_EXECUTION)
    | undefined = undefined;
async function init_runner(options: Runner_Init_Options) {
    const { algorithm } = options;
    if (
        !(
            Reflect.has(ant_colony_algorithms_to_creator, algorithm) &&
            ant_colony_algorithms.includes(algorithm)
        )
    ) {
        throw new Error("unknown ant_colony_algorithm");
    }
    if (runner) {
        throw new Error("cannot init runner twice");
    }
    const get_tsp_creator = ant_colony_algorithms_to_creator[algorithm];
    assert_true(typeof get_tsp_creator === "function");
    const createTSPrunner = get_tsp_creator() as (
        options: COMMON_TSP_Options
    ) => COMMON_TSP_EXECUTION;
    assert_true(typeof createTSPrunner === "function");
    const rawrunner = createTSPrunner(options) as COMMON_TSP_EXECUTION;
    runner = Object.assign(rawrunner, {
        runIterations: create_run_iterations(rawrunner.runOneIteration),
    });
}

const API: TSP_Worker_API = new Proxy(
    { init_runner },
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

expose(API);
