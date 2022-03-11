import { SparseMatrixAdd } from "../matrixtools/SparseMatrixAdd";
import { SparseMatrixAssign } from "../matrixtools/SparseMatrixAssign";
import { SparseMatrixFrom } from "../matrixtools/SparseMatrixFrom";
import { SparseMatrixMax } from "../matrixtools/SparseMatrixMax";
import { SparseMatrixMultiplyNumber } from "../matrixtools/SparseMatrixMultiplyNumber";
import { SparseMatrixSymmetry } from "../matrixtools/SparseMatrixSymmetry";
import { SparseMatrixSymmetryCreate } from "../matrixtools/SparseMatrixSymmetryCreate";
import { SparseMatrixToArrays } from "../matrixtools/SparseMatrixToArrays";
import { asserttrue } from "../test/asserttrue";
import { globalBestMatrixInitializer } from "./globalBestMatrixInitializer";
import { intersection_filter_with_cycle_route } from "./intersection_filter_with_cycle_route";
import { iterateBestMatrixInitializer } from "./iterateBestMatrixInitializer";
import { iterateWorstMatrixInitializer } from "./iterateWorstMatrixInitializer";
import { Nodecoordinates } from "./Nodecoordinates";

/**每轮路径搜索完后的迭代信息素更新规则 */
export function each_iteration_of_pheromone_update_rules({
    nodecoordinates,
    globalbestroute,
    iteratebestroute,
    countofnodes,
    globalbestroutesegments,
    globalbestlength,
    iteratebestroutesegments,
    iteratebestlength,
    iterateworstlength,
    iterateworstroutesegments,
    pheromoneintensityQ,
    pheromonestore,
    pheromonevolatilitycoefficientR2,
}: {
    nodecoordinates: Nodecoordinates;
    globalbestroute: number[];
    iteratebestroute: number[];
    countofnodes: number;
    globalbestroutesegments: [number, number][];
    globalbestlength: number;
    iteratebestroutesegments: [number, number][];
    iteratebestlength: number;
    iterateworstlength: number;
    iterateworstroutesegments: [number, number][];
    pheromoneintensityQ: number;
    pheromonestore: SparseMatrixSymmetry<number>;
    pheromonevolatilitycoefficientR2: number;
}) {
    console.log(" 信息素更新计算开始");
    /* 最优路径不能有交叉点 */
    const deltapheromoneglobalbest = SparseMatrixSymmetryCreate({
        row: countofnodes,
        //column: countofnodes,
        initializer: intersection_filter_with_cycle_route({
            cycleroute: globalbestroute,

            nodecoordinates,
        })
            ? undefined
            : globalBestMatrixInitializer(
                  globalbestroutesegments,
                  globalbestlength
              ),
    });
    /* 最优路径不能有交叉点 */
    const deltapheromoneiteratebest = SparseMatrixSymmetryCreate({
        row: countofnodes,
        // column: countofnodes,
        initializer: intersection_filter_with_cycle_route({
            cycleroute: iteratebestroute,

            nodecoordinates,
        })
            ? undefined
            : iterateBestMatrixInitializer(
                  iteratebestroutesegments,
                  iteratebestlength
              ),
    });
    /* 最差不能和最好的相同 */
    const deltapheromoneiterateworst = SparseMatrixSymmetryCreate({
        row: countofnodes,
        initializer: !(
            iteratebestlength === iterateworstlength ||
            iterateworstlength === globalbestlength
        )
            ? iterateWorstMatrixInitializer(
                  iterateworstroutesegments,
                  iterateworstlength
              )
            : undefined,
        //  column: countofnodes,
    });

    const deltapheromone = SparseMatrixMultiplyNumber(
        pheromoneintensityQ,
        SparseMatrixAdd(
            deltapheromoneglobalbest,
            deltapheromoneiteratebest,
            deltapheromoneiterateworst
        )
    );
    console.log("deltapheromone", SparseMatrixToArrays(deltapheromone));
    const oldpheromonestore = SparseMatrixFrom(pheromonestore);
    const nextpheromonestore = SparseMatrixMax(
        SparseMatrixMultiplyNumber(1 / 2, oldpheromonestore),
        SparseMatrixAdd(
            SparseMatrixMultiplyNumber(
                1 - pheromonevolatilitycoefficientR2,
                oldpheromonestore
            ),
            SparseMatrixMultiplyNumber(
                pheromonevolatilitycoefficientR2,
                deltapheromone
            )
        )
    );
    console.log(" 信息素更新结束");
    console.log({
        oldpheromonestore: SparseMatrixToArrays(oldpheromonestore),
        nextpheromonestore: SparseMatrixToArrays(nextpheromonestore),
    });
    asserttrue(nextpheromonestore.values().every((a) => a > 0));
    //信息素更新
    SparseMatrixAssign(pheromonestore, nextpheromonestore);
}
