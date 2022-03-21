import { closedtotalpathlength } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
// import { cycleroutetosegments } from "./cycleroutetosegments";
import { NodeCoordinates } from "./NodeCoordinates";
import { PathTabooList } from "../pathTabooList/PathTabooList";
import { taboo_backtracking_path_construction } from "./Taboo-backtracking-path-construction";
import { pheromone_update_rule_after_route } from "./pheromone_update_rule_after_route";
// import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";
import { intersection_filter_with_cycle_route } from "./intersection_filter_with_cycle_route";
// import { Emit_Finish_One_Route } from "./Emit_Finish_One_Route";
import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
// import { generate_3_opt_cycle_routes } from "./generate_3_opt_cycle_routes";
// import { get_best_routeOfSeriesRoutesAndLengths } from "./get_best_routeOfSeriesRoutesAndLengths";
// import { random_k_opt_limited_full } from "./random_k_opt_limited_full";
/**自适应禁忌搜索构建一条路径并更新信息素 */
export function adaptive_tabu_search_builds_a_path_and_updates_pheromone({
    // emit_finish_one_route,
    // max_results_of_k_opt,
    searchloopcountratio,
    pheromone_intensity_Q,
    pheromone_volatility_coefficient_R1,
    node_coordinates,
    alpha_zero,

    beta_zero,
    randomselectionprobability,
    get_best_length,
    pathTabooList,
    pheromoneStore,
    setbestlength,
    setbestroute,
    get_best_route,
}: {
    // max_results_of_k_opt: number;
    // emit_finish_one_route: Emit_Finish_One_Route;
    searchloopcountratio: number;
    pheromone_intensity_Q: number;
    pheromone_volatility_coefficient_R1: number;
    node_coordinates: NodeCoordinates;
    alpha_zero: number;

    beta_zero: number;
    randomselectionprobability: number;
    get_best_length: () => number;
    pathTabooList: PathTabooList;
    pheromoneStore: MatrixSymmetry;
    setbestlength: (a: number) => void;
    setbestroute: (route: number[]) => void;
    get_best_route: () => number[];
}): {
    route: number[];
    totallength: number;
    // timems: number;
} {
    // const starttime = Number(new Date());
    const count_of_nodes = node_coordinates.length;
    // const inputindexs = Array(node_coordinates.length)
    //     .fill(0)
    //     .map((_v, i) => i);

    const { route: oldRoute /*  countofloops */ } =
        taboo_backtracking_path_construction({
            searchloopcountratio,
            alpha_zero,

            beta_zero,
            randomselectionprobability,
            get_best_length,
            node_coordinates,
            pathTabooList,
            pheromoneStore,
            // startnode,
        });
    const old_totallength = closedtotalpathlength({
        // count_of_nodes: route.length,
        path: oldRoute,
        getdistancebyindex: creategetdistancebyindex(node_coordinates),
    });

    //对此次路径进行k-opt优化
    // const routes_of_k_opt = random_k_opt_limited_full({
    //     // count_of_nodes,
    //     oldRoute,
    //     max_results_of_k_opt,
    // });

    // const routesAndLengths = routes_of_k_opt.map((route) => {
    //     const totallength = closedtotalpathlength({
    //         // count_of_nodes: route.length,
    //         path: route,
    //         getdistancebyindex: creategetdistancebyindex(node_coordinates),
    //     });
    //     return { totallength, route };
    // });
    // const { route: best_route_of_k_opt, totallength: best_length_of_k_opt } =
    //     get_best_routeOfSeriesRoutesAndLengths(routesAndLengths);
    // //  尝试3-opt优化,如果得到更优的解,禁忌旧路径,赋值新路径
    // /* 其他非最优解添加到禁忌表 */
    // routesAndLengths.forEach(({ route, totallength }) => {
    //     if (best_length_of_k_opt < totallength) {
    //         //非最优解添加到禁忌表
    //         pathTabooList.add(route);
    //     }
    // });
    // if (best_length_of_k_opt < old_totallength) {
    //     // pathTabooList.add(oldRoute);
    //     console.log(
    //         "k-opt-发现更优解",
    //         // "k=" + k,
    //         best_route_of_k_opt,
    //         best_length_of_k_opt
    //     );
    //     pathTabooList.add(oldRoute);
    // }
    //随机k-opt可能不包含原路径
    // const route: number[] =
    //     best_length_of_k_opt < old_totallength ? best_route_of_k_opt : oldRoute;

    // const totallength: number = Math.min(best_length_of_k_opt, old_totallength);
    const route = oldRoute;
    const totallength = old_totallength;
    if (
        intersection_filter_with_cycle_route({
            cycleroute: route,
            node_coordinates,
        })
    ) {
        //存在交叉点
        pathTabooList.add(route);
    }
    const bestlength = get_best_length();
    if (bestlength && bestlength > totallength) {
        //找到更优解,赋值最优解
        setbestlength(totallength);
        setbestroute(route);
    } else {
        pathTabooList.add(route);
    }

    //
    const globalbestroute = get_best_route();
    const globalbestlength = get_best_length();
    // const globalbestroutesegments = cycleroutetosegments(globalbestroute);

    //  如果路径长度比最优解得到的结果更差,禁忌此路径
    //  如果路径中存在交叉点,禁忌此路径

    pheromone_update_rule_after_route({
        current_length: totallength,
        current_route: route,
        // node_coordinates,
        globalbestroute,
        count_of_nodes,
        // globalbestroute,
        globalbestlength,
        pheromone_intensity_Q,
        pheromoneStore,
        pheromone_volatility_coefficient_R1,
    });

    // const endtime = Number(new Date());
    // const timems = endtime - starttime;
    // emit_finish_one_route({ totallength, route, countofloops, timems });
    return { route, totallength /* , timems */ };
}
