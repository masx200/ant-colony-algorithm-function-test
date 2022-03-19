import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { construct_one_route_all } from "./construct_one_route_all";
import { Nodecoordinates } from "./Nodecoordinates";
import { the_pheromone_update_rule_after_each_ant_builds_the_path } from "./the_pheromone_update_rule_after_each_ant_builds_the_path";
import { random_k_opt_limited_full } from "./random_k_opt_limited_full";
import { closedtotalpathlength } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
import { getbestRouteOfSeriesRoutesAndLengths } from "./getbestRouteOfSeriesRoutesAndLengths";
import { intersection_filter_with_cycle_route_find_one } from "./intersection_filter_with_cycle_route-find-one";
import { divide_route_to_2_opt_with_segment } from "./divide_route_to_2-opt-with-segment";
import { generate_2_opt_cycle_routes_with_splitted_Routes } from "./generate_2_opt_cycle_routes_with_splitted_Routes";
import { asserttrue } from "../test/asserttrue";

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
    const routes_of_k_opt = random_k_opt_limited_full({
        oldRoute: oldRoute,
        max_results_of_k_opt,
    });

    const routesAndLengths = routes_of_k_opt
        .map((route) => {
            const totallength = closedtotalpathlength({
                // countofnodes: route.length,
                path: route,
                getdistancebyindex: creategetdistancebyindex(nodecoordinates),
            });
            return { totallength, route };
        })
        .filter((a) => a.totallength !== oldLength);

    const { route: best_route_of_k_opt, totallength: best_length_of_k_opt } =
        getbestRouteOfSeriesRoutesAndLengths(routesAndLengths);
    let optimal_route = best_route_of_k_opt;
    let optimal_length = best_length_of_k_opt;
    // debugger
    while (true) {
        const intersection = intersection_filter_with_cycle_route_find_one({
            cycleroute: optimal_route,
            nodecoordinates,
        });
        if (intersection) {
            const splitted_Routes = divide_route_to_2_opt_with_segment(
                optimal_route,
                intersection
            );
            const routes_of_2_opt_accurate =
                generate_2_opt_cycle_routes_with_splitted_Routes(
                    optimal_route,
                    splitted_Routes
                );
            const routesAndLengths = routes_of_2_opt_accurate
                .map((route) => {
                    const totallength = closedtotalpathlength({
                        // countofnodes: route.length,
                        path: route,
                        getdistancebyindex:
                            creategetdistancebyindex(nodecoordinates),
                    });
                    return { totallength, route };
                })
                .filter((a) => a.totallength !== optimal_length);
            const {
                route: best_route_of_2_opt,
                totallength: best_length_of_2_opt,
            } = getbestRouteOfSeriesRoutesAndLengths(routesAndLengths);

            optimal_route = best_route_of_2_opt;
            optimal_length = best_length_of_2_opt;
        } else {
            break;
        }
    }
    // debugger
    let totallength = oldLength;
    let route = oldRoute;

    if (oldLength < optimal_length) {
        totallength = oldLength;
        route = oldRoute;
    } else {
        totallength = optimal_length;
        route = optimal_route;
    }
    if (totallength < getbestlength()) {
        setbestlength(totallength);
        setbestroute(route);
    }
    asserttrue(getbestlength() < Infinity);
    asserttrue(getbestroute().length===countofnodes);
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
