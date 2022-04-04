import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { generate_paths_using_state_transition_probabilities } from "./generate-paths-using-state-transition-probabilities";
// import { PathTabooList } from "../pathTabooList/PathTabooList";
// import { adaptive_tabu_search_builds_a_path_and_updates_pheromone } from "./adaptive_tabu_search_builds_a_path_and_updates_pheromone";
// import { construct_route_from_k_opt_of_global_best } from "./construct_route_from_k_opt_of_global_best";
import { greedy_first_search_route } from "./greedy_first_search_route";
// import { intersection_filter_with_cycle_route } from "./intersection_filter_with_cycle_route";
import { NodeCoordinates } from "./NodeCoordinates";
// import { WayOfConstruct } from "./WayOfConstruct";

/* 只是生成一条路径 */
export function construct_one_route_all({
    setPheromoneZero,
    current_search_count,
    // pathTabooList,
    node_coordinates,
    count_of_nodes,
    // set_best_length,
    // set_best_route,
    // pheromoneStore,
    // get_best_route,
    // max_results_of_k_opt,
    // get_best_length,
    // searchloopcountratio,
    // pheromone_intensity_Q,
    // pheromone_volatility_coefficient_R1,
    alpha_zero,
    beta_zero,
    lastrandomselectionprobability,
}: {
    setPheromoneZero: (value: number) => void;
    current_search_count: number;
    // pathTabooList: PathTabooList<number>;
    node_coordinates: NodeCoordinates;
    count_of_nodes: number;
    // set_best_length: (bestlength: number) => void;
    // set_best_route: (route: number[]) => void;
    // pheromoneStore: MatrixSymmetry<number>;
    // get_best_route: () => number[];
    // max_results_of_k_opt: number;
    // get_best_length: () => number;
    // searchloopcountratio: number;
    // pheromone_intensity_Q: number;
    // pheromone_volatility_coefficient_R1: number;
    alpha_zero: number;
    beta_zero: number;
    lastrandomselectionprobability: number;
}): {
    route: number[];
    totallength: number;
    // way_of_construct: WayOfConstruct;
} {
    // let route: number[] | undefined = undefined;
    // let totallength: number | undefined = undefined;
    if (current_search_count === 0) {
        const result = greedy_first_search_route({
            // pathTabooList,
            node_coordinates,
            count_of_nodes,
            // set_best_length,
            // set_best_route,
            // emit_finish_one_route,
            pheromoneStore,
        });
        return { ...result /* , way_of_construct: "贪心算法" */ };
        // route = result.route;
        // totallength = result.totallength;
    } /*  if (
        !intersection_filter_with_cycle_route({
            node_coordinates,
            cycleroute: get_best_route(),
        })
    ) {
        return 禁忌搜索();
        //最优解无交叉点
    } else */ else {
        const result = generate_paths_using_state_transition_probabilities({
            pheromoneStore,
            alpha_zero,
            beta_zero,
            randomselectionprobability: lastrandomselectionprobability,
            node_coordinates,
        });
        //最优解有交叉点
        return result; /* 局部优化(); */
    }

    // function 禁忌搜索(): {
    //     // way_of_construct: WayOfConstruct;
    //     route: number[];
    //     totallength: number;
    // } {
    //     const result = adaptive_tabu_search_builds_a_path_and_updates_pheromone(
    //         {
    //             // max_results_of_k_opt,
    //             // emit_finish_one_route,
    //             searchloopcountratio,
    //             pheromone_intensity_Q,
    //             pheromone_volatility_coefficient_R1,
    //             node_coordinates,
    //             alpha_zero,

    //             beta_zero,
    //             randomselectionprobability: lastrandomselectionprobability,
    //             get_best_length,
    //             pathTabooList,
    //             pheromoneStore,
    //             set_best_length,
    //             set_best_route,
    //             get_best_route,
    //         }
    //     );
    //     // route = result.route;
    //     // totallength = result.totallength;
    //     return { ...result /* , way_of_construct: "禁忌搜索" */ };
    // }

    // function 局部优化(): {
    //     // way_of_construct: WayOfConstruct;
    //     route: number[];
    //     totallength: number;
    // } {
    //     const result = construct_route_from_k_opt_of_global_best({
    //         get_best_route,
    //         max_results_of_k_opt,
    //         node_coordinates,
    //         get_best_length,
    //         pathTabooList,
    //         set_best_length,
    //         set_best_route,
    //     });
    //     //最优解有交叉点,对最优解进行局部优化k-opt
    //     // routesandlengths.push({ route, totallength });
    //     return {
    //         ...result,
    //         // way_of_construct: "局部优化",
    //     };
    // }
    // return { route, totallength };
}
