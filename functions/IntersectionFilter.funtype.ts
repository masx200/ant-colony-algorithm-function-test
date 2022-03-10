import { Nodecoordinates } from "./Nodecoordinates";

export type IntersectionFilter = (
    // countofnodes: number,
    arg: {
        currentroute: number[];

        nextnode: number;
        nodecoordinates: Nodecoordinates;
    }
) => boolean;
