import { checkcurrentsegmentsintersectnextsegment } from "./checkcurrentsegmentsintersectnextsegment";
import { Nodecoordinates } from "./Nodecoordinates";

export function intersectionfilter(
    //countofnodes: number,
    currentroute: number[],
    nodecoordinates: Nodecoordinates,
    nextnode: number
): boolean {
const countofnodes=nodecoordinates.length
    const currentsegments: [number, number][] = currentroute
        .slice(0, currentroute.length - 1)
        .map((v, i) => [v, currentroute[i + 1]]);
    debugger;
    if (countofnodes === currentroute.length + 1) {
        /*形成环路了, 需要判断两个线段是否有交点 */
        const nextsegments: [number, number][] = [
            [currentroute.slice(-1)[0], nextnode],
            [nextnode, currentroute[0]],
        ];

        const result = nextsegments.some((nextsegment) =>
            checkcurrentsegmentsintersectnextsegment(
                currentsegments,
                nextsegment,
                nodecoordinates
            )
        );
        debugger;
        return result;
    } else {
        /*没有形成环路, 判断一个线段是否有交点 */
        const nextsegment: [number, number] = [
            currentroute.slice(-1)[0],
            nextnode,
        ];

        const result = checkcurrentsegmentsintersectnextsegment(
            currentsegments,
            nextsegment,
            nodecoordinates
        );
        debugger;
        return result;
    }
}
