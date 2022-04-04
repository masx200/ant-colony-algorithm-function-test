import {
    MatrixAdd,
    MatrixForEach,
    // MatrixFrom,
    MatrixMultiplyNumber,
    MatrixReduceSeries,
    MatrixSymmetryCreate,
    // MatrixSymmetryCreate,
    // MatrixToArrays,
} from "@masx200/sparse-2d-matrix";
import {
    default_Cross_Point_Coefficient_of_Non_Optimal_Paths,
    default_Pheromone_Increase_Coefficient_of_Non_Optimal_Paths,
} from "../src/default_Options";
import { cacheble_is_intersection_filter_with_cycle_route } from "./cacheble_is_intersection_filter_with_cycle_route";
import { create_delta_pheromone_of_global_best } from "./create_delta_pheromone_of_global_best";
import { create_delta_pheromone_of_iterate_best } from "./create_delta_pheromone_of_iterate_best";
import { cycleroutetosegments } from "./cycleroutetosegments";
// import { globalBestMatrixInitializer } from "./globalBestMatrixInitializer";
// import { iterateBestMatrixInitializer } from "./iterateBestMatrixInitializer";
import { NodeCoordinates } from "./NodeCoordinates";
import { SharedOptions } from "./SharedOptions";
// import { iterateBestMatrixInitializer } from "./iterateBestMatrixInitializer";

/**
 *
 * 每只蚂蚁构建完路径后的信息素更新规则,局部信息素更新
 */
export function pheromone_update_rule_after_route({
    cross_Point_Coefficient_of_Non_Optimal_Paths = default_Cross_Point_Coefficient_of_Non_Optimal_Paths,
    coefficient_of_pheromone_Increase_Non_Optimal_Paths = default_Pheromone_Increase_Coefficient_of_Non_Optimal_Paths,
    globalbestroute,
    current_length,
    current_route,
    node_coordinates,
    count_of_nodes,
    // globalbestroutesegments,
    globalbestlength,
    pheromone_intensity_Q,
    // pheromoneStore,
    pheromone_volatility_coefficient_R1,
}: {
    coefficient_of_pheromone_Increase_Non_Optimal_Paths?: number;
    current_length: number;
    current_route: number[];
    globalbestroute: number[];
    node_coordinates: NodeCoordinates;
    count_of_nodes: number;
    // globalbestroutesegments: [number, number][];
    globalbestlength: number;
    pheromone_intensity_Q: number;
    // pheromoneStore: MatrixSymmetry<number>;
    pheromone_volatility_coefficient_R1: number;
    cross_Point_Coefficient_of_Non_Optimal_Paths?: number;
} & SharedOptions) {
    const globalbestroutesegments = cycleroutetosegments(globalbestroute);
    // console.log("局部信息素更新计算开始");
    // const current_is_best = current_length === globalbestlength;

    const current_route_segments = cycleroutetosegments(current_route);

    // 注意:最优路径不能存在交叉点,这用于贪心算法求初始解有交叉点的极端情况,如果最优路径中存在交叉点,则视为没有最优路径
    const deltapheromoneglobalbest = create_delta_pheromone_of_global_best({
        count_of_nodes,
        globalbestroutesegments,
        globalbestlength,
    });
    // /*  MatrixSymmetryCreate({
    //     row: count_of_nodes,
    //     //column: count_of_nodes,
    //     initializer: /*   intersection_filter_with_cycle_route({
    //             cycleroute: globalbestroute,

    //             node_coordinates,
    //         }) && Math.random() < 0.5
    //             ? undefined
    //             : */ globalBestMatrixInitializer(
    //         globalbestroutesegments,
    //         globalbestlength
    //     ),
    // }); */
    const delta_pheromone_current = create_delta_pheromone_of_iterate_best({
        count_of_nodes,
        route_segments: current_route_segments,
        route_length: current_length,
    });
    //     MatrixSymmetryCreate({
    //     row: count_of_nodes,
    //     /*  !intersection_filter_with_cycle_route({
    //             cycleroute: current_route,

    //             node_coordinates,
    //         }) || Math.random() < 0.5
    //             ? */

    //     initializer: iterateBestMatrixInitializer(
    //         current_route_segments,
    //         current_length
    //     ),
    //     // : undefined,
    // });
    const have_intersection_in_global_best =
        cacheble_is_intersection_filter_with_cycle_route({
            node_coordinates,
            cycleroute: globalbestroute,
        });
    const have_intersection_in_current_route =
        cacheble_is_intersection_filter_with_cycle_route({
            node_coordinates,
            cycleroute: current_route,
        });
    //局部信息素更新
    const deltapheromone = MatrixMultiplyNumber(
        pheromone_intensity_Q,
        MatrixAdd(
            have_intersection_in_global_best
                ? MatrixMultiplyNumber(
                      cross_Point_Coefficient_of_Non_Optimal_Paths,
                      deltapheromoneglobalbest
                  )
                : deltapheromoneglobalbest,
            MatrixMultiplyNumber(
                /* 添加非最优的信息素系数 */
                (have_intersection_in_current_route
                    ? cross_Point_Coefficient_of_Non_Optimal_Paths
                    : 1) * coefficient_of_pheromone_Increase_Non_Optimal_Paths,
                delta_pheromone_current
            )
        )
    );

    const route_segments_to_change: [number, number][] = [
        ...current_route_segments,
        ...globalbestroutesegments,
    ];
    const matrix_of_is_changed = MatrixSymmetryCreate({
        row: count_of_nodes,
        initializer: () => 0,
    });

    route_segments_to_change.forEach(([left, right]) => {
        matrix_of_is_changed.set(left, right, 1);
        matrix_of_is_changed.set(right, left, 1);
    });
    const oldpheromoneStore = pheromoneStore;
    const old_pheromone_Store_is_changed = MatrixReduceSeries(
        (a, b) => a * b,
        matrix_of_is_changed,
        oldpheromoneStore
    );

    // console.log("deltapheromone", MatrixToArrays(deltapheromone));
    /* 只有这些路径经过的路径才更新信息素,其他不变 */
    const nextpheromoneStore_is_changed = MatrixAdd(
        MatrixMultiplyNumber(
            1 - pheromone_volatility_coefficient_R1,
            old_pheromone_Store_is_changed
        ),
        MatrixMultiplyNumber(
            pheromone_volatility_coefficient_R1,
            deltapheromone
        )
    );
    // debugger;
    MatrixForEach(nextpheromoneStore_is_changed, (v, r, c) => {
        if (v !== 0) {
            pheromoneStore.set(r, c, v);
        }
    });
    // console.log(" 信息素更新结束");
    // console.log({
    //     oldpheromoneStore: MatrixToArrays(oldpheromoneStore),
    //     nextpheromoneStore: MatrixToArrays(nextpheromoneStore),
    // });
    // assert_true(pheromoneStore.values().every((a) => a > 0));
    //信息素更新
    // MatrixAssign(pheromoneStore, nextpheromoneStore);
}
