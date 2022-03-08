import EventEmitterTargetClass from "@masx200/event-emitter-target";
import { SparseMatrixSymmetry } from "../matrixtools/SparseMatrixSymmetry";
import { createPathTabooList } from "./createPathTabooList";
import { createPheromonestore } from "./createPheromonestore";
import { Nodecoordinates } from "./Nodecoordinates";
import { PathTabooList } from "./PathTabooList";
const finishalliterationsflag = Symbol();
const finishonerouteflag = Symbol();
const finishoneiterationflag = Symbol();
interface TSPRunner {
    onfinishalliterations: (callback: (data: DataOfFinishAllIteration) => void) => void;
    runiterations: (iterations: number) => void;
    onfinishoneiteration: (callback: (data: DataOfFinishOneIteration) => void) => void;
    onfinishoneroute: (callback: (data: DataOfFinishOneRoute) => void) => void;
    getlengthofstagnant: () => number;
    getnumberofiterations: () => number;
    getnumberofstagnant: () => number;
    getglobalbestlength: () => number;
    getglobalbestroute: () => number[];
    getcurrentsearchindex: () => number;
    pheromonestore: SparseMatrixSymmetry<number>;
    betazero: number;
    maxnumberofstagnant: number;
    nodecoordinates: Nodecoordinates;
    alphazero: number;
    searchloopcountratio: number;
    numberofants: number;
    maxnumberofiterations: number;
    pathtaboolist: PathTabooList<number>;
}

export function createTSPrunner({
    nodecoordinates,
    alphazero = 1,
    betazero = 5,
    searchloopcountratio = 100,
    numberofants = 10,
    maxnumberofiterations = 1000,
    maxnumberofstagnant = 30,
}: {
    nodecoordinates: Nodecoordinates;
    alphazero: number;
    betazero: number;
    searchloopcountratio: number;
    numberofants: number;
    maxnumberofiterations: number;
    maxnumberofstagnant: number;
}): TSPRunner {
    const countofnodes = nodecoordinates.length;
    const pathtaboolist = createPathTabooList(countofnodes);
    const pheromonestore = createPheromonestore(countofnodes);
    let currentsearchindex = 0;
    const getcurrentsearchindex = () => {
        return currentsearchindex;
    };
    let globalbestroute: number[] = [];
    const getglobalbestroute = () => {
        return globalbestroute;
    };
    let globalbestlength: number = Infinity;
    const getglobalbestlength = () => {
        return globalbestlength;
    };
    let numberofstagnant = 0;
    const getnumberofstagnant = () => {
        return numberofstagnant;
    };
    let numberofiterations = 0;
    const getnumberofiterations = () => {
        return numberofiterations;
    };
    let lengthofstagnant = Infinity;
    const getlengthofstagnant = () => {
        return lengthofstagnant;
    };
    const emitter = EventEmitterTargetClass();

    const onfinishoneroute = (
        callback: (data: DataOfFinishOneRoute) => void
    ) => {
        emitter.on(finishonerouteflag, callback);
    };
    const emitfinishoneroute = (data: DataOfFinishOneRoute) => {
        emitter.emit(finishonerouteflag, data);
    };
    const onfinishoneiteration = (
        callback: (data: DataOfFinishOneIteration) => void
    ) => {
        emitter.on(finishoneiterationflag, callback);
    };
    const emitfinishoneiteration = (data: DataOfFinishOneIteration) => {
        emitter.emit(finishoneiterationflag, data);
    };
    const runiterations = (iterations: number) => {};

    const onfinishalliterations = (
        callback: (data: DataOfFinishAllIteration) => void
    ) => {
        emitter.on(finishalliterationsflag, callback);
    };
    const emitfinishalliterations = (data: DataOfFinishAllIteration) => {
        emitter.emit(finishalliterationsflag, data);
    };
    const result = {
        onfinishalliterations,
        runiterations,
        onfinishoneiteration,
        onfinishoneroute,
        getlengthofstagnant,
        getnumberofiterations,
        getnumberofstagnant,
        getglobalbestlength,
        getglobalbestroute,
        getcurrentsearchindex,
        pheromonestore,
        betazero,
        maxnumberofstagnant,
        nodecoordinates,
        alphazero,
        searchloopcountratio,
        numberofants,
        maxnumberofiterations,
        pathtaboolist,
    };
    return result;
}
export interface DataOfFinishOneRoute {}
export interface DataOfFinishOneIteration {}
export interface DataOfFinishAllIteration {}
