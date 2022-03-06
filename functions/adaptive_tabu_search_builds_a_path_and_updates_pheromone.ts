import { pickRandom } from "mathjs";
import { SparseMatrixAdd } from "../matrixtools/SparseMatrixAdd";
import { SparseMatrixAssign } from "../matrixtools/SparseMatrixAssign";
import { SparseMatrixFrom } from "../matrixtools/SparseMatrixFrom";
import { SparseMatrixMultiplyNumber } from "../matrixtools/SparseMatrixMultiplyNumber";
import { SparseMatrixSymmetry } from "../matrixtools/SparseMatrixSymmetry";
import { SparseMatrixSymmetryCreate } from "../matrixtools/SparseMatrixSymmetryCreate";
import { closedtotalpathlength } from "./closed-total-path-length";
import { cycleroutetosegments } from "./cycleroutetosegments";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
import { Nodecoordinates } from "./Nodecoordinates";
import { PathTabooList } from "./PathTabooList";
import { taboo_backtracking_path_construction } from "./Taboo-backtracking-path-construction";

export function adaptive_tabu_search_builds_a_path_and_updates_pheromone({
    pheromoneintensityQ,
    pheromonevolatilitycoefficientR,
    nodecoordinates,
    alphazero,
    probabilityofacceptingasuboptimalsolution,
    betazero,
    randomselectionprobability,
    getbestlength,
    pathTabooList,
    pheromonestore,
    setbestlength,
    setbestroute,
    getbestroute,
}: {
    pheromoneintensityQ: number;
    pheromonevolatilitycoefficientR: number;
    nodecoordinates: Nodecoordinates;
    alphazero: number;
    probabilityofacceptingasuboptimalsolution: number;
    betazero: number;
    randomselectionprobability: number;
    getbestlength: () => number;
    pathTabooList: PathTabooList;
    pheromonestore: SparseMatrixSymmetry;
    setbestlength: (a: number) => void;
    setbestroute: (route: number[]) => void;
    getbestroute: () => number[];
}): {
    route: number[];
    totallength: number;
} {
    const countofnodes = nodecoordinates.length;
    const inputindexs = Array(nodecoordinates.length)
        .fill(0)
        .map((_v, i) => i);
    const startnode = getnumberfromarrayofnmber(pickRandom(inputindexs));

    const route = taboo_backtracking_path_construction({
        alphazero,
        probabilityofacceptingasuboptimalsolution,
        betazero,
        randomselectionprobability,
        getbestlength,
        nodecoordinates,
        pathTabooList,
        pheromonestore,
        startnode,
    });
    const totallength = closedtotalpathlength(route, nodecoordinates);

    const bestlength = getbestlength();
    if (bestlength && bestlength >= totallength) {
        setbestlength(totallength);
        setbestroute(route);
    }

    //
    const globalbestroute = getbestroute();
    const globalbestlength = getbestlength();
    const globalbestroutesegments = cycleroutetosegments(globalbestroute);
    const deltapheromoneglobalbest = SparseMatrixSymmetryCreate({
        row: countofnodes,
        //column: countofnodes,
        initializer: function (i, j) {
            return globalbestroutesegments.some(([left, right]) => {
                return (
                    (i === left && j === right) || (j === left && i === right)
                );
            })
                ? 1 / globalbestlength
                : 0;
        },
    });
    //局部信息素更新
    const deltapheromone = SparseMatrixMultiplyNumber(
        pheromoneintensityQ,

        deltapheromoneglobalbest
    );
    const oldpheromonestore = SparseMatrixFrom(pheromonestore);
    const nextpheromonestore = SparseMatrixAdd(
        SparseMatrixMultiplyNumber(
            1 - pheromonevolatilitycoefficientR,
            oldpheromonestore
        ),
        SparseMatrixMultiplyNumber(
            pheromonevolatilitycoefficientR,
            deltapheromone
        )
    );
    console.log({ oldpheromonestore, nextpheromonestore });
    //信息素更新
    SparseMatrixAssign(pheromonestore, nextpheromonestore);

    return { route, totallength };
}
