import { Initialize_TSP_runner_Options } from "./Initialize_TSP_runner_Options";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export type Fun_initialize_TSP_runner = ({
    node_coordinates,
    count_of_ants,
}: Initialize_TSP_runner_Options) => Promise<TSP_Worker_Remote>;
