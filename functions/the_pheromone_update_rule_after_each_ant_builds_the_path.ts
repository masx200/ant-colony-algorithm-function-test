import { SparseMatrixAdd } from "../matrixtools/SparseMatrixAdd";
import { SparseMatrixAssign } from "../matrixtools/SparseMatrixAssign";
import { SparseMatrixFrom } from "../matrixtools/SparseMatrixFrom";
import { SparseMatrixMultiplyNumber } from "../matrixtools/SparseMatrixMultiplyNumber";
import { SparseMatrixSymmetry } from "../matrixtools/SparseMatrixSymmetry";
import { SparseMatrixSymmetryCreate } from "../matrixtools/SparseMatrixSymmetryCreate";
import { asserttrue } from "../test/asserttrue";

/**
 *
 * 每只蚂蚁构建完路径后的信息素更新规则
 */
export function the_pheromone_update_rule_after_each_ant_builds_the_path({
    countofnodes,
    globalbestroutesegments,
    globalbestlength,
    pheromoneintensityQ,
    pheromonestore,
    pheromonevolatilitycoefficientR1,
}: {
    countofnodes: number;
    globalbestroutesegments: [number, number][];
    globalbestlength: number;
    pheromoneintensityQ: number;
    pheromonestore: SparseMatrixSymmetry<number>;
    pheromonevolatilitycoefficientR1: number;
}) {
    console.log(" 信息素更新计算开始");
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
            1 - pheromonevolatilitycoefficientR1,
            oldpheromonestore
        ),
        SparseMatrixMultiplyNumber(
            pheromonevolatilitycoefficientR1,
            deltapheromone
        )
    );
    console.log(" 信息素更新结束");
    console.log({ oldpheromonestore, nextpheromonestore });
    asserttrue(nextpheromonestore.values().every((a) => a > 0));
    //信息素更新
    SparseMatrixAssign(pheromonestore, nextpheromonestore);
}
