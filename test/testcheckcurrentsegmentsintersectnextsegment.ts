import { intersectionfilterfun } from "../functions/intersectionfilterfun";
import { asserttrue } from "./asserttrue";
import { nodecoordinates6 } from "./nodecoordinates6";

export function testcheckcurrentsegmentsintersectnextsegment() {
    console.log("  testcheckcurrentsegmentsintersectnextsegment start");
    asserttrue(
        intersectionfilterfun(
            [3, 1, 0],

            2,
            nodecoordinates6
        )
    );
    asserttrue(
        !intersectionfilterfun(
            [0, 1, 2],

            4,
            nodecoordinates6
        )
    );
    asserttrue(
        !intersectionfilterfun(
            [0, 1, 2, 4, 5],

            3,
            nodecoordinates6
        )
    );
    console.log("  testcheckcurrentsegmentsintersectnextsegment end");
}
