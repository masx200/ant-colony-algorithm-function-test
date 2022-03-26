import { Initialize_TSP_runner_Options } from "./Initialize_TSP_runner_Options";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export type Fun_initialize_TSP_runner = ({
    node_coordinates,
    number_of_ants,
    onGlobalBestRouteChange,
    onLatestRouteChange,
    pheromone_volatility_coefficient_R1,
}: Initialize_TSP_runner_Options) => Promise<TSP_Worker_Remote>;