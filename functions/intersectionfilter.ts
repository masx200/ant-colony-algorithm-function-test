import { Nodecoordinates } from "./Nodecoordinates";
import { robustsegmentintersect } from "./robust-segment-intersect";

export function intersectionfilter(
    countofnodes: number,
    currentroute: number[],
    nodecoordinates: Nodecoordinates,
    nextnode: number
): boolean {
    const currentsegments: [number, number][] = currentroute
        .slice(0, currentroute.length - 1)
        .map((v, i) => [v, currentroute[i + 1]]);

    if (countofnodes === currentroute.length + 1) {
        /*形成环路了, 需要判断两个线段是否有交点 */
        const nextsegments: [number, number][] = [
            [currentroute.slice(-1)[0], nextnode],
            [nextnode, currentroute[0]],
        ];

        return nextsegments.some((nextsegment) =>
            checkcurrentsegmentsintersectnextsegment(
                currentsegments,
                nextsegment,
                nodecoordinates
            )
        );
    } else {
        /*没有形成环路, 判断一个线段是否有交点 */
        const nextsegment: [number, number] = [
            currentroute.slice(-1)[0],
            nextnode,
        ];

        return checkcurrentsegmentsintersectnextsegment(
            currentsegments,
            nextsegment,
            nodecoordinates
        );
    }
}
function checkcurrentsegmentsintersectnextsegment(
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
