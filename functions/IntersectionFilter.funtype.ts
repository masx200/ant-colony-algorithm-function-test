import { NodeCoordinates } from "./NodeCoordinates";

export type IntersectionFilter = (
    // count_of_nodes: number,
    arg: {
        currentroute: number[];

        nextnode: number;
        node_coordinates: NodeCoordinates;
    },
) => boolean;
