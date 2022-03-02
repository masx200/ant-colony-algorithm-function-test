import { Nodecoordinates } from "./Nodecoordinates";
import { robustsegmentintersect } from "./robust-segment-intersect";

export function checkcurrentsegmentsintersectnextsegment(
    currentsegments: [number, number][],
    nextsegment: [number, number],
    nodecoordinates: Nodecoordinates
): boolean {
    return currentsegments.some((segment) => {
        const intersectparameters = [
            segment[0],
            segment[1],
            nextsegment[0],
            nextsegment[1],
        ].map((node) => nodecoordinates[node]);
        return robustsegmentintersect(
            intersectparameters[0],
            intersectparameters[1],
            intersectparameters[2],
            intersectparameters[3]
        );
    });
}
