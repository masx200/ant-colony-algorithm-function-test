import { createPathTabooList } from "./createPathTabooList";
import { createPheromonestore } from "./createPheromonestore";
import { Nodecoordinates } from "./Nodecoordinates";

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
}) {
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

    const result = {
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
