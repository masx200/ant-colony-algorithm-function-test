import {
    MatrixAdd,
    MatrixForEach,
    // MatrixAssign,
    MatrixMax,
    MatrixMultiplyNumber,
    MatrixSymmetry,
    MatrixReduceSeries,
    MatrixSymmetryCreate,
} from "@masx200/sparse-2d-matrix";
import {
    default_Cross_Point_Coefficient_of_Non_Optimal_Paths,
    default_Pheromone_Increase_Coefficient_of_Non_Optimal_Paths,
} from "../src/default_Options";
import { assert_true } from "../test/assert_true";
import { cacheble_is_intersection_filter_with_cycle_route } from "./cacheble_is_intersection_filter_with_cycle_route";
import { create_delta_pheromone_of_global_best } from "./create_delta_pheromone_of_global_best";
import { create_delta_pheromone_of_iterate_best } from "./create_delta_pheromone_of_iterate_best";
import { create_delta_pheromone_of_iterate_worst } from "./create_delta_pheromone_of_iterate_worst";
import { cycleroutetosegments } from "./cycleroutetosegments";
// import { iterateBestMatrixInitializer } from "./iterateBestMatrixInitializer";
import { NodeCoordinates } from "./NodeCoordinates";

/**每轮路径搜索完后的迭代信息素更新规则 */
export function pheromone_update_rule_after_iteration({
    cross_Point_Coefficient_of_Non_Optimal_Paths = default_Cross_Point_Coefficient_of_Non_Optimal_Paths,
    coefficient_of_pheromone_Increase_Non_Optimal_Paths = default_Pheromone_Increase_Coefficient_of_Non_Optimal_Paths,
    node_coordinates,
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
    coefficient_of_pheromone_Increase_Non_Optimal_Paths?: number;
    cross_Point_Coefficient_of_Non_Optimal_Paths?: number;
    node_coordinates: NodeCoordinates;
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
    // console.log("全局信息素更新计算开始");
    /* 最优路径不能有交叉点 */
    const deltapheromoneglobalbest = create_delta_pheromone_of_global_best({
        count_of_nodes,
        globalbestroutesegments,
        globalbestlength,
    });
    /* 最优路径不能有交叉点 */
    const deltapheromoneiteratebest = create_delta_pheromone_of_iterate_best({
        count_of_nodes,
        route_segments: iteratebestroutesegments,
        route_length: iteratebestlength,
    });
    const have_iterate_worst = !(
        iteratebestlength === iterateworstlength ||
        iterateworstlength === globalbestlength
    );
    /* 最差不能和最好的相同 */
    const deltapheromoneiterateworst = have_iterate_worst
        ? create_delta_pheromone_of_iterate_worst({
              count_of_nodes,
              iterateworstroutesegments,
              iterateworstlength,
          })
        : MatrixSymmetryCreate({
              row: count_of_nodes,
              initializer: () => 0,
          });
    const have_intersection_in_global_best =
        cacheble_is_intersection_filter_with_cycle_route({
            node_coordinates,
            cycleroute: globalbestroute,
        });
    const have_intersection_in_iterate_best =
        cacheble_is_intersection_filter_with_cycle_route({
            node_coordinates,
            cycleroute: iteratebestroute,
        });
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
                (have_intersection_in_iterate_best
                    ? cross_Point_Coefficient_of_Non_Optimal_Paths
                    : 1) * coefficient_of_pheromone_Increase_Non_Optimal_Paths,
                deltapheromoneiteratebest
            ),
            deltapheromoneiterateworst
        )
    );
    // console.log("deltapheromone", MatrixToArrays(deltapheromone));

    const route_segments_to_change: [number, number][] = [
        ...iteratebestroutesegments,
        ...globalbestroutesegments,
    ];
    if (have_iterate_worst) {
        iterateworstroutesegments.forEach((v) => {
            route_segments_to_change.push(v);
        });
    }
    const matrix_of_is_changed = MatrixSymmetryCreate({
        row: count_of_nodes,
        initializer: () => 0,
    });

    route_segments_to_change.forEach(([left, right]) => {
        matrix_of_is_changed.set(left, right, 1);
        matrix_of_is_changed.set(right, left, 1);
    });
    const oldpheromoneStore = pheromoneStore;
    /* 只有这些路径经过的路径才更新信息素,其他不变 */
    const old_pheromone_Store_is_changed = MatrixReduceSeries(
        (a, b) => a * b,
        matrix_of_is_changed,
        oldpheromoneStore
    );

    const nextpheromoneStore_is_changed = MatrixMax(
        MatrixMultiplyNumber(1 / 2, old_pheromone_Store_is_changed),
        MatrixAdd(
            MatrixMultiplyNumber(
                1 - pheromone_volatility_coefficient_R2,
                old_pheromone_Store_is_changed
            ),
            MatrixMultiplyNumber(
                pheromone_volatility_coefficient_R2,
                deltapheromone
            )
        )
    );
    // console.log(" 信息素更新结束");
    // console.log({
    //     oldpheromoneStore: MatrixToArrays(oldpheromoneStore),
    //     nextpheromoneStore: MatrixToArrays(nextpheromoneStore),
    // });

    MatrixForEach(nextpheromoneStore_is_changed, (v, r, c) => {
        /* 只有这些路径经过的路径才更新信息素,其他不变 */
        if (v !== 0) {
            pheromoneStore.set(r, c, v);
        }
    });

    assert_true(pheromoneStore.values().every((a) => a > 0));
    //信息素更新
    // MatrixAssign(pheromoneStore, nextpheromoneStore);
}
