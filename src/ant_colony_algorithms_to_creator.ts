import {
    COMMON_TSP_EXECUTION,
    COMMON_TSP_Options,
} from "../classic-acs/tsp-interface";
import { tsp_acs_execution } from "../classic-acs/tsp_acs_execution";
import { tsp_acs_execution_and_local_optimization } from "../classic-acs/tsp_acs_execution_and_local_optimization";

export const ant_colony_algorithms_to_creator: Record<
    string,
    (options: COMMON_TSP_Options) => COMMON_TSP_EXECUTION
> = {
    "经典蚁群算法,ACS": tsp_acs_execution,
    "ACS+三种局部优化方法": tsp_acs_execution_and_local_optimization,
};
