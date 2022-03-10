import EventEmitterTargetClass from "@masx200/event-emitter-target";
import { SparseMatrixSymmetry } from "../matrixtools/SparseMatrixSymmetry";
import { SparseMatrixFill } from "../matrixtools/SparseMatrixFill";
import { asserttrue } from "../test/asserttrue";
import { adaptiveTabooSingleIterateTSPSearchSolve } from "./adaptiveTabooSingleIterateTSPSearchSolve";
import { createpathTabooList } from "../pathTabooList/createPathTabooList";
import { createPheromonestore } from "./createPheromonestore";
import { DataOfChange } from "./DataOfChange";
import { DataOfFinishOneIteration } from "./DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";
import { Greedyalgorithmtosolvetspwithallstartbest } from "./Greedyalgorithmtosolvetspwithallstartbest";
import { Nodecoordinates } from "./Nodecoordinates";
import { PathTabooList } from "../pathTabooList/PathTabooList";
import { createEventPair } from "./createEventPair";
import { assertnumber } from "../test/assertnumber";
import { float64equal } from "./float64equal";

export interface TSPRunner {
    onDataChange: (callback: (data: DataOfChange) => void) => void;
    gettotaltimems: () => number;
    on_finish_all_iterations: (callback: (data: undefined) => void) => void;
    runiterations: (iterations: number) => void;
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
    pheromonestore: SparseMatrixSymmetry<number>;

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
    searchloopcountratio = 100,
    numberofants = 10,
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
                1 - (rest?.pheromonevolatilitycoefficientR1 ?? 0.01),
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
        createEventPair<Omit<DataOfFinishOneRoute, "current_search_count">>(
            emitter
        );
const emit_finish_one_route=(data:Omit<DataOfFinishOneRoute, "current_search_count">)=>{

inner_emit_finish_one_route(data)
current_search_count++;
}
    const { on: on_finish_one_iteration, emit: inner_emit_finish_one_iteration } =
        createEventPair<Omit<DataOfFinishOneIteration, "current_iterations">>(
            emitter
        );
const emit_finish_one_route=(data:Omit<DataOfFinishOneIteration, "current_iterations">)=>{

inner_emit_finish_one_iteration(data)
numberofiterations++;
}
    /*on_finish_one_iteration(() => {
        numberofiterations++;
    });
    on_finish_one_route(() => {
        current_search_count++;
    });*/
    //   let stagnantlength = Infinity;
    const runoneiteration = () => {
        if (current_search_count === 0) {
            const starttime = Number(new Date());
            const { route, totallength } =
                Greedyalgorithmtosolvetspwithallstartbest(nodecoordinates);
            const endtime = Number(new Date());
            const countofloops = countofnodes * countofnodes;
            const timems = endtime - starttime;
            totaltimems += timems;
            emit_finish_one_route({
                // current_search_count,
                route,
                totallength,
                timems,
                countofloops,
            });
            // current_search_count++;
            //    stagnantlength = totallength;
            globalbestlength = totallength;
            globalbestroute = route;
            //信息素初始化
            SparseMatrixFill(pheromonestore, 1 / countofnodes / totallength);
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

        /*  if (
                routesandlengths.every(
                    ({ totallength }) => totallength === stagnantlength
                )
            ) {
                numberofstagnant++;
            } else {
                numberofstagnant = 0;
            }
            stagnantlength = routesandlengths[0].totallength;
          */
        const timems = endtime - starttime;
        totaltimems += timems;
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
    const runiterations = (iterations: number) => {
        assertnumber(iterations);
        asserttrue(iterations > 0);

        for (let i = 0; i < iterations; i++) {
            //  if (
            //     maxnumberofiterations > numberofiterations &&
            //   maxnumberofstagnant / numberofants > numberofstagnant
            //   ) {
            runoneiteration();
            //  } else {
            //    break;
            //  }
        }
        emit_finish_all_iterations();
    };
    const { on: onDataChange, emit: emitDataChange } =
        createEventPair<DataOfChange>(emitter);
    const { on: on_finish_all_iterations, emit: emit_finish_all_iterations } =
        createEventPair<undefined>(emitter);
    const dataChangeListener = () => {
        emitDataChange({
            current_iterations: getnumberofiterations() ,
            current_search_count: current_search_count ,
            timems: gettotaltimems(),

            globalbestroute: getglobalbestroute(),
            globalbestlength: getglobalbestlength(),
        });
    };
    on_finish_all_iterations(dataChangeListener);
    on_finish_one_iteration(dataChangeListener);
    on_finish_one_route(dataChangeListener);
    const out_on_finish_one_route = (
        listener: (data: DataOfFinishOneRoute) => void
    ) => {
        on_finish_one_route(
            (data: Omit<DataOfFinishOneRoute, "current_search_count">) => {
                listener({
                    ...data,
                    current_search_count: current_search_count ,
                });
            }
        );
    };
    const out_on_finish_one_iteration = (
        listener: (data: DataOfFinishOneIteration) => void
    ) => {
        on_finish_one_iteration(
            (data: Omit<DataOfFinishOneIteration, "current_iterations">) => {
                listener({
                    ...data,
                    current_iterations: numberofiterations ,
                });
            }
        );
    };
    const result: TSPRunner = {
        onDataChange,
        pheromonevolatilitycoefficientR2,
        pheromonevolatilitycoefficientR1,
        pheromoneintensityQ,
        gettotaltimems,
        on_finish_all_iterations,
        runiterations,
        on_finish_one_iteration: out_on_finish_one_iteration,
        on_finish_one_route: out_on_finish_one_route,
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
    };
    return result;
}
