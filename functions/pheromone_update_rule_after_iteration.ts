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
import { default_Pheromone_Increase_Coefficient_of_Non_Optimal_Paths } from "../src/defaultnumber_of_ants";
import { asserttrue } from "../test/asserttrue";
import { cycleroutetosegments } from "./cycleroutetosegments";
import { globalBestMatrixInitializer } from "./globalBestMatrixInitializer";
import { iterateBestMatrixInitializer } from "./iterateBestMatrixInitializer";
// import { iterateBestMatrixInitializer } from "./iterateBestMatrixInitializer";
import { iterateWorstMatrixInitializer } from "./iterateWorstMatrixInitializer";

/**每轮路径搜索完后的迭代信息素更新规则 */
export function pheromone_update_rule_after_iteration({
    // node_coordinates,
    // globalbestroute,
    iteratebestroute,
    count_of_nodes,
    globalbestroute,
    globalbestlength,
    // iteratebestroute,
    iteratebestlength,
    iterateworstlength,
    iterateworstroute,
    pheromone_intensity_Q,
    pheromoneStore,
    pheromone_volatility_coefficient_R2,
}: {
    // node_coordinates: NodeCoordinates;
    globalbestroute: number[];
    iteratebestroute: number[];
    count_of_nodes: number;
    // globalbestroutesegments: [number, number][];
    globalbestlength: number;
    // iteratebestroutesegments: [number, number][];
    iteratebestlength: number;
    iterateworstlength: number;
    iterateworstroute: number[];
    pheromone_intensity_Q: number;
    pheromoneStore: MatrixSymmetry<number>;
    pheromone_volatility_coefficient_R2: number;
}) {
    const iterateworstroutesegments = cycleroutetosegments(iterateworstroute);
    const iteratebestroutesegments = cycleroutetosegments(iteratebestroute);
    const globalbestroutesegments = cycleroutetosegments(globalbestroute);
    console.log("全局信息素更新计算开始");
    /* 最优路径不能有交叉点 */
    const deltapheromoneglobalbest = MatrixSymmetryCreate({
        row: count_of_nodes,
        //column: count_of_nodes,
        initializer: /* intersection_filter_with_cycle_route({
                cycleroute: globalbestroute,

                node_coordinates,
            }) && Math.random() < 0.5
                ? undefined
                : */ globalBestMatrixInitializer(
            globalbestroutesegments,
            globalbestlength
        ),
    });
    /* 最优路径不能有交叉点 */
    const deltapheromoneiteratebest = MatrixSymmetryCreate({
        row: count_of_nodes,
        // column: count_of_nodes,
        /*     intersection_filter_with_cycle_route({
                    cycleroute: iteratebestroute,

                    node_coordinates,
                }) && Math.random() < 0.5
                    ? undefined
                    : */

        initializer: iterateBestMatrixInitializer(
            iteratebestroutesegments,
            iteratebestlength
        ),
    });
    /* 最差不能和最好的相同 */
    const deltapheromoneiterateworst = MatrixSymmetryCreate({
        row: count_of_nodes,
        initializer: !(
            iteratebestlength === iterateworstlength ||
            iterateworstlength === globalbestlength
        )
            ? iterateWorstMatrixInitializer(
                  iterateworstroutesegments,
                  iterateworstlength
              )
            : undefined,
        //  column: count_of_nodes,
    });

    const deltapheromone = MatrixMultiplyNumber(
        pheromone_intensity_Q,
        MatrixAdd(
            deltapheromoneglobalbest,
            MatrixMultiplyNumber(
                /* 添加非最优的信息素系数 */
                default_Pheromone_Increase_Coefficient_of_Non_Optimal_Paths,
                deltapheromoneiteratebest
            ),
            deltapheromoneiterateworst
        )
    );
    console.log("deltapheromone", MatrixToArrays(deltapheromone));
    const oldpheromoneStore = MatrixFrom(pheromoneStore);
    const nextpheromoneStore = MatrixMax(
        MatrixMultiplyNumber(1 / 2, oldpheromoneStore),
        MatrixAdd(
            MatrixMultiplyNumber(
                1 - pheromone_volatility_coefficient_R2,
                oldpheromoneStore
            ),
            MatrixMultiplyNumber(
                pheromone_volatility_coefficient_R2,
                deltapheromone
            )
        )
    );
    console.log(" 信息素更新结束");
    console.log({
        oldpheromoneStore: MatrixToArrays(oldpheromoneStore),
        nextpheromoneStore: MatrixToArrays(nextpheromoneStore),
    });
    asserttrue(nextpheromoneStore.values().every((a) => a > 0));
    //信息素更新
    MatrixAssign(pheromoneStore, nextpheromoneStore);
}
