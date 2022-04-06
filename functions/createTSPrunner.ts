import { create_get_neighbors_from_optimal_routes_and_latest_routes } from "./create_get_neighbors_from_optimal_routes_and_latest_routes";
import uniq from "lodash/uniq";
import EventEmitterTargetClass from "@masx200/event-emitter-target";
import { DefaultOptions } from "../src/default_Options";
import {
    default_count_of_ants,
    default_alpha,
    default_beta,
    default_max_coefficient_of_pheromone_diffusion,
    default_max_results_of_k_opt,
    default_min_coefficient_of_pheromone_diffusion,
    default_Pheromone_Increase_Coefficient_of_Non_Optimal_Paths,
    default_pheromone_intensity_Q,
    default_pheromone_volatility_coefficient_R1,
    default_max_results_of_2_opt,
} from "../src/default_Options";
import { TSPRunnerOptions } from "../src/TSPRunnerOptions";
import { assert_number } from "../test/assert_number";
import { assert_true } from "../test/assert_true";
import { calc_pheromone_volatility_coefficient_R1 } from "./calc_pheromone_volatility_coefficient_R1";
import { calc_pheromone_volatility_coefficient_R2 } from "./calc_pheromone_volatility_coefficient_R2";

import { createEventPair } from "./createEventPair";
import { createPheromoneStore } from "./createPheromoneStore";
import { DataOfBestChange } from "./DataOfBestChange";

import { DataOfFinishOneIteration } from "./DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";
import { EachIterationHandler } from "./EachIterationHandler";

import { EachRouteGenerator } from "./EachRouteGenerator";
import { float64equal } from "./float64equal";
import { generateUniqueArrayOfCircularPath } from "./generateUniqueArrayOfCircularPath";
import { PureDataOfFinishOneRoute } from "./PureDataOfFinishOneRoute";
import { update_weight_of_opt } from "./update_weight_of_opt";

import { TSP_Runner } from "./TSP_Runner";
import { SharedOptions } from "./SharedOptions";
import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { create_collection_of_latest_routes } from "../collections/collection-of-latest-routes";
import { create_collection_of_optimal_routes } from "../collections/collection-of-optimal-routes";
import { GreedyRoutesGenerator } from "./GreedyRoutesGenerator";
import { DataOfFinishGreedyIteration } from "./DataOfFinishGreedyIteration";
export function createTSPrunner(input: TSPRunnerOptions): TSP_Runner {
    const {
        max_results_of_2_opt = default_max_results_of_2_opt,
        coefficient_of_pheromone_Increase_Non_Optimal_Paths = default_Pheromone_Increase_Coefficient_of_Non_Optimal_Paths,
        min_coefficient_of_pheromone_diffusion = default_min_coefficient_of_pheromone_diffusion,

        max_coefficient_of_pheromone_diffusion = default_max_coefficient_of_pheromone_diffusion,

        max_results_of_k_opt = default_max_results_of_k_opt,
        pheromone_intensity_Q = default_pheromone_intensity_Q,
        node_coordinates,
        alpha_zero = default_alpha,
        beta_zero = default_beta,
        // searchloopcountratio = default_searchloopcountratio,
        count_of_ants = default_count_of_ants,
        pheromone_volatility_coefficient_R1 = default_pheromone_volatility_coefficient_R1,
    } = input;

    const options: Required<TSPRunnerOptions> = Object.fromEntries(
        uniq([...Object.keys(DefaultOptions), ...Object.keys(input)]).map(
            (k) => [k, Reflect.get(input, k) ?? Reflect.get(DefaultOptions, k)]
        )
    ) as Required<TSPRunnerOptions>;

    assert_number(count_of_ants);
    assert_true(count_of_ants >= 2);

    //由局部信息素挥发率决定全局信息素挥发率
    const pheromone_volatility_coefficient_R2 =
        //  rest?.pheromone_volatility_coefficient_R2 ??
        calc_pheromone_volatility_coefficient_R2(
            pheromone_volatility_coefficient_R1 ??
                default_pheromone_volatility_coefficient_R1,
            count_of_ants
        );

    assert_true(
        float64equal(
            pheromone_volatility_coefficient_R1,
            calc_pheromone_volatility_coefficient_R1(
                pheromone_volatility_coefficient_R2,
                count_of_ants
            )
        )
    );
    const {
        number_of_city_of_large,
        max_size_of_collection_of_latest_routes,
        max_size_of_collection_of_optimal_routes,
    } = options;
    const count_of_nodes = node_coordinates.length;
    const is_count_not_large = count_of_nodes <= number_of_city_of_large;
    const collection_of_latest_routes = is_count_not_large
        ? undefined
        : create_collection_of_latest_routes(
              max_size_of_collection_of_latest_routes
          );
    // if (!is_count_not_large) {
    //     console.log(collection_of_latest_routes);
    // }
    const collection_of_optimal_routes = is_count_not_large
        ? undefined
        : create_collection_of_optimal_routes(
              max_size_of_collection_of_optimal_routes
          );
    // if (!is_count_not_large) {
    //     console.log(collection_of_optimal_routes);
    // }
    let lastrandomselectionprobability = 0;
    let totaltimems = 0;

    const pheromoneStore = new Proxy(createPheromoneStore(count_of_nodes), {
        get(target, key) {
            if (key === "get") {
                return (row: number, column: number) => {
                    return getPheromone(target, row, column);
                };
            }

            return Reflect.get(target, key);
        },
    }) as MatrixSymmetry<number>;

    let PheromoneZero = 0;
    function setPheromoneZero(value: number) {
        PheromoneZero = value;
    }
    function getPheromone(
        pheromoneStore: MatrixSymmetry<number>,
        row: number,
        column: number
    ): number {
        return pheromoneStore.get(row, column) || PheromoneZero;
    }

    let current_search_count = 0;
    let global_best_route: number[] = [];

    /* "找到最优解的耗时秒" */
    let time_of_best_ms = 0;
    /* 最优解的路径次数 */
    let search_count_of_best = 0;
    let globalbestlength: number = Infinity;
    /* 一次迭代的花费时间 */
    let time_ms_of_one_iteration: number = 0;
    /* 一次迭代的路径和长度 */
    const routes_and_lengths_of_one_iteration: {
        route: number[];
        total_length: number;
    }[] = [];

    const get_total_time_ms = () => {
        return totaltimems;
    };

    const get_current_search_count = () => {
        return current_search_count;
    };
    const set_best_length = (bestlength: number) => {
        if (bestlength < globalbestlength) {
            globalbestlength = bestlength;
            /* "找到最优解的耗时秒" */
            time_of_best_ms = totaltimems;
            search_count_of_best = current_search_count + 1;
            /* 这样不行 */
            // emit_best_change({
            //     current_search_count,
            //     current_iterations: get_number_of_iterations(),
            //     total_time_ms: totaltimems,
            //     time_of_best_ms,
            //     global_best_route,
            //     globalbestlength: globalbestlength,
            // });
        }
    };
    const set_best_route = (route: number[]) => {
        /* 重新排序一下好看 */
        global_best_route = generateUniqueArrayOfCircularPath(route);
    };

    const get_best_route = () => {
        return global_best_route;
    };

    const get_best_length = () => {
        return globalbestlength;
    };

    // let numberofiterations = 0;
    const get_number_of_iterations = () => {
        return current_search_count / count_of_ants;
    };

    const emitter = EventEmitterTargetClass({ sync: true });
    const { on: on_best_change, emit: emit_best_change } =
        createEventPair<DataOfBestChange>(emitter);
    const { on: on_finish_one_route, emit: inner_emit_finish_one_route } =
        createEventPair<DataOfFinishOneRoute>(emitter);
    const emit_finish_one_route = (data: PureDataOfFinishOneRoute) => {
        totaltimems += data.time_ms_of_one_route;
        current_search_count++;
        emit_best_change({
            search_count_of_best,
            current_search_count,
            current_iterations: get_number_of_iterations(),
            total_time_ms: totaltimems,
            time_of_best_ms,
            global_best_route,
            globalbestlength: globalbestlength,
        });
        inner_emit_finish_one_route({
            ...data,
            current_search_count,

            total_time_ms: totaltimems,
            globalbestlength,
        });
    };
    const {
        on: on_finish_one_iteration,
        emit: inner_emit_finish_one_iteration,
    } = createEventPair<DataOfFinishOneIteration>(emitter);

    const emit_finish_one_iteration = (
        data: Omit<
            DataOfFinishOneIteration,
            "current_iterations" | "globalbestlength"
        >
    ) => {
        // numberofiterations++;
        // emit_best_change({
        //     current_search_count,
        //     current_iterations: get_number_of_iterations(),
        //     total_time_ms: totaltimems,
        //     time_of_best_ms,
        //     global_best_route,
        //     globalbestlength: globalbestlength,
        // });
        inner_emit_finish_one_iteration({
            ...data,
            globalbestlength: globalbestlength,
            current_iterations: get_number_of_iterations(),
        });
    };

    const runOneIteration = async () => {
        for (let i = 0; i < count_of_ants; i++) {
            await runOneRoute();
        }
    };
    const runIterations = async (iterations: number) => {
        assert_number(iterations);
        assert_true(iterations > 0);

        for (let i = 0; i < iterations; i++) {
            await runOneIteration();
        }
    };
    let weight_of_opt_best = 1;
    let weight_of_opt_current = 1;

    function get_probability_of_opt_best(): number {
        return (
            weight_of_opt_best / (weight_of_opt_best + weight_of_opt_current)
        );
    }
    function get_probability_of_opt_current(): number {
        return (
            weight_of_opt_current / (weight_of_opt_best + weight_of_opt_current)
        );
    }
    function get_weight_of_opt_best() {
        return weight_of_opt_best;
    }
    function set_weight_of_opt_best(value: number) {
        weight_of_opt_best = value;
    }
    // },
    // weight_of_opt_current: {
    function get_weight_of_opt_current() {
        return weight_of_opt_current;
    }
    function set_weight_of_opt_current(value: number) {
        weight_of_opt_current = value;
    }
    function onRouteCreated(route: number[], length: number) {
        if (collection_of_optimal_routes) {
            collection_of_optimal_routes.add(route, length);
        }
        if (collection_of_latest_routes) {
            collection_of_latest_routes.add(route);
        }
    }
     const {
         on: on_finish_greedy_iteration,
         emit: emit_finish_greedy_iteration,
     } = createEventPair<DataOfFinishGreedyIteration>(emitter);
    async function runOneRoute() {
        if (current_search_count === 0) {
            // 并行计算贪心路径 共 max_routes_of_greedy 条
            await GreedyRoutesGenerator({
                shared,
                get_best_route,
                get_best_length,
                set_best_length,
                set_best_route,
                onRouteCreated,
                emit_finish_one_route,
                get_probability_of_opt_best,
                get_probability_of_opt_current,
                setPheromoneZero,
                count_of_nodes,
            });
        }
        const starttime_of_one_route = Number(new Date());
        const {
            route,
            total_length,
            // weight_of_opt_best,
            // weight_of_opt_current,
        } = EachRouteGenerator({
            ...shared,
            current_search_count,
            get_probability_of_opt_best,
            count_of_nodes,
            node_coordinates,
            pheromoneStore,
            // setPheromone,
            // getPheromone,
            alpha_zero,
            beta_zero,
            lastrandomselectionprobability,
            max_results_of_k_opt,
            get_best_length,
            get_best_route,
            pheromone_volatility_coefficient_R1,
            pheromone_intensity_Q,
            set_best_length,
            set_best_route,
            setPheromoneZero,
        });
        const endtime_of_one_route = Number(new Date());
        onRouteCreated(route, total_length);
        routes_and_lengths_of_one_iteration.push({ route, total_length });
        const time_ms_of_one_route =
            endtime_of_one_route - starttime_of_one_route;
        time_ms_of_one_iteration += time_ms_of_one_route;
        emit_finish_one_route({
            probability_of_opt_best: get_probability_of_opt_best(),
            probability_of_opt_current: get_probability_of_opt_current(),
            // weight_of_opt_best,
            // weight_of_opt_current,
            // way_of_construct,
            time_ms_of_one_route: time_ms_of_one_route,
            route,
            total_length,
        });
        if (routes_and_lengths_of_one_iteration.length === count_of_ants) {
            const starttime_of_process_iteration = Number(new Date());
            //一轮搜索结束

            //后处理时间要加上

            const {
                coefficient_of_diversity_increase,
                // locally_optimized_length,
                // relative_deviation_from_optimal,
                nextrandomselectionprobability,
                //   routesandlengths,
                pheromoneDiffusionProbability,
                population_relative_information_entropy,
                // ispheromoneDiffusion,
                optimallengthofthisround,
                optimalrouteofthisround,
            } = EachIterationHandler({
                ...shared,
                coefficient_of_pheromone_Increase_Non_Optimal_Paths,
                min_coefficient_of_pheromone_diffusion,

                max_coefficient_of_pheromone_diffusion,

                // pathTabooList,
                // max_results_of_k_opt,
                routesandlengths: routes_and_lengths_of_one_iteration,
                // emit_finish_one_route,
                // set_best_route,
                // set_best_length,
                get_best_length: get_best_length,
                get_best_route: get_best_route,
                // pathTabooList,
                pheromoneStore,
                node_coordinates,
                // count_of_ants,
                // alpha_zero,
                // beta_zero,
                // lastrandomselectionprobability,
                // searchloopcountratio,
                pheromone_volatility_coefficient_R2,
                // pheromone_volatility_coefficient_R1,
                pheromone_intensity_Q,
                // getPheromone,
                // setPheromone,
            });

            //更新局部优化的系数
            update_weight_of_opt({
                get_weight_of_opt_best,
                get_weight_of_opt_current,
                set_weight_of_opt_best,
                coefficient_of_diversity_increase,
                set_weight_of_opt_current,
            });
            const endtime_of_process_iteration = Number(new Date());
            //后处理时间要加上
            const timems_of_process_iteration =
                endtime_of_process_iteration - starttime_of_process_iteration;
            time_ms_of_one_iteration += timems_of_process_iteration;
            // emit_best_change({
            //     current_search_count,
            //     current_iterations: get_number_of_iterations(),
            //     total_time_ms: totaltimems,
            //     time_of_best_ms,
            //     global_best_route: get_best_route(),
            //     globalbestlength: get_best_length(),
            // });
            totaltimems += timems_of_process_iteration;
            emit_finish_one_iteration({
                // globalbestlength: globalbestlength,
                // time_of_best_ms,

                // locally_optimized_length,

                // relative_deviation_from_optimal,
                // current_iterations: get_number_of_iterations(),
                pheromoneDiffusionProbability,
                optimallengthofthisround,
                optimalrouteofthisround,
                population_relative_information_entropy,
                // ispheromoneDiffusion,
                randomselectionprobability: lastrandomselectionprobability,
                time_ms_of_one_iteration: time_ms_of_one_iteration,
            });
            time_ms_of_one_iteration = 0;
            lastrandomselectionprobability = nextrandomselectionprobability;
            routes_and_lengths_of_one_iteration.length = 0;
        }

        /* else {
            // const endtime = Number(new Date());
            //后处理时间要加上
            // const timems = endtime - starttime;
            time_ms_of_one_iteration += timems;
            totaltimems += timems;
        } */
    }
    const runRoutes = async (count: number) => {
        assert_number(count);
        assert_true(count > 0);

        for (let i = 0; i < count; i++) {
            await runOneRoute();
        }
    };
    function get_search_count_of_best() {
        return search_count_of_best;
    }
    function get_time_of_best() {
        return time_of_best_ms;
    }
    function get_random_selection_probability() {
        return lastrandomselectionprobability;
    }
    const get_neighbors_from_optimal_routes_and_latest_routes =
        create_get_neighbors_from_optimal_routes_and_latest_routes(
            collection_of_latest_routes,
            collection_of_optimal_routes
        );
    const shared = getShared();
    const result: TSP_Runner = {
        ...shared,
        max_results_of_2_opt,
        // getPheromone,
        // setPheromone,
        max_results_of_k_opt,
        coefficient_of_pheromone_Increase_Non_Optimal_Paths,
        min_coefficient_of_pheromone_diffusion,

        max_coefficient_of_pheromone_diffusion,
        get_search_count_of_best,
        get_time_of_best,
        get_random_selection_probability,
        count_of_nodes,
        runRoutes,
        on_best_change,
        runOneRoute,
        // onDataChange,
        pheromone_volatility_coefficient_R2,
        pheromone_volatility_coefficient_R1,
        pheromone_intensity_Q,
        get_total_time_ms,
        // on_finish_all_iterations,
        runIterations,
        on_finish_one_iteration: on_finish_one_iteration,
        on_finish_one_route: on_finish_one_route,
        //    getlengthofstagnant,
        get_number_of_iterations,
        //   getnumberofstagnant,
        get_best_length,
        get_best_route,
        get_current_search_count,
        // pheromoneStore,/
        beta_zero,
        //    maxnumberofstagnant,
        node_coordinates,
        alpha_zero,
        // searchloopcountratio,
        count_of_ants,
        //    maxnumberofiterations,
        // pathTabooList,
        [Symbol.toStringTag]: "TSPRunner",
        runOneIteration,
    };
    // console.log("runner", result);

    function getShared(): SharedOptions {
        return {
            ...options,
            get_neighbors_from_optimal_routes_and_latest_routes,
            get_random_selection_probability,
            get_search_count_of_best,
            pheromone_volatility_coefficient_R2,
            set_weight_of_opt_current,
            get_weight_of_opt_current,
            set_weight_of_opt_best,
            get_weight_of_opt_best,
            get_probability_of_opt_current,
            get_probability_of_opt_best,
            get_best_route,
            get_best_length,
            set_best_route,
            set_best_length,
            get_current_search_count,
            pheromoneStore,
            // setPheromone,
            // getPheromone,
            setPheromoneZero,
            count_of_nodes,
        };
    }
    return result;
}
