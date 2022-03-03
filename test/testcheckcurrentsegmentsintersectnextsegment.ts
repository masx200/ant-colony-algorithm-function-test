import { intersectionfilterfun } from "../functions/intersectionfilterfun";
import { asserttrue } from "./asserttrue";
import { nodecoordinates21 } from "./nodecoordinates21";
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
    asserttrue(
        intersectionfilterfun(
            [
                10, 11, 9, 12, 8, 1, 0, 3, 2, 4, 5, 6, 7, 20, 18, 15, 13, 17,
                14, 19,
            ],

            16,
            nodecoordinates21
        )
    );
    console.log("  testcheckcurrentsegmentsintersectnextsegment end");
}
