import { checkcurrentsegmentsintersectnextsegment } from "../functions/checkcurrentsegmentsintersectnextsegment";
import { nodecoordinates6 } from "./nodecoordinates6";

export function testcheckcurrentsegmentsintersectnextsegment() {
    console.log("  testcheckcurrentsegmentsintersectnextsegment start");
    console.assert(
        checkcurrentsegmentsintersectnextsegment(
            [
                [3, 1],
                [1, 0],
            ],
            [0, 2],
            nodecoordinates6
        )
    );
    console.assert(
        !checkcurrentsegmentsintersectnextsegment(
            [
                [0, 1],
                [1, 2],
            ],
            [2, 4],
            nodecoordinates6
        )
    );
    console.log("  testcheckcurrentsegmentsintersectnextsegment end");
}
