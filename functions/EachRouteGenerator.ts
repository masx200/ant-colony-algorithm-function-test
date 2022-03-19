import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { construct_one_route_all } from "./construct_one_route_all";
import { Nodecoordinates } from "./Nodecoordinates";
import { the_pheromone_update_rule_after_each_ant_builds_the_path } from "./the_pheromone_update_rule_after_each_ant_builds_the_path";
import { asserttrue } from "../test/asserttrue";
import { Precise_2_opt_eliminates_all_intersections } from "./Precise_2_opt_eliminates_all_intersections";
import { Random_K_OPT_full_limited_find_best } from "./Random_K_OPT_full_limited_find_best";
import { getbestRouteOfSeriesRoutesAndLengths } from "./getbestRouteOfSeriesRoutesAndLengths";

/**每一条路径的生成和局部信息素更新 */
export function EachRouteGenerator({
    current_search_count,
    countofnodes,
    nodecoordinates,
    pheromonestore,
    alphazero,
    betazero,
    lastrandomselectionprobability,
    max_results_of_k_opt,
    getbestlength,
    getbestroute,
    pheromonevolatilitycoefficientR1,
    pheromoneintensityQ,
    setbestlength,
    setbestroute,
}: {
    current_search_count: number;
    countofnodes: number;
    nodecoordinates: Nodecoordinates;
    pheromonestore: MatrixSymmetry;
    alphazero: number;
    betazero: number;
    lastrandomselectionprobability: number;
    max_results_of_k_opt: number;
    getbestlength: () => number;
    getbestroute: () => number[];
    pheromonevolatilitycoefficientR1: number;
    pheromoneintensityQ: number;
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
        nodecoordinates,
        countofnodes,
        // setbestlength,
        // setbestroute,
        pheromonestore,
        // getbestroute,
        // max_results_of_k_opt,
        // getbestlength,
        // searchloopcountratio,
        // pheromoneintensityQ,
        // pheromonevolatilitycoefficientR1,
        alphazero,
        betazero,
        lastrandomselectionprobability,
    });
    // debugger
    // k-opt随机
    // 2-opt 去除交叉点循环
    let { optimal_route: route1, optimal_length: length1 } =
        Random_K_OPT_full_limited_find_best({
            oldRoute,
            max_results_of_k_opt,
            nodecoordinates,
            oldLength,
        });

    const { optimal_route: route2, optimal_length: length2 } =
        Precise_2_opt_eliminates_all_intersections(
            route1,
            length1,
            nodecoordinates
        );
    // debugger
    const { optimal_route: route3, optimal_length: length3 } =
        Precise_2_opt_eliminates_all_intersections(
            oldRoute,
            oldLength,
            nodecoordinates
        );
    // debugger
    /* 找出最短(路径2,路径3,路径1,当前路径) */
    const { route, totallength } = getbestRouteOfSeriesRoutesAndLengths([
        { route: route1, totallength: length1 },
        { route: route2, totallength: length2 },
        { route: route3, totallength: length3 },
        { route: oldRoute, totallength: oldLength },
    ]);

    if (totallength < getbestlength()) {
        setbestlength(totallength);
        setbestroute(route);
    }
    asserttrue(getbestlength() < Infinity);
    asserttrue(getbestroute().length === countofnodes);
    // 赋值全局最优
    // 局部信息素更新
    the_pheromone_update_rule_after_each_ant_builds_the_path({
        globalbestroute: getbestroute(),
        current_length: totallength,
        current_route: route,
        nodecoordinates,
        countofnodes,
        globalbestlength: getbestlength(),
        pheromonevolatilitycoefficientR1,
        pheromoneintensityQ,
        pheromonestore,
    });
    return { route, totallength };
}
