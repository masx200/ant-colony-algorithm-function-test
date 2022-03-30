import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { default_Pheromone_Increase_Coefficient_of_Non_Optimal_Paths } from "../src/defaultnumber_of_ants";
import { asserttrue } from "../test/asserttrue";
import { construct_one_route_all } from "./construct_one_route_all";
import { Fun_EachRouteGenerator } from "./Fun_EachRouteGenerator";
import { get_best_routeOfSeriesRoutesAndLengths } from "./get_best_routeOfSeriesRoutesAndLengths";
import { NodeCoordinates } from "./NodeCoordinates";
import { pheromone_update_rule_after_route } from "./pheromone_update_rule_after_route";
import { Precise_2_opt_eliminates_all_intersections } from "./Precise_2_opt_eliminates_all_intersections";
import { Random_K_OPT_full_limited_find_best } from "./Random_K_OPT_full_limited_find_best";
export function createEachRouteGenerator({
    coefficient_of_pheromone_Increase_Non_Optimal_Paths = default_Pheromone_Increase_Coefficient_of_Non_Optimal_Paths,
}: { coefficient_of_pheromone_Increase_Non_Optimal_Paths?: number } = {}): {
    get_probability_of_opt_current: () => number;
    get_probability_of_opt_best: () => number;
    EachRouteGenerator: Fun_EachRouteGenerator;
    // weight_of_opt_current: {
    get_weight_of_opt_current(): number;
    set_weight_of_opt_current(value: number): void;
    // };
    // weight_of_opt_best: {
    get_weight_of_opt_best(): number;
    set_weight_of_opt_best(value: number): void;
    // };
} {
    let weight_of_opt_best = 1;
    let weight_of_opt_current = 1;

    function get_probability_of_opt_best(): number {
        return (
            weight_of_opt_best / (weight_of_opt_best + weight_of_opt_current)
        );
    }
    function get_probability_of_opt_current(): number {
        return (
            weight_of_opt_current / (weight_of_opt_best + weight_of_opt_current)
        );
    }
    /**每一条路径的生成和局部信息素更新 */
    function EachRouteGenerator({
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
    }): {
        route: number[];
        totallength: number;
        // weight_of_opt_best: number;
        // weight_of_opt_current: number;
    } {
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
        if (get_best_route().length === 0) {
            if (oldLength < get_best_length()) {
                setbestlength(oldLength);
                setbestroute(oldRoute);
            }
        }
        /* 对当前路径进行精准2-opt优化 */
        const { optimal_route: route1, optimal_length: length1 } =
            Precise_2_opt_eliminates_all_intersections({
                optimal_route: oldRoute,
                optimal_length: oldLength,
                node_coordinates,
            });
        // debugger
        // k-opt随机
        // 2-opt 去除交叉点循环
        const select_opt_best = Math.random() < get_probability_of_opt_best();
        /* 对全局最优解或当前路径进行k-opt优化 */
        const { optimal_route: route2, optimal_length: length2 } =
            Random_K_OPT_full_limited_find_best({
                oldRoute: select_opt_best ? get_best_route() : oldRoute,
                max_results_of_k_opt,
                node_coordinates,
                oldLength: select_opt_best ? get_best_length() : oldLength,
            });
        /* length3是对route2的去交叉结果 */
        const { optimal_route: route3, optimal_length: length3 } =
            Precise_2_opt_eliminates_all_intersections({
                optimal_route: route2,
                optimal_length: length2,
                node_coordinates,
            });
        const temp_set_of_routes = [
            { route: route1, totallength: length1 },
            { route: route2, totallength: length2 },
            { route: route3, totallength: length3 },
            { route: oldRoute, totallength: oldLength },
        ];
        //.filter((a) => a.totallength !== get_best_length());
        // debugger

        // debugger
        /* 找出最短(路径2,路径3,路径1,当前路径) */
        const { route, totallength } =
            //    temp_set_of_routes.length
            //?
            get_best_routeOfSeriesRoutesAndLengths(temp_set_of_routes);
        //   : { route: oldRoute, totallength: oldLength };

        if (totallength < get_best_length()) {
            if (length3 === totallength && select_opt_best) {
                // if () {
                weight_of_opt_best++;
                //} else {

                //}
            } else {
                weight_of_opt_current++;
            }

            setbestlength(totallength);
            setbestroute(route);
        }
        asserttrue(get_best_length() < Infinity);
        asserttrue(get_best_route().length === count_of_nodes);
        // 赋值全局最优
        // 局部信息素更新
        pheromone_update_rule_after_route({
            coefficient_of_pheromone_Increase_Non_Optimal_Paths,
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
        return {
            route,
            totallength,
            // weight_of_opt_best,
            // weight_of_opt_current,
        };
    }
    return {
        get_probability_of_opt_best,
        get_probability_of_opt_current,
        EachRouteGenerator,
        // weight_of_opt_best: {
        get_weight_of_opt_best() {
            return weight_of_opt_best;
        },
        set_weight_of_opt_best(value: number) {
            weight_of_opt_best = value;
        },
        // },
        // weight_of_opt_current: {
        get_weight_of_opt_current() {
            return weight_of_opt_current;
        },
        set_weight_of_opt_current(value: number) {
            weight_of_opt_current = value;
        },
        // },
    };
}
