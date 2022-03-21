import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { construct_one_route_all } from "./construct_one_route_all";
import { NodeCoordinates } from "./NodeCoordinates";
import { pheromone_update_rule_after_route } from "./pheromone_update_rule_after_route";
import { asserttrue } from "../test/asserttrue";
import { Precise_2_opt_eliminates_all_intersections } from "./Precise_2_opt_eliminates_all_intersections";
import { Random_K_OPT_full_limited_find_best } from "./Random_K_OPT_full_limited_find_best";
import { get_best_routeOfSeriesRoutesAndLengths } from "./get_best_routeOfSeriesRoutesAndLengths";

/**每一条路径的生成和局部信息素更新 */
export function EachRouteGenerator({
    current_search_count,
    count_of_nodes,
    node_coordinates,
    pheromoneStore,
    alpha_zero,
    beta_zero,
    lastrandomselectionprobability,
    max_results_of_k_opt,
    get_best_length,
    get_best_route,
    pheromone_volatility_coefficient_R1,
    pheromone_intensity_Q,
    setbestlength,
    setbestroute,
}: {
    current_search_count: number;
    count_of_nodes: number;
    node_coordinates: NodeCoordinates;
    pheromoneStore: MatrixSymmetry;
    alpha_zero: number;
    beta_zero: number;
    lastrandomselectionprobability: number;
    max_results_of_k_opt: number;
    get_best_length: () => number;
    get_best_route: () => number[];
    pheromone_volatility_coefficient_R1: number;
    pheromone_intensity_Q: number;
    setbestlength: (arg0: number) => void;
    setbestroute: (arg0: number[]) => void;
}): { route: number[]; totallength: number } {
    const {
        route: oldRoute,
        totallength: oldLength,
    }: {
        route: number[];
        totallength: number;
    } = construct_one_route_all({
        current_search_count,
        // pathTabooList,
        node_coordinates,
        count_of_nodes,
        // setbestlength,
        // setbestroute,
        pheromoneStore,
        // get_best_route,
        // max_results_of_k_opt,
        // get_best_length,
        // searchloopcountratio,
        // pheromone_intensity_Q,
        // pheromone_volatility_coefficient_R1,
        alpha_zero,
        beta_zero,
        lastrandomselectionprobability,
    });
    // debugger
    // k-opt随机
    // 2-opt 去除交叉点循环
    let { optimal_route: route1, optimal_length: length1 } =
        Random_K_OPT_full_limited_find_best({
            oldRoute,
            max_results_of_k_opt,
            node_coordinates,
            oldLength,
        });

    const { optimal_route: route2, optimal_length: length2 } =
        Precise_2_opt_eliminates_all_intersections(
            route1,
            length1,
            node_coordinates
        );
    // debugger
    const { optimal_route: route3, optimal_length: length3 } =
        Precise_2_opt_eliminates_all_intersections(
            oldRoute,
            oldLength,
            node_coordinates
        );
    // debugger
    /* 找出最短(路径2,路径3,路径1,当前路径) */
    const { route, totallength } = get_best_routeOfSeriesRoutesAndLengths([
        { route: route1, totallength: length1 },
        { route: route2, totallength: length2 },
        { route: route3, totallength: length3 },
        { route: oldRoute, totallength: oldLength },
    ]);

    if (totallength < get_best_length()) {
        setbestlength(totallength);
        setbestroute(route);
    }
    asserttrue(get_best_length() < Infinity);
    asserttrue(get_best_route().length === count_of_nodes);
    // 赋值全局最优
    // 局部信息素更新
    pheromone_update_rule_after_route({
        globalbestroute: get_best_route(),
        current_length: totallength,
        current_route: route,
        // node_coordinates,
        count_of_nodes,
        globalbestlength: get_best_length(),
        pheromone_volatility_coefficient_R1,
        pheromone_intensity_Q,
        pheromoneStore,
    });
    return { route, totallength };
}
