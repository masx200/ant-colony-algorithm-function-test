import {
    MatrixSymmetry,
    MatrixSymmetryCreate,
    MatrixMultiplyNumber,
    MatrixAdd,
    MatrixToArrays,
    MatrixFrom,
    MatrixAssign,
} from "@masx200/sparse-2d-matrix";
import { asserttrue } from "../test/asserttrue";
import { cycleroutetosegments } from "./cycleroutetosegments";
import { globalBestMatrixInitializer } from "./globalBestMatrixInitializer";
import { intersection_filter_with_cycle_route } from "./intersection_filter_with_cycle_route";
import { iterateBestMatrixInitializer } from "./iterateBestMatrixInitializer";
import { Nodecoordinates } from "./Nodecoordinates";

/**
 *
 * 每只蚂蚁构建完路径后的信息素更新规则
 */
export function the_pheromone_update_rule_after_each_ant_builds_the_path({
    globalbestroute,
    current_length,
    current_route,
    nodecoordinates,
    countofnodes,
    globalbestroutesegments,
    globalbestlength,
    pheromoneintensityQ,
    pheromonestore,
    pheromonevolatilitycoefficientR1,
}: {
    current_length: number;
    current_route: number[];
    globalbestroute: number[];
    nodecoordinates: Nodecoordinates;
    countofnodes: number;
    globalbestroutesegments: [number, number][];
    globalbestlength: number;
    pheromoneintensityQ: number;
    pheromonestore: MatrixSymmetry<number>;
    pheromonevolatilitycoefficientR1: number;
}) {
    console.log("局部信息素更新计算开始");
    // const current_is_best = current_length === globalbestlength;

    const current_route_segments = cycleroutetosegments(current_route);

    // 注意:最优路径不能存在交叉点,这用于贪心算法求初始解有交叉点的极端情况,如果最优路径中存在交叉点,则视为没有最优路径
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
    const deltapheromoneiteratecurrent = MatrixSymmetryCreate({
        row: countofnodes,
        initializer:
            !intersection_filter_with_cycle_route({
                cycleroute: current_route,

                nodecoordinates,
            }) || Math.random() < 0.5
                ? iterateBestMatrixInitializer(
                      current_route_segments,
                      current_length
                  )
                : undefined,
    });
    //
    //
    //
    //局部信息素更新
    const deltapheromone = MatrixMultiplyNumber(
        pheromoneintensityQ,
        MatrixAdd(
            deltapheromoneglobalbest,

            deltapheromoneiteratecurrent
        )
    );
    console.log("deltapheromone", MatrixToArrays(deltapheromone));
    const oldpheromonestore = MatrixFrom(pheromonestore);
    const nextpheromonestore = MatrixAdd(
        MatrixMultiplyNumber(
            1 - pheromonevolatilitycoefficientR1,
            oldpheromonestore
        ),
        MatrixMultiplyNumber(pheromonevolatilitycoefficientR1, deltapheromone)
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
