import {
    MatrixAdd,
    MatrixAssign,
    MatrixFrom,
    MatrixMax,
    MatrixMultiplyNumber,
    MatrixSymmetry,
    MatrixSymmetryCreate,
    MatrixToArrays,
} from "@masx200/sparse-2d-matrix";
import { asserttrue } from "../test/asserttrue";
import { cycleroutetosegments } from "./cycleroutetosegments";
import { globalBestMatrixInitializer } from "./globalBestMatrixInitializer";
import { iterateBestMatrixInitializer } from "./iterateBestMatrixInitializer";
import { iterateWorstMatrixInitializer } from "./iterateWorstMatrixInitializer";

/**每轮路径搜索完后的迭代信息素更新规则 */
export function pheromone_update_rule_after_iteration({
    // nodecoordinates,
    // globalbestroute,
    // iteratebestroute,
    countofnodes,
    globalbestroute,
    globalbestlength,
    iteratebestroute,
    iteratebestlength,
    iterateworstlength,
    iterateworstroute,
    pheromoneintensityQ,
    pheromonestore,
    pheromonevolatilitycoefficientR2,
}: {
    // nodecoordinates: Nodecoordinates;
    globalbestroute: number[];
    iteratebestroute: number[];
    countofnodes: number;
    // globalbestroutesegments: [number, number][];
    globalbestlength: number;
    // iteratebestroutesegments: [number, number][];
    iteratebestlength: number;
    iterateworstlength: number;
    iterateworstroute: number[];
    pheromoneintensityQ: number;
    pheromonestore: MatrixSymmetry<number>;
    pheromonevolatilitycoefficientR2: number;
}) {
    const iterateworstroutesegments = cycleroutetosegments(iterateworstroute);
    const iteratebestroutesegments = cycleroutetosegments(iteratebestroute);
    const globalbestroutesegments = cycleroutetosegments(globalbestroute);
    console.log("全局信息素更新计算开始");
    /* 最优路径不能有交叉点 */
    const deltapheromoneglobalbest = MatrixSymmetryCreate({
        row: countofnodes,
        //column: countofnodes,
        initializer: /* intersection_filter_with_cycle_route({
                cycleroute: globalbestroute,

                nodecoordinates,
            }) && Math.random() < 0.5
                ? undefined
                : */ globalBestMatrixInitializer(
            globalbestroutesegments,
            globalbestlength
        ),
    });
    /* 最优路径不能有交叉点 */
    const deltapheromoneiteratebest = MatrixSymmetryCreate({
        row: countofnodes,
        // column: countofnodes,
        initializer: /*     intersection_filter_with_cycle_route({
                cycleroute: iteratebestroute,

                nodecoordinates,
            }) && Math.random() < 0.5
                ? undefined
                : */ iterateBestMatrixInitializer(
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
            MatrixMultiplyNumber(
                /* 添加非最优的信息素系数 */
                globalbestlength / iteratebestlength,
                deltapheromoneiteratebest
            ),
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
