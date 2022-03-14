
import { MatrixSymmetry, MatrixSymmetryCreate, MatrixMultiplyNumber, MatrixAdd, MatrixToArrays, MatrixFrom, MatrixMax, MatrixAssign } from "@masx200/sparse-2d-matrix";
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
    pheromonestore: MatrixSymmetry<number>;
    pheromonevolatilitycoefficientR2: number;
}) {
    console.log("全局信息素更新计算开始");
    /* 最优路径不能有交叉点 */
    const deltapheromoneglobalbest = MatrixSymmetryCreate({
        row: countofnodes,
        //column: countofnodes,
        initializer:
            intersection_filter_with_cycle_route({
                cycleroute: globalbestroute,

                nodecoordinates,
            }) && Math.random() < 0.5
                ? undefined
                : globalBestMatrixInitializer(
                      globalbestroutesegments,
                      globalbestlength
                  ),
    });
    /* 最优路径不能有交叉点 */
    const deltapheromoneiteratebest = MatrixSymmetryCreate({
        row: countofnodes,
        // column: countofnodes,
        initializer:
            intersection_filter_with_cycle_route({
                cycleroute: iteratebestroute,

                nodecoordinates,
            }) && Math.random() < 0.5
                ? undefined
                : iterateBestMatrixInitializer(
                      iteratebestroutesegments,
                      iteratebestlength
                  ),
    });
    /* 最差不能和最好的相同 */
    const deltapheromoneiterateworst = MatrixSymmetryCreate({
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

    const deltapheromone = MatrixMultiplyNumber(
        pheromoneintensityQ,
        MatrixAdd(
            deltapheromoneglobalbest,
            deltapheromoneiteratebest,
            deltapheromoneiterateworst
        )
    );
    console.log("deltapheromone", MatrixToArrays(deltapheromone));
    const oldpheromonestore = MatrixFrom(pheromonestore);
    const nextpheromonestore = MatrixMax(
        MatrixMultiplyNumber(1 / 2, oldpheromonestore),
        MatrixAdd(
            MatrixMultiplyNumber(
                1 - pheromonevolatilitycoefficientR2,
                oldpheromonestore
            ),
            MatrixMultiplyNumber(
                pheromonevolatilitycoefficientR2,
                deltapheromone
            )
        )
    );
    console.log(" 信息素更新结束");
    console.log({
        oldpheromonestore: MatrixToArrays(oldpheromonestore),
        nextpheromonestore: MatrixToArrays(nextpheromonestore),
    });
    asserttrue(nextpheromonestore.values().every((a) => a > 0));
    //信息素更新
    MatrixAssign(pheromonestore, nextpheromonestore);
}
