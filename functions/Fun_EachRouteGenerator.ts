import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { NodeCoordinates } from "./NodeCoordinates";

export type Fun_EachRouteGenerator = ({
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
}) => {
    route: number[];
    totallength: number;
    weight_of_opt_best: number;
    weight_of_opt_current: number;
};
