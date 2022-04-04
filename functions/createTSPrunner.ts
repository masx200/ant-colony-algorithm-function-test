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
import { assertnumber } from "../test/assertnumber";
import { assert_true } from "../test/assert_true";
import { calc_pheromone_volatility_coefficient_R1 } from "./calc_pheromone_volatility_coefficient_R1";
import { calc_pheromone_volatility_coefficient_R2 } from "./calc_pheromone_volatility_coefficient_R2";

import { createEventPair } from "./createEventPair";
import { createPheromoneStore } from "./createPheromoneStore";
import { DataOfBestChange } from "./DataOfBestChange";

import { DataOfFinishOneIteration } from "./DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";
import { EachIterationHandler } from "./EachIterationHandler";

import { EachRouteGenerator } from "./createEachRouteGenerator";
import { float64equal } from "./float64equal";
import { generateUniqueArrayOfCircularPath } from "./generateUniqueArrayOfCircularPath";
import { PureDataOfFinishOneRoute } from "./PureDataOfFinishOneRoute";
import { update_weight_of_opt } from "./update_weight_of_opt";

import { TSP_Runner } from "./TSP_Runner";
import { SharedOptions } from "./SharedOptions";
import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
export function createTSPrunner(input: TSPRunnerOptions): TSP_Runner {
    const {
        cross_Point_Coefficient_of_Non_Optimal_Paths,
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

    const options = Object.assign(DefaultOptions, {
        cross_Point_Coefficient_of_Non_Optimal_Paths,
        max_results_of_2_opt,
        coefficient_of_pheromone_Increase_Non_Optimal_Paths,
        min_coefficient_of_pheromone_diffusion,
        max_coefficient_of_pheromone_diffusion,

        max_results_of_k_opt,
        pheromone_volatility_coefficient_R1,
        //   pheromone_volatility_coefficient_R2       ,
        pheromone_intensity_Q,
        node_coordinates,
        alpha_zero,
        beta_zero,
        count_of_ants,
    });
    assertnumber(count_of_ants);
    assert_true(count_of_ants >= 2);

    // const pheromone_volatility_coefficient_R1 =
    //     rest?.pheromone_volatility_coefficient_R1 ??
    //     default_pheromone_volatility_coefficient_R1;
    /*  1 -
            Math.pow(
                1 -
                    (rest?.pheromone_volatility_coefficient_R2 ??
                        default_global_pheromone_volatilization_rate),
                1 / count_of_ants
            );
*/

    //由局部信息素挥发率决定全局信息素挥发率
    const pheromone_volatility_coefficient_R2 =
        //  rest?.pheromone_volatility_coefficient_R2 ??
        calc_pheromone_volatility_coefficient_R2(
            pheromone_volatility_coefficient_R1 ??
                default_pheromone_volatility_coefficient_R1,
            count_of_ants
        );

    /*  const pheromone_volatility_coefficient_R1 =
        1 - Math.pow(1 - pheromone_volatility_coefficient_R2, 1 / count_of_ants);
*/
    // console.log("runner data", {
    //     count_of_ants,
    //     pheromone_volatility_coefficient_R1,
    //     pheromone_volatility_coefficient_R2,
    //     pheromone_intensity_Q,
    // });
    assert_true(
        float64equal(
            pheromone_volatility_coefficient_R1,
            calc_pheromone_volatility_coefficient_R1(
                pheromone_volatility_coefficient_R2,
                count_of_ants
            )
        )
    );

    let lastrandomselectionprobability = 0;
    let totaltimems = 0;
    const count_of_nodes = node_coordinates.length;
    // const pathTabooList = createpathTabooList(count_of_nodes);
    const pheromoneStore = new Proxy(createPheromoneStore(count_of_nodes), {
        get(target, key) {
            if (key === "get") {
                return (row: number, column: number) => {
                    return getPheromone(target, row, column);
                };
            }
            // if (key === "set") {

            // }
            return Reflect.get(target, key);
        },
        // get: { value: getPheromone },
        // set: { value: setPheromone },
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
    // function setPheromone(
    //     pheromoneStore: MatrixSymmetry<number>,
    //     row: number,
    //     column: number,
    //     value: number
    // ): void {
    //     return pheromoneStore.set(row, column, value);
    // }
    let current_search_count = 0;
    let globalbestroute: number[] = [];

    /* "找到最优解的耗时秒" */
    let time_of_best_ms = 0;
    /* 最优解的路径次数 */
    let search_count_of_best = 0;
    let globalbestlength: number = Infinity;
    /* 一次迭代的花费时间 */
    let time_ms_of_one_iteration: number = 0;
    /* 一次迭代的路径和长度 */
    const routesandlengths: {
        route: number[];
        totallength: number;
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
            //     globalbestroute,
            //     globalbestlength: globalbestlength,
            // });
        }
    };
    const set_best_route = (route: number[]) => {
        /* 重新排序一下好看 */
        globalbestroute = generateUniqueArrayOfCircularPath(route);
    };

    const get_best_route = () => {
        return globalbestroute;
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
            globalbestroute,
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
        //     globalbestroute,
        //     globalbestlength: globalbestlength,
        // });
        inner_emit_finish_one_iteration({
            ...data,
            globalbestlength: globalbestlength,
            current_iterations: get_number_of_iterations(),
        });
    };

    const runOneIteration = () => {
        for (let i = 0; i < count_of_ants; i++) {
            runOneRoute();
        }
    };
    const runIterations = (iterations: number) => {
        assertnumber(iterations);
        assert_true(iterations > 0);

        for (let i = 0; i < iterations; i++) {
            runOneIteration();
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
    // const {
    //     // get_probability_of_opt_best,
    //     // get_probability_of_opt_current,
    //     EachRouteGenerator,
    //     // set_weight_of_opt_best,
    //     // set_weight_of_opt_current,
    //     // get_weight_of_opt_best,
    //     // get_weight_of_opt_current,
    // } = createEachRouteGenerator(
    //     // {
    //     // ...options,
    //     // max_results_of_2_opt,
    //     // coefficient_of_pheromone_Increase_Non_Optimal_Paths,
    //     // }
    // );
    function runOneRoute() {
        const starttime_of_one_route = Number(new Date());
        const {
            route,
            totallength,
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
        routesandlengths.push({ route, totallength });
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
            totallength,
        });
        if (routesandlengths.length === count_of_ants) {
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
                routesandlengths,
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
            //     globalbestroute: get_best_route(),
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
            routesandlengths.length = 0;
        }

        /* else {
            // const endtime = Number(new Date());
            //后处理时间要加上
            // const timems = endtime - starttime;
            time_ms_of_one_iteration += timems;
            totaltimems += timems;
        } */
    }
    const runRoutes = (count: number) => {
        assertnumber(count);
        assert_true(count > 0);

        for (let i = 0; i < count; i++) {
            runOneRoute();
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
