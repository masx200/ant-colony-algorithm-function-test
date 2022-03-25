import { NodeCoordinates } from "../functions/NodeCoordinates";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export type Fun_TSP_Before_Start = ({
    onGlobalBestRouteChange,
    onLatestRouteChange,
    node_coordinates,
    number_of_ants,
    pheromone_volatility_coefficient_R1,
}: {
    // onFinishIteration: () => void;
    pheromone_volatility_coefficient_R1: number;
    onGlobalBestRouteChange: (
        globalbestroute: number[],
        node_coordinates: NodeCoordinates
    ) => void;
    onLatestRouteChange: (
        latestroute: number[],
        node_coordinates: NodeCoordinates
    ) => void;
    // round_of_search: number;
    number_of_ants: number;
    node_coordinates: NodeCoordinates;
}) => Promise<TSP_Worker_Remote>;
