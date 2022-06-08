import {
    COMMON_TSP_EXECUTION,
    COMMON_TSP_Options,
} from "../classic-acs/tsp-interface";
import { classic_tsp_acs_execution } from "../classic-acs/classic_tsp_acs_execution";
import { tsp_acs_execution_and_local_optimization } from "../classic-acs/tsp_acs_execution_and_local_optimization";
import { tsp_acs_execution_and_local_optimization_with_Optional_city_rewards_and_punishments } from "../classic-acs/tsp_acs_execution_and_local_optimization_with_Optional-city-rewards-and-punishments";
import { tsp_acs_execution_with_dynamic_pheromone } from "../classic-acs/tsp_acs_execution_with_dynamic_pheromone";
import { assert_true } from "../test/assert_true";
import { ant_colony_algorithms } from "./ant_colony_algorithms";
import { tsp_acs_execution_with_dynamic_pheromone_and_local_optimization } from "../classic-acs/tsp_acs_execution_with_dynamic_pheromone_and_local_optimization.ts";

export const ant_colony_algorithms_to_creator: Record<
    string,
    () => (options: COMMON_TSP_Options) => COMMON_TSP_EXECUTION
> = {
    "ACS+基于收敛系数的动态信息素更新+三种局部优化方法": function () {
        return tsp_acs_execution_with_dynamic_pheromone_and_local_optimization;
    },
    "经典蚁群算法,ACS": function () {
        return classic_tsp_acs_execution;
    },
    "ACS+三种局部优化方法": function () {
        return tsp_acs_execution_and_local_optimization;
    },
    "ACS+三种局部优化方法+最优路径集合的可选城市奖惩": function () {
        return tsp_acs_execution_and_local_optimization_with_Optional_city_rewards_and_punishments;
    },
    "ACS+基于收敛系数的动态信息素更新": function () {
        return tsp_acs_execution_with_dynamic_pheromone;
    },
};
assert_true(
    ant_colony_algorithms.every((algorithm) => {
        return Reflect.has(ant_colony_algorithms_to_creator, algorithm);
    })
);
