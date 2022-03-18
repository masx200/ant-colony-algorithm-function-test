import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { PathTabooList } from "../pathTabooList/PathTabooList";
import { adaptive_tabu_search_builds_a_path_and_updates_pheromone } from "./adaptive_tabu_search_builds_a_path_and_updates_pheromone";
import { construct_route_from_k_opt_of_global_best } from "./construct_route_from_k_opt_of_global_best";
import { greedy_first_search_route } from "./greedy_first_search_route";
import { intersection_filter_with_cycle_route } from "./intersection_filter_with_cycle_route";
import { Nodecoordinates } from "./Nodecoordinates";
// import { WayOfConstruct } from "./WayOfConstruct";

export function construct_one_route_all({
    current_search_count,
    pathTabooList,
    nodecoordinates,
    countofnodes,
    setbestlength,
    setbestroute,
    pheromonestore,
    getbestroute,
    max_results_of_k_opt,
    getbestlength,
    searchloopcountratio,
    pheromoneintensityQ,
    pheromonevolatilitycoefficientR1,
    alphazero,
    betazero,
    lastrandomselectionprobability,
}: {
    current_search_count: number;
    pathTabooList: PathTabooList<number>;
    nodecoordinates: Nodecoordinates;
    countofnodes: number;
    setbestlength: (bestlength: number) => void;
    setbestroute: (route: number[]) => void;
    pheromonestore: MatrixSymmetry<number>;
    getbestroute: () => number[];
    max_results_of_k_opt: number;
    getbestlength: () => number;
    searchloopcountratio: number;
    pheromoneintensityQ: number;
    pheromonevolatilitycoefficientR1: number;
    alphazero: number;
    betazero: number;
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
            pathTabooList,
            nodecoordinates,
            countofnodes,
            setbestlength,
            setbestroute,
            // emit_finish_one_route,
            pheromonestore,
        });
        return { ...result /* , way_of_construct: "贪心算法" */ };
        // route = result.route;
        // totallength = result.totallength;
    } else if (
        !intersection_filter_with_cycle_route({
            nodecoordinates,
            cycleroute: getbestroute(),
        })
    ) {
        return 禁忌搜索();
        //最优解无交叉点
    } else {
        //最优解有交叉点
        return 局部优化();
    }

    function 禁忌搜索(): {
        // way_of_construct: WayOfConstruct;
        route: number[];
        totallength: number;
    } {
        const result = adaptive_tabu_search_builds_a_path_and_updates_pheromone(
            {
                // max_results_of_k_opt,
                // emit_finish_one_route,
                searchloopcountratio,
                pheromoneintensityQ,
                pheromonevolatilitycoefficientR1,
                nodecoordinates,
                alphazero,

                betazero,
                randomselectionprobability: lastrandomselectionprobability,
                getbestlength,
                pathTabooList,
                pheromonestore,
                setbestlength,
                setbestroute,
                getbestroute,
            }
        );
        // route = result.route;
        // totallength = result.totallength;
        return { ...result /* , way_of_construct: "禁忌搜索" */ };
    }

    function 局部优化(): {
        // way_of_construct: WayOfConstruct;
        route: number[];
        totallength: number;
    } {
        const result = construct_route_from_k_opt_of_global_best({
            getbestroute,
            max_results_of_k_opt,
            nodecoordinates,
            getbestlength,
            pathTabooList,
            setbestlength,
            setbestroute,
        });
        //最优解有交叉点,对最优解进行局部优化k-opt
        // routesandlengths.push({ route, totallength });
        return {
            ...result,
            // way_of_construct: "局部优化",
        };
    }
    // return { route, totallength };
}
