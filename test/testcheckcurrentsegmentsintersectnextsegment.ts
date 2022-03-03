import { intersectionfilter } from "../functions/intersectionfilter";
import { nodecoordinates6 } from "./nodecoordinates6";

export function testcheckcurrentsegmentsintersectnextsegment() {
    console.log("  testcheckcurrentsegmentsintersectnextsegment start");
    console.assert(
        intersectionfilter(
            [3, 1, 0],

            nodecoordinates6,
            2
        )
    );
    console.assert(
        !intersectionfilter(
            [0, 1, 2],

            nodecoordinates6,
            4
        )
    );
    console.log("  testcheckcurrentsegmentsintersectnextsegment end");
}
