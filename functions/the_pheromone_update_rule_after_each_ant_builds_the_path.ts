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
    //TODO 注意:最优路径不能存在交叉点,这用于贪心算法求初始解有交叉点的极端情况,如果最优路径中存在交叉点,则视为没有最优路径
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
    //TODO 如果此次搜索到的路径长度大于最优解长度,将此路径视为最差路径.
    //Tworst表示最差路径的片段的集合,Lworst表示最差路径的长度.
    //TODO 注意:最差路径不得与最优路径相同,这用于所有蚂蚁走同一条路的极端情况,如果最差路径与最优路径相同,则视为没有最差路径.
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
