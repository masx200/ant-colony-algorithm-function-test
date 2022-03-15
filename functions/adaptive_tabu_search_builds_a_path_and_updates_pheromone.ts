import { closedtotalpathlength } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
import { cycleroutetosegments } from "./cycleroutetosegments";
import { Nodecoordinates } from "./Nodecoordinates";
import { PathTabooList } from "../pathTabooList/PathTabooList";
import { taboo_backtracking_path_construction } from "./Taboo-backtracking-path-construction";
import { the_pheromone_update_rule_after_each_ant_builds_the_path } from "./the_pheromone_update_rule_after_each_ant_builds_the_path";
// import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";
import { intersection_filter_with_cycle_route } from "./intersection_filter_with_cycle_route";
import { Emit_Finish_One_Route } from "./Emit_Finish_One_Route";
import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
// import { generate_3_opt_cycle_routes } from "./generate_3_opt_cycle_routes";
import { getbestRouteOfSeriesRoutesAndLengths } from "./getbestRouteOfSeriesRoutesAndLengths";
import { generate_k_opt_cycle_routes_limited } from "./generate_k_opt_cycle_routes_limited";
import { random } from "lodash";
/**自适应禁忌搜索构建一条路径并更新信息素 */
export function adaptive_tabu_search_builds_a_path_and_updates_pheromone({
    emit_finish_one_route,
    max_results_of_k_opt,
    searchloopcountratio,
    pheromoneintensityQ,
    pheromonevolatilitycoefficientR1,
    nodecoordinates,
    alphazero,

    betazero,
    randomselectionprobability,
    getbestlength,
    pathTabooList,
    pheromonestore,
    setbestlength,
    setbestroute,
    getbestroute,
}: {
    max_results_of_k_opt: number;
    emit_finish_one_route: Emit_Finish_One_Route;
    searchloopcountratio: number;
    pheromoneintensityQ: number;
    pheromonevolatilitycoefficientR1: number;
    nodecoordinates: Nodecoordinates;
    alphazero: number;

    betazero: number;
    randomselectionprobability: number;
    getbestlength: () => number;
    pathTabooList: PathTabooList;
    pheromonestore: MatrixSymmetry;
    setbestlength: (a: number) => void;
    setbestroute: (route: number[]) => void;
    getbestroute: () => number[];
}): {
    route: number[];
    totallength: number;
    timems: number;
} {
    const starttime = Number(new Date());
    const countofnodes = nodecoordinates.length;
    // const inputindexs = Array(nodecoordinates.length)
    //     .fill(0)
    //     .map((_v, i) => i);

    const { route: oldRoute, countofloops } =
        taboo_backtracking_path_construction({
            searchloopcountratio,
            alphazero,

            betazero,
            randomselectionprobability,
            getbestlength,
            nodecoordinates,
            pathTabooList,
            pheromonestore,
            // startnode,
        });
    const old_totallength = closedtotalpathlength({
        // countofnodes: route.length,
        path: oldRoute,
        getdistancebyindex: creategetdistancebyindex(nodecoordinates),
    });

    //对此次路径进行k-opt优化
    const k = random(2, countofnodes / 2, false);
    const routes_of_k_opt = generate_k_opt_cycle_routes_limited(
        oldRoute,
        k,
        max_results_of_k_opt
    );

    const routesAndLengths = routes_of_k_opt.map((route) => {
        const totallength = closedtotalpathlength({
            // countofnodes: route.length,
            path: route,
            getdistancebyindex: creategetdistancebyindex(nodecoordinates),
        });
        return { totallength, route };
    });
    const { route: best_route_of_k_opt, totallength: best_length_of_k_opt } =
        getbestRouteOfSeriesRoutesAndLengths(routesAndLengths);
    //  尝试3-opt优化,如果得到更优的解,禁忌旧路径,赋值新路径
    /* 其他非最优解添加到禁忌表 */
    routesAndLengths.forEach(({ route, totallength }) => {
        if (best_length_of_k_opt < totallength) {
            //非最优解添加到禁忌表
            pathTabooList.add(route);
        }
    });
    if (best_length_of_k_opt < old_totallength) {
        // pathTabooList.add(oldRoute);
        console.log(
            "k-opt-发现更优解",'k='+k,
            best_route_of_k_opt,
            best_length_of_k_opt
        );
    }

    const route = best_route_of_k_opt;

    const totallength = best_length_of_k_opt;

    if (
        intersection_filter_with_cycle_route({
            cycleroute: route,
            nodecoordinates,
        })
    ) {
        //存在交叉点
        pathTabooList.add(route);
    }
    const bestlength = getbestlength();
    if (bestlength && bestlength >= totallength) {
        //找到更优解,赋值最优解
        setbestlength(totallength);
        setbestroute(route);
    } else {
        pathTabooList.add(route);
    }

    //
    const globalbestroute = getbestroute();
    const globalbestlength = getbestlength();
    const globalbestroutesegments = cycleroutetosegments(globalbestroute);

    //  如果路径长度比最优解得到的结果更差,禁忌此路径
    //  如果路径中存在交叉点,禁忌此路径

    the_pheromone_update_rule_after_each_ant_builds_the_path({
        current_length: totallength,
        current_route: route,
        nodecoordinates,
        globalbestroute,
        countofnodes,
        globalbestroutesegments,
        globalbestlength,
        pheromoneintensityQ,
        pheromonestore,
        pheromonevolatilitycoefficientR1,
    });

    const endtime = Number(new Date());
    const timems = endtime - starttime;
    emit_finish_one_route({ totallength, route, countofloops, timems });
    return { route, totallength, timems };
}
