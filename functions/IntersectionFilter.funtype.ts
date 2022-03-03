import { Nodecoordinates } from "./Nodecoordinates";

export type IntersectionFilter = (
   // countofnodes: number,
    currentroute: number[],
    nodecoordinates: Nodecoordinates,
    nextnode: number
) => boolean;
