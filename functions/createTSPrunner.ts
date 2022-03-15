import EventEmitterTargetClass from "@masx200/event-emitter-target";
import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { createpathTabooList } from "../pathTabooList/createPathTabooList";
import { PathTabooList } from "../pathTabooList/PathTabooList";
// import { isDataOfFinishOneIteration } from "./isDataOfFinishOneIteration";
// import { isDataOfFinishOneRoute } from "./isDataOfFinishOneRoute";
import {
    defaultnumberofants,
    default_local_pheromone_volatilization_rate,
} from "../src/defaultnumberofants";
import { assertnumber } from "../test/assertnumber";
import { asserttrue } from "../test/asserttrue";
import { adaptiveTabooSingleIterateTSPSearchSolve } from "./adaptiveTabooSingleIterateTSPSearchSolve";
import { createEventPair } from "./createEventPair";
import { createPheromonestore } from "./createPheromonestore";
// import { DataOfGlobalBest } from "./DataOfGlobalBest";
import { DataOfFinishOneIteration } from "./DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";
import { float64equal } from "./float64equal";
import { greedy_first_search_route } from "./greedy_first_search_route";
import { Nodecoordinates } from "./Nodecoordinates";
import { PureDataOfFinishOneRoute } from "./PureDataOfFinishOneRoute";

export interface TSPRunner {
    runOneRoute: () => void;
    runOneIteration: () => void;
    // onDataChange: (callback: (data: DataOfGlobalBest) => void) => void;
    gettotaltimems: () => number;
    // on_finish_all_iterations: (callback: (data: undefined) => void) => void;
    runIterations: (iterations: number) => void;
    on_finish_one_iteration: (
        callback: (data: DataOfFinishOneIteration) => void
    ) => void;
    on_finish_one_route: (
        callback: (data: DataOfFinishOneRoute) => void
    ) => void;
    //  getlengthofstagnant: () => number;
    getnumberofiterations: () => number;
    //  getnumberofstagnant: () => number;
    getglobalbestlength: () => number;
    getglobalbestroute: () => number[];
    getcurrent_search_count: () => number;
    pheromonestore: MatrixSymmetry<number>;

    pathTabooList: PathTabooList<number>;
    [Symbol.toStringTag]: string;
    pheromonevolatilitycoefficientR2: number;
    pheromonevolatilitycoefficientR1: number;
    pheromoneintensityQ: number;
    nodecoordinates: Nodecoordinates;
    alphazero: number;
    betazero: number;
    searchloopcountratio: number;
    numberofants: number;
    //   maxnumberofiterations: number;
    //  maxnumberofstagnant: number;
}

export function createTSPrunner({
    pheromoneintensityQ = 1,
    nodecoordinates,
    alphazero = 1,
    betazero = 5,
    searchloopcountratio = 30,
    numberofants = defaultnumberofants,
    //  maxnumberofiterations = 1000,
    //  maxnumberofstagnant = 30,
    ...rest
}: {
    pheromonevolatilitycoefficientR1?: number;
    pheromonevolatilitycoefficientR2?: number;
    pheromoneintensityQ?: number;
    nodecoordinates: Nodecoordinates;
    alphazero?: number;
    betazero?: number;
    searchloopcountratio?: number;
    numberofants?: number;
    //  maxnumberofiterations?: number;
    // maxnumberofstagnant?: number;
}): TSPRunner {
    assertnumber(numberofants);
    asserttrue(numberofants >= 2);

    const pheromonevolatilitycoefficientR1 =
        rest?.pheromonevolatilitycoefficientR1 ??
        1 -
            Math.pow(
                1 - (rest?.pheromonevolatilitycoefficientR2 ?? 0.1),
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
    console.log({
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
    const pathTabooList = createpathTabooList(countofnodes);
    const pheromonestore = createPheromonestore(countofnodes);
    let current_search_count = 0;
    const getcurrent_search_count = () => {
        return current_search_count;
    };
    const setbestlength = (bestlength: number) => {
        globalbestlength = bestlength;
    };
    const setbestroute = (route: number[]) => {
        globalbestroute = route;
    };
    let globalbestroute: number[] = [];
    const getglobalbestroute = () => {
        return globalbestroute;
    };
    let globalbestlength: number = Infinity;
    const getglobalbestlength = () => {
        return globalbestlength;
    };
    //   let numberofstagnant = 0;
    //  const getnumberofstagnant = () => {
    //      return numberofstagnant;
    //  };
    let numberofiterations = 0;
    const getnumberofiterations = () => {
        return numberofiterations;
    };
    //let lengthofstagnant = Infinity;
    //const getlengthofstagnant = () => {
    //     return lengthofstagnant;
    //   };
    const emitter = EventEmitterTargetClass();
    const { on: on_finish_one_route, emit: inner_emit_finish_one_route } =
        createEventPair<DataOfFinishOneRoute>(emitter);
    const emit_finish_one_route = (data: PureDataOfFinishOneRoute) => {
        totaltimems += data.timems;
        current_search_count++;
        inner_emit_finish_one_route({
            globalbestlength:
                globalbestlength === Infinity
                    ? data.totallength
                    : globalbestlength,
            globalbestroute,
            ...data,
            current_search_count,
            current_iterations: numberofiterations,
            total_time_ms: totaltimems,
        });
    };
    const {
        on: on_finish_one_iteration,
        emit: inner_emit_finish_one_iteration,
    } = createEventPair<DataOfFinishOneIteration>(emitter);
    const emit_finish_one_iteration = (
        data: Omit<DataOfFinishOneIteration, "current_iterations">
    ) => {
        numberofiterations++;
        inner_emit_finish_one_iteration({
            ...data,
            current_iterations: numberofiterations,
        });
    };
    /*on_finish_one_iteration(() => {
        numberofiterations++;
    });
    on_finish_one_route(() => {
        current_search_count++;
    });*/
    //   let stagnantlength = Infinity;
    const runOneIteration = () => {
        if (current_search_count === 0) {
            greedy_first_search_route({
                pathTabooList,
                nodecoordinates,
                countofnodes,
                setbestlength,
                setbestroute,
                emit_finish_one_route,
                pheromonestore,
            });
        }
        //  if (
        //    maxnumberofiterations > numberofiterations &&
        //     maxnumberofstagnant / numberofants > numberofstagnant
        //  ) {
        const starttime = Number(new Date());

        const {
            nextrandomselectionprobability,
            //   routesandlengths,
            pheromoneDiffusionProbability,
            population_relative_information_entropy,
            ispheromoneDiffusion,
            optimallengthofthisround,
            optimalrouteofthisround,
        } = adaptiveTabooSingleIterateTSPSearchSolve({
            emit_finish_one_route,
            setbestroute,
            setbestlength,
            getbestlength: getglobalbestlength,
            getbestroute: getglobalbestroute,
            pathTabooList,
            pheromonestore,
            nodecoordinates,
            numberofants,
            alphazero,
            betazero,
            lastrandomselectionprobability,
            searchloopcountratio,
            pheromonevolatilitycoefficientR2,
            pheromonevolatilitycoefficientR1,
            pheromoneintensityQ,
        });

        const endtime = Number(new Date());

        const timems = endtime - starttime;
        // totaltimems += timems;
        emit_finish_one_iteration({
            // current_iterations: getnumberofiterations(),
            pheromoneDiffusionProbability,
            optimallengthofthisround,
            optimalrouteofthisround,
            population_relative_information_entropy,
            ispheromoneDiffusion,
            randomselectionprobability: lastrandomselectionprobability,
            timems,
        });
        lastrandomselectionprobability = nextrandomselectionprobability;
        // console.log({ routesandlengths });

        // current_search_count += numberofants;
        // numberofiterations++;
        // } else {
        // const timems = totaltimems;
        //  emit_finish_all_iterations();
        // }
    };
    const runIterations = (iterations: number) => {
        assertnumber(iterations);
        asserttrue(iterations > 0);

        for (let i = 0; i < iterations; i++) {
            //  if (
            //     maxnumberofiterations > numberofiterations &&
            //   maxnumberofstagnant / numberofants > numberofstagnant
            //   ) {
            runOneIteration();
            //  } else {
            //    break;
            //  }
        }
        // emit_finish_all_iterations();
    };
    function runOneRoute() {}
    const result: TSPRunner = {
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
        getglobalbestlength,
        getglobalbestroute,
        getcurrent_search_count,
        pheromonestore,
        betazero,
        //    maxnumberofstagnant,
        nodecoordinates,
        alphazero,
        searchloopcountratio,
        numberofants,
        //    maxnumberofiterations,
        pathTabooList,
        [Symbol.toStringTag]: "TSPRunner",
        runOneIteration,
    };

    return result;
}
