import {
    MatrixAdd,
    MatrixAssign,
    MatrixFrom,
    MatrixMultiplyNumber,
    MatrixSymmetry,
    MatrixSymmetryCreate,
    MatrixToArrays,
} from "@masx200/sparse-2d-matrix";
import { asserttrue } from "../test/asserttrue";
import { cycleroutetosegments } from "./cycleroutetosegments";
import { globalBestMatrixInitializer } from "./globalBestMatrixInitializer";
import { iterateBestMatrixInitializer } from "./iterateBestMatrixInitializer";

/**
 *
 * 每只蚂蚁构建完路径后的信息素更新规则,局部信息素更新
 */
export function pheromone_update_rule_after_route({
    globalbestroute,
    current_length,
    current_route,
    // node_coordinates,
    count_of_nodes,
    // globalbestroutesegments,
    globalbestlength,
    pheromone_intensity_Q,
    pheromoneStore,
    pheromone_volatility_coefficient_R1,
}: {
    current_length: number;
    current_route: number[];
    globalbestroute: number[];
    // node_coordinates: NodeCoordinates;
    count_of_nodes: number;
    // globalbestroutesegments: [number, number][];
    globalbestlength: number;
    pheromone_intensity_Q: number;
    pheromoneStore: MatrixSymmetry<number>;
    pheromone_volatility_coefficient_R1: number;
}) {
    const globalbestroutesegments = cycleroutetosegments(globalbestroute);
    console.log("局部信息素更新计算开始");
    // const current_is_best = current_length === globalbestlength;

    const current_route_segments = cycleroutetosegments(current_route);

    // 注意:最优路径不能存在交叉点,这用于贪心算法求初始解有交叉点的极端情况,如果最优路径中存在交叉点,则视为没有最优路径
    const deltapheromoneglobalbest = MatrixSymmetryCreate({
        row: count_of_nodes,
        //column: count_of_nodes,
        initializer: /*   intersection_filter_with_cycle_route({
                cycleroute: globalbestroute,

                node_coordinates,
            }) && Math.random() < 0.5
                ? undefined
                : */ globalBestMatrixInitializer(
            globalbestroutesegments,
            globalbestlength
        ),
    });
    const deltapheromoneiteratecurrent = MatrixSymmetryCreate({
        row: count_of_nodes,
        initializer: /*  !intersection_filter_with_cycle_route({
                cycleroute: current_route,

                node_coordinates,
            }) || Math.random() < 0.5
                ? */ iterateBestMatrixInitializer(
            current_route_segments,
            current_length
        ),
        // : undefined,
    });
    //
    //
    //
    //局部信息素更新
    const deltapheromone = MatrixMultiplyNumber(
        pheromone_intensity_Q,
        MatrixAdd(
            deltapheromoneglobalbest,
            MatrixMultiplyNumber(
                /* 添加非最优的信息素系数 */
                globalbestlength / current_length,
                deltapheromoneiteratecurrent
            )
        )
    );
    console.log("deltapheromone", MatrixToArrays(deltapheromone));
    const oldpheromoneStore = MatrixFrom(pheromoneStore);
    const nextpheromoneStore = MatrixAdd(
        MatrixMultiplyNumber(
            1 - pheromone_volatility_coefficient_R1,
            oldpheromoneStore
        ),
        MatrixMultiplyNumber(
            pheromone_volatility_coefficient_R1,
            deltapheromone
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
