import { NodeCoordinates } from "../functions/NodeCoordinates";
import { Runner_Init_Options } from "./Runner_Init_Options";

export type Initialize_TSP_runner_Options = Runner_Init_Options & {
    node_coordinates: NodeCoordinates;
    count_of_ants: number;
};
