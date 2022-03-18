import EventEmitterTargetClass from "@masx200/event-emitter-target";
import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
// import { createpathTabooList } from "../pathTabooList/createPathTabooList";
// import { PathTabooList } from "../pathTabooList/PathTabooList";
// import { isDataOfFinishOneIteration } from "./isDataOfFinishOneIteration";
// import { isDataOfFinishOneRoute } from "./isDataOfFinishOneRoute";
import {
    defaultnumberofants,
    default_alpha,
    default_beta,
    default_global_pheromone_volatilization_rate,
    default_local_pheromone_volatilization_rate,
    default_max_results_of_k_opt,
    default_pheromoneintensityQ,
    // default_searchloopcountratio,
} from "../src/defaultnumberofants";
import { assertnumber } from "../test/assertnumber";
import { asserttrue } from "../test/asserttrue";
import { handler_after_one_iteration_over } from "./handler_after_one_iteration_over";
import { construct_one_route_all } from "./construct_one_route_all";
// import { construct_routes_of_one_iteration } from "./construct_routes_of_one_iteration";
import { createEventPair } from "./createEventPair";
import { createPheromonestore } from "./createPheromonestore";
import { DataOfBestChange } from "./DataOfBestChange";
// import { DataOfGlobalBest } from "./DataOfGlobalBest";
import { DataOfFinishOneIteration } from "./DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";
import { float64equal } from "./float64equal";
import { Nodecoordinates } from "./Nodecoordinates";
import { PureDataOfFinishOneRoute } from "./PureDataOfFinishOneRoute";
// import { WayOfConstruct } from "./WayOfConstruct";
export interface TSPRunner {
    on_best_change: (callback: (data: DataOfBestChange) => void) => void;
    runOneRoute: () => void;
    runOneIteration: () => void;

    gettotaltimems: () => number;

    runIterations: (iterations: number) => void;
    on_finish_one_iteration: (
        callback: (data: DataOfFinishOneIteration) => void
    ) => void;
    on_finish_one_route: (
        callback: (data: DataOfFinishOneRoute) => void
    ) => void;

    getnumberofiterations: () => number;

    getbestlength: () => number;
    getbestroute: () => number[];
    getcurrent_search_count: () => number;
    pheromonestore: MatrixSymmetry<number>;

    // pathTabooList: PathTabooList<number>;
    [Symbol.toStringTag]: string;
    pheromonevolatilitycoefficientR2: number;
    pheromonevolatilitycoefficientR1: number;
    pheromoneintensityQ: number;
    nodecoordinates: Nodecoordinates;
    alphazero: number;
    betazero: number;
    // searchloopcountratio: number;
    numberofants: number;
}

export function createTSPrunner({
    max_results_of_k_opt = default_max_results_of_k_opt,
    pheromoneintensityQ = default_pheromoneintensityQ,
    nodecoordinates,
    alphazero = default_alpha,
    betazero = default_beta,
    // searchloopcountratio = default_searchloopcountratio,
    numberofants = defaultnumberofants,

    ...rest
}: {
    max_results_of_k_opt?: number;
    pheromonevolatilitycoefficientR1?: number;
    pheromonevolatilitycoefficientR2?: number;
    pheromoneintensityQ?: number;
    nodecoordinates: Nodecoordinates;
    alphazero?: number;
    betazero?: number;
    // searchloopcountratio?: number;
    numberofants?: number;
}): TSPRunner {
    assertnumber(numberofants);
    asserttrue(numberofants >= 2);

    const pheromonevolatilitycoefficientR1 =
        rest?.pheromonevolatilitycoefficientR1 ??
        1 -
            Math.pow(
                1 -
                    (rest?.pheromonevolatilitycoefficientR2 ??
                        default_global_pheromone_volatilization_rate),
                1 / numberofants
            );

    const pheromonevolatilitycoefficientR2 =
        rest?.pheromonevolatilitycoefficientR2 ??
        1 -
            Math.pow(
                1 -
                    (rest?.pheromonevolatilitycoefficientR1 ??
                        default_local_pheromone_volatilization_rate),
                numberofants
            );

    /*  const pheromonevolatilitycoefficientR1 =
        1 - Math.pow(1 - pheromonevolatilitycoefficientR2, 1 / numberofants);
*/
    console.log("runner data", {
        numberofants,
        pheromonevolatilitycoefficientR1,
        pheromonevolatilitycoefficientR2,
        pheromoneintensityQ,
    });
    asserttrue(
        float64equal(
            pheromonevolatilitycoefficientR1,
            1 - Math.pow(1 - pheromonevolatilitycoefficientR2, 1 / numberofants)
        )
    );

    let lastrandomselectionprobability = 0;
    let totaltimems = 0;
    const gettotaltimems = () => {
        return totaltimems;
    };

    const countofnodes = nodecoordinates.length;
    // const pathTabooList = createpathTabooList(countofnodes);
    const pheromonestore = createPheromonestore(countofnodes);
    let current_search_count = 0;
    const getcurrent_search_count = () => {
        return current_search_count;
    };
    const setbestlength = (bestlength: number) => {
        if (bestlength < globalbestlength) {
            globalbestlength = bestlength;
            /* "找到最优解的耗时秒" */
            time_of_best_ms = totaltimems;

            /* 这样不行 */
            // emit_best_change({
            //     current_search_count,
            //     current_iterations: getnumberofiterations(),
            //     total_time_ms: totaltimems,
            //     time_of_best_ms,
            //     globalbestroute,
            //     globalbestlength: globalbestlength,
            // });
        }
    };
    const setbestroute = (route: number[]) => {
        globalbestroute = route;
    };
    let globalbestroute: number[] = [];
    const getbestroute = () => {
        return globalbestroute;
    };
    /* "找到最优解的耗时秒" */
    let time_of_best_ms = 0;
    let globalbestlength: number = Infinity;
    const getbestlength = () => {
        return globalbestlength;
    };

    let numberofiterations = 0;
    const getnumberofiterations = () => {
        return numberofiterations;
    };

    const emitter = EventEmitterTargetClass();
    const { on: on_best_change, emit: emit_best_change } =
        createEventPair<DataOfBestChange>(emitter);
    const { on: on_finish_one_route, emit: inner_emit_finish_one_route } =
        createEventPair<DataOfFinishOneRoute>(emitter);
    const emit_finish_one_route = (data: PureDataOfFinishOneRoute) => {
        totaltimems += data.time_ms_of_one_route;
        current_search_count++;
        emit_best_change({
            current_search_count,
            current_iterations: getnumberofiterations(),
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
        numberofiterations++;
        emit_best_change({
            current_search_count,
            current_iterations: getnumberofiterations(),
            total_time_ms: totaltimems,
            time_of_best_ms,
            globalbestroute,
            globalbestlength: globalbestlength,
        });
        inner_emit_finish_one_iteration({
            ...data,
            globalbestlength: globalbestlength,
            current_iterations: numberofiterations,
        });
    };

    const runOneIteration = () => {
        for (let i = 0; i < numberofants; i++) {
            runOneRoute();
        }
    };
    const runIterations = (iterations: number) => {
        assertnumber(iterations);
        asserttrue(iterations > 0);

        for (let i = 0; i < iterations; i++) {
            runOneIteration();
        }
    };
    const routesandlengths: {
        route: number[];
        totallength: number;
    }[] = [];
    let time_ms_of_one_iteration: number = 0;
    function runOneRoute() {
        const starttime_of_one_route = Number(new Date());
        const {
            route,
            totallength,
        }: // way_of_construct,
        {
            route: number[];
            totallength: number;
            // way_of_construct: WayOfConstruct;
        } = construct_one_route_all({
            current_search_count,
            // pathTabooList,
            nodecoordinates,
            countofnodes,
            setbestlength,
            setbestroute,
            pheromonestore,
            getbestroute,
            max_results_of_k_opt,
            getbestlength,
            // searchloopcountratio,
            pheromoneintensityQ,
            pheromonevolatilitycoefficientR1,
            alphazero,
            betazero,
            lastrandomselectionprobability,
        });
        //todo k-opt
        //todo 2-opt 去除交叉点循环

        const endtime_of_one_route = Number(new Date());
        routesandlengths.push({ route, totallength });
        const time_ms_of_one_route =
            endtime_of_one_route - starttime_of_one_route;
        time_ms_of_one_iteration += time_ms_of_one_route;
        emit_finish_one_route({
            // way_of_construct,
            time_ms_of_one_route: time_ms_of_one_route,
            route,
            totallength,
        });
        if (routesandlengths.length === numberofants) {
            const starttime_of_process_iteration = Number(new Date());
            //一轮搜索结束

            //后处理时间要加上

            const {
                // locally_optimized_length,
                // relative_deviation_from_optimal,
                nextrandomselectionprobability,
                //   routesandlengths,
                pheromoneDiffusionProbability,
                population_relative_information_entropy,
                ispheromoneDiffusion,
                optimallengthofthisround,
                optimalrouteofthisround,
            } = handler_after_one_iteration_over({
                // pathTabooList,
                max_results_of_k_opt,
                routesandlengths,
                // emit_finish_one_route,
                setbestroute,
                setbestlength,
                getbestlength: getbestlength,
                getbestroute: getbestroute,
                // pathTabooList,
                pheromonestore,
                nodecoordinates,
                // numberofants,
                // alphazero,
                // betazero,
                // lastrandomselectionprobability,
                // searchloopcountratio,
                pheromonevolatilitycoefficientR2,
                // pheromonevolatilitycoefficientR1,
                pheromoneintensityQ,
            });
            const endtime_of_process_iteration = Number(new Date());
            //后处理时间要加上
            const timems_of_process_iteration =
                endtime_of_process_iteration - starttime_of_process_iteration;
            time_ms_of_one_iteration += timems_of_process_iteration;
            // emit_best_change({
            //     current_search_count,
            //     current_iterations: getnumberofiterations(),
            //     total_time_ms: totaltimems,
            //     time_of_best_ms,
            //     globalbestroute: getbestroute(),
            //     globalbestlength: getbestlength(),
            // });
            totaltimems += timems_of_process_iteration;
            emit_finish_one_iteration({
                // globalbestlength: globalbestlength,
                // time_of_best_ms,

                // locally_optimized_length,

                // relative_deviation_from_optimal,
                // current_iterations: getnumberofiterations(),
                pheromoneDiffusionProbability,
                optimallengthofthisround,
                optimalrouteofthisround,
                population_relative_information_entropy,
                ispheromoneDiffusion,
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
    const result: TSPRunner = {
        on_best_change,
        runOneRoute,
        // onDataChange,
        pheromonevolatilitycoefficientR2,
        pheromonevolatilitycoefficientR1,
        pheromoneintensityQ,
        gettotaltimems,
        // on_finish_all_iterations,
        runIterations,
        on_finish_one_iteration: on_finish_one_iteration,
        on_finish_one_route: on_finish_one_route,
        //    getlengthofstagnant,
        getnumberofiterations,
        //   getnumberofstagnant,
        getbestlength,
        getbestroute,
        getcurrent_search_count,
        pheromonestore,
        betazero,
        //    maxnumberofstagnant,
        nodecoordinates,
        alphazero,
        // searchloopcountratio,
        numberofants,
        //    maxnumberofiterations,
        // pathTabooList,
        [Symbol.toStringTag]: "TSPRunner",
        runOneIteration,
    };
    console.log("runner", result);
    return result;
}
