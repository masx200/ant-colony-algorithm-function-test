import { PathTabooList } from "./PathTabooList";

interface PickNodeOptions {
    parameterrandomization: boolean;
    alphamax: number;
    alphamin: number;
    alphazero: number;
    betamax: number;
    betamin: number;
    betazero: number;
    getpheromone: (left: number, right: number) => number;
    currentroute: number[];
    availablenodes: number[];

    getdistancebyserialnumber: (left: number, right: number) => number;
}

interface PathConstructOptions {
    picknextnode(args: PickNodeOptions): number;
    pathTabooList: PathTabooList;
    startnode: number;
    filterbeforepick: (
        currentroute: number[],
        nextnode: number,

        pathTabooList: PathTabooList
    ) => boolean;
    parameterrandomization: boolean;
    alphamax: number;
    alphamin: number;
    alphazero: number;
    betamax: number;
    betamin: number;
    betazero: number;
    getpheromone: (left: number, right: number) => number;
    countofnodes: number;

    getdistancebyserialnumber: (left: number, right: number) => number;
}

export function Taboo_backtracking_path_construction(
    opts: PathConstructOptions
): number[] {
    const { startnode } = opts;
    let route: number[] = [startnode];
    while (true) {
        break;
    }
    return route;
}
