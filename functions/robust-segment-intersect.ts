export type Coordinate = [number, number];
/* 判断线段是否相交 
Tests if the closed line segment [a0,a1] intersects the closed line segment [b0,b1].

    a0, a1 are the end points of the first line segment encoded as length 2 arrays
    b0, b1 are the end points of the second line segment encoded again as length 2 arrays

Returns true if the linesegments intersect, false otherwise
*/
export function robustsegmentintersect(
    a0: Coordinate,
    a1: Coordinate,
    b0: Coordinate,
    b1: Coordinate
): boolean {
    return crosses(a0, a1, b0, b1);
}

//@ts-ignore
import crosses from "robust-segment-intersect";
