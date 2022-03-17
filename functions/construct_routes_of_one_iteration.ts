import { adaptive_tabu_search_builds_a_path_and_updates_pheromone } from "./adaptive_tabu_search_builds_a_path_and_updates_pheromone";
import { Nodecoordinates } from "./Nodecoordinates";
import { PathTabooList } from "../pathTabooList/PathTabooList";
// import { Emit_Finish_One_Route } from "./Emit_Finish_One_Route";
import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
/* 构建一轮的路径 */
export function construct_routes_of_one_iteration({
    numberofants,
    // max_results_of_k_opt,
    // emit_finish_one_route,
    searchloopcountratio,
    pheromoneintensityQ,
    pheromonevolatilitycoefficientR1,
    nodecoordinates,
    alphazero,
    betazero,
    lastrandomselectionprobability,
    getbestlength,
    pathTabooList,
    pheromonestore,
    setbestlength,
    setbestroute,
    getbestroute,
}: {
    // max_results_of_k_opt: number;
    numberofants: number;
    // emit_finish_one_route: Emit_Finish_One_Route;
    searchloopcountratio: number;
    pheromoneintensityQ: number;
    pheromonevolatilitycoefficientR1: number;
    nodecoordinates: Nodecoordinates;
    alphazero: number;
    betazero: number;
    lastrandomselectionprobability: number;
    getbestlength: () => number;
    pathTabooList: PathTabooList<number>;
    pheromonestore: MatrixSymmetry<number>;
    setbestlength: (a: number) => void;
    setbestroute: (route: number[]) => void;
    getbestroute: () => number[];
}): { route: number[]; totallength: number }[] {
    return Array(numberofants)
        .fill(0)
        .map(() => {
            return adaptive_tabu_search_builds_a_path_and_updates_pheromone({
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
            });
        });
}
