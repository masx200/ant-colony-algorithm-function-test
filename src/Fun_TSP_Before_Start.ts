import { NodeCoordinates } from "../functions/NodeCoordinates";
import { Runner_Init_Options } from "./Runner_Init_Options";

import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export type Fun_TSP_Before_Start = ({
    node_coordinates,
    count_of_ants,
}: Runner_Init_Options & {
    count_of_ants: number;
    node_coordinates: NodeCoordinates;
}) => Promise<TSP_Worker_Remote>;
