import {
    COMMON_TSP_EXECUTION,
    COMMON_TSP_Options,
} from "../classic-acs/tsp-interface";
import { tsp_acs_execution } from "../classic-acs/tsp_acs_execution";
import { tsp_acs_execution_and_local_optimization } from "../classic-acs/tsp_acs_execution_and_local_optimization";
import { tsp_acs_execution_and_local_optimization_with_Optional_city_rewards_and_punishments } from "../classic-acs/tsp_acs_execution_and_local_optimization_with_Optional-city-rewards-and-punishments";
import { assert_true } from "../test/assert_true";
import { ant_colony_algorithms } from "./ant_colony_algorithms";
// import { ant_colony_algorithms_to_creator } from "./ant_colony_algorithms_to_creator";
export const ant_colony_algorithms_to_creator: Record<
    string,
    () => (options: COMMON_TSP_Options) => COMMON_TSP_EXECUTION
> = {
    "经典蚁群算法,ACS": function () {
        // const { tsp_acs_execution } = await import(
        //     "../classic-acs/tsp_acs_execution"
        // );
        return tsp_acs_execution;
    },
    "ACS+三种局部优化方法": function () {
        // const { tsp_acs_execution_and_local_optimization } = await import(
        //     "../classic-acs/tsp_acs_execution_and_local_optimization"
        // );
        return tsp_acs_execution_and_local_optimization;
    },
    "ACS+三种局部优化方法+最优路径集合的可选城市奖惩": function () {
        return tsp_acs_execution_and_local_optimization_with_Optional_city_rewards_and_punishments;
    },
};
assert_true(
    ant_colony_algorithms.every((algorithm) => {
        return Reflect.has(ant_colony_algorithms_to_creator, algorithm);
    })
);
