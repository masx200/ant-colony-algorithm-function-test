import { Nodecoordinates } from "./Nodecoordinates";

export type IntersectionFilter = (
    // countofnodes: number,
    currentroute: number[],

    nextnode: number,
    nodecoordinates: Nodecoordinates
) => boolean;
