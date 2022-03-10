import { SparseMatrixAdd } from "../matrixtools/SparseMatrixAdd";
import { SparseMatrixAssign } from "../matrixtools/SparseMatrixAssign";
import { SparseMatrixFrom } from "../matrixtools/SparseMatrixFrom";
import { SparseMatrixMax } from "../matrixtools/SparseMatrixMax";
import { SparseMatrixMultiplyNumber } from "../matrixtools/SparseMatrixMultiplyNumber";
import { SparseMatrixSymmetry } from "../matrixtools/SparseMatrixSymmetry";
import { SparseMatrixSymmetryCreate } from "../matrixtools/SparseMatrixSymmetryCreate";
import { SparseMatrixToArrays } from "../matrixtools/SparseMatrixToArrays";
import { asserttrue } from "../test/asserttrue";
import { intersectionfilterfun } from "./intersectionfilterfun";
import { intersection_filter_with_cycle_route } from "./intersection_filter_with_cycle_route";
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
            : (i, j) =>
                  globalbestroutesegments.some(
                      ([left, right]) =>
                          (i === left && j === right) ||
                          (j === left && i === right)
                  )
                      ? 1 / globalbestlength
                      : 0,
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
            : (i, j) =>
                  iteratebestroutesegments.some(
                      ([left, right]) =>
                          (i === left && j === right) ||
                          (j === left && i === right)
                  )
                      ? 1 / iteratebestlength
                      : 0,
    });
    /* 最差不能和最好的相同 */
    const deltapheromoneiterateworst = SparseMatrixSymmetryCreate({
        row: countofnodes,
        initializer: !(
            iteratebestlength === iterateworstlength ||
            iterateworstlength === globalbestlength
        )
            ? (i, j) =>
                  iterateworstroutesegments.some(
                      ([left, right]) =>
                          (i === left && j === right) ||
                          (j === left && i === right)
                  )
                      ? -1 / iterateworstlength
                      : 0
            : undefined,
        //  column: countofnodes,
    });
    // if (
    //     !(
    //         iteratebestlength === iterateworstlength ||
    //         iterateworstlength === globalbestlength
    //     )
    // ) {
    //     //最差和最好不一样，相当于有最差
    //     SparseMatrixAssign(
    //         deltapheromoneiterateworst,
    //         SparseMatrixSymmetryCreate({
    //             row: countofnodes,
    //             //  column: countofnodes,
    //             initializer: function (i, j) {
    //                 return iterateworstroutesegments.some(([left, right]) => {
    //                     return (
    //                         (i === left && j === right) ||
    //                         (j === left && i === right)
    //                     );
    //                 })
    //                     ? -1 / iterateworstlength
    //                     : 0;
    //             },
    //         })
    //     );
    // }
    const deltapheromone = SparseMatrixMultiplyNumber(
        pheromoneintensityQ,
        SparseMatrixAdd(
            deltapheromoneglobalbest,
            deltapheromoneiteratebest,
            deltapheromoneiterateworst
        )
    );
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
