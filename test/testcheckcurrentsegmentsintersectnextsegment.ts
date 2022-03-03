import { intersectionfilterfun } from "../functions/intersectionfilterfun";
import { nodecoordinates6 } from "./nodecoordinates6";

export function testcheckcurrentsegmentsintersectnextsegment() {
    console.log("  testcheckcurrentsegmentsintersectnextsegment start");
    console.assert(
        intersectionfilterfun(
            [3, 1, 0],

            2,
            nodecoordinates6
        )
    );
    console.assert(
        !intersectionfilterfun(
            [0, 1, 2],

            4,
            nodecoordinates6
        )
    );
    console.log("  testcheckcurrentsegmentsintersectnextsegment end");
}
