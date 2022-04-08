import { NodeCoordinates } from "../functions/NodeCoordinates";
import { TSPRunnerOptions } from "./TSPRunnerOptions";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export type Fun_TSP_Before_Start = ({
    coefficient_of_pheromone_Increase_Non_Optimal_Paths,
    onglobal_best_routeChange,
    onLatestRouteChange,
    node_coordinates,
    count_of_ants,
    // pheromone_volatility_coefficient_R1,
}: TSPRunnerOptions & {
    coefficient_of_pheromone_Increase_Non_Optimal_Paths: number;
    // onFinishIteration: () => void;
    // pheromone_volatility_coefficient_R1: number;
    onglobal_best_routeChange: (
        global_best_route: number[],
        node_coordinates: NodeCoordinates
    ) => void;
    onLatestRouteChange: (
        latestroute: number[],
        node_coordinates: NodeCoordinates
    ) => void;
    // iterations_of_search: number;
    count_of_ants: number;
    node_coordinates: NodeCoordinates;
}) => Promise<TSP_Worker_Remote>;
