import { NodeCoordinates } from "../functions/NodeCoordinates";

export type Initialize_TSP_runner_Options = {
    // onFinishIteration: () => void;
    pheromone_volatility_coefficient_R1: number;
    node_coordinates: NodeCoordinates;
    number_of_ants: number;
    onGlobalBestRouteChange: (
        globalbestroute: number[],
        node_coordinates: NodeCoordinates
    ) => void;
    onLatestRouteChange: (
        latestroute: number[],
        node_coordinates: NodeCoordinates
    ) => void;
};
