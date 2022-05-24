import { COMMON_TSP_EXECUTION } from "../classic-acs/tsp-interface";
import { TSP_Runner } from "../functions/TSP_Runner";
import { Runner_Init_Options } from "./Runner_Init_Options";

export type TSP_Worker_API = Pick<
    TSP_Runner,
    "runOneIteration" | "runIterations"
> &
    COMMON_TSP_EXECUTION & {
        init_runner: (options: Runner_Init_Options) => void;
        // get_ant_colony_algorithms: () => string[];
    };
