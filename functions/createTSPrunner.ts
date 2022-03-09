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

export interface TSPRunner {
    onDataChange: (callback: (data: DataOfChange) => void) => void;
    gettotaltimems: () => number;
    onfinishalliterations: (callback: (data: undefined) => void) => void;
    runiterations: (iterations: number) => void;
    onfinishoneiteration: (
        callback: (data: DataOfFinishOneIteration) => void
    ) => void;
    onfinishoneroute: (callback: (data: DataOfFinishOneRoute) => void) => void;
  //  getlengthofstagnant: () => number;
    getnumberofiterations: () => number;
  //  getnumberofstagnant: () => number;
    getglobalbestlength: () => number;
    getglobalbestroute: () => number[];
    getcurrentsearchcount: () => number;
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
	pheromonevolatilitycoefficientR1?: number
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

const pheromonevolatilitycoefficientR1= rest?.pheromonevolatilitycoefficientR1?? (1 - Math.pow(1 - rest?.pheromonevolatilitycoefficientR2??0.1, 1 / numberofants));

const pheromonevolatilitycoefficientR2=  rest?.pheromonevolatilitycoefficientR2??(1 - Math.pow(1 - rest?.pheromonevolatilitycoefficientR1??0.01,  numberofants));


  /*  const pheromonevolatilitycoefficientR1 =
        1 - Math.pow(1 - pheromonevolatilitycoefficientR2, 1 / numberofants);
*/
asserttrue(pheromonevolatilitycoefficientR1 ===
        1 - Math.pow(1 - pheromonevolatilitycoefficientR2, 1 / numberofants))
        
        
    console.log({
        numberofants,
        pheromonevolatilitycoefficientR1,
        pheromonevolatilitycoefficientR2,
        pheromoneintensityQ,
    });
    let lastrandomselectionprobability = 0;
    let totaltimems = 0;
    const gettotaltimems = () => {
        return totaltimems;
    };

    const countofnodes = nodecoordinates.length;
    const pathTabooList = createpathTabooList(countofnodes);
    const pheromonestore = createPheromonestore(countofnodes);
    let currentsearchcount = 0;
    const getcurrentsearchcount = () => {
        return currentsearchcount;
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
    const { on: onfinishoneroute, emit: emitfinishoneroute } =
        createEventPair<DataOfFinishOneRoute>(emitter);
    const { on: onfinishoneiteration, emit: emitfinishoneiteration } =
        createEventPair<DataOfFinishOneIteration>(emitter);

 //   let stagnantlength = Infinity;
    const runoneiteration = () => {
        if (currentsearchcount === 0) {
            const starttime = Number(new Date());
            const { route, totallength } =
                Greedyalgorithmtosolvetspwithallstartbest(nodecoordinates);
            const endtime = Number(new Date());
            const countofloops = countofnodes * countofnodes;
            const timems = endtime - starttime;
            totaltimems += timems;
            emitfinishoneroute({
                route,
                totallength,
                timems,
                countofloops,
            });
            currentsearchcount++;
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
                populationrelativeinformationentropy,
                ispheromoneDiffusion,
                optimallengthofthisround,
                optimalrouteofthisround,
            } = adaptiveTabooSingleIterateTSPSearchSolve({
                emitfinishoneroute,
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
            emitfinishoneiteration({
                pheromoneDiffusionProbability,
                optimallengthofthisround,
                optimalrouteofthisround,
                populationrelativeinformationentropy,
                ispheromoneDiffusion,
                randomselectionprobability: lastrandomselectionprobability,
                timems,
            });
            lastrandomselectionprobability = nextrandomselectionprobability;
            // console.log({ routesandlengths });

            currentsearchcount += numberofants;
            numberofiterations++;
       // } else {
            // const timems = totaltimems;
          //  emitfinishalliterations();
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
emitfinishalliterations();
    };
    const { on: onDataChange, emit: emitDataChange } =
        createEventPair<DataOfChange>(emitter);
    const { on: onfinishalliterations, emit: emitfinishalliterations } =
        createEventPair<undefined>(emitter);
    const dataChangeListener = () => {
        emitDataChange({
            iterations: getnumberofiterations(),

            timems: gettotaltimems(),

            globalbestroute: getglobalbestroute(),
            globalbestlength: getglobalbestlength(),
        });
    };
    onfinishalliterations(dataChangeListener);
    onfinishoneiteration(dataChangeListener);
    onfinishoneroute(dataChangeListener);
    const result: TSPRunner = {
        onDataChange,
        pheromonevolatilitycoefficientR2,
        pheromonevolatilitycoefficientR1,
        pheromoneintensityQ,
        gettotaltimems,
        onfinishalliterations,
        runiterations,
        onfinishoneiteration,
        onfinishoneroute,
    //    getlengthofstagnant,
        getnumberofiterations,
     //   getnumberofstagnant,
        getglobalbestlength,
        getglobalbestroute,
        getcurrentsearchcount,
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
