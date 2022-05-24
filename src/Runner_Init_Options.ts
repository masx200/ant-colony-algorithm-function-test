import { COMMON_TSP_Options } from "../classic-acs/tsp-interface";
import { TSPRunnerOptions } from "./TSPRunnerOptions";

export type Runner_Init_Options = TSPRunnerOptions & {
    algorithm: string;
} & COMMON_TSP_Options;
