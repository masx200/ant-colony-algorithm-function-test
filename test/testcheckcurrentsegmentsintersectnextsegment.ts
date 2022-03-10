import { intersectionfilterfun } from "../functions/intersectionfilterfun";
import { asserttrue } from "./asserttrue";
import { nodecoordinates21 } from "./nodecoordinates21";
import { nodecoordinates12 } from "./nodecoordinates12";

export function testcheckcurrentsegmentsintersectnextsegment() {
    console.log("  testcheckcurrentsegmentsintersectnextsegment start");
    asserttrue(
        intersectionfilterfun({
            currentroute: [3, 1, 0],

            nextnode: 2,
            nodecoordinates: nodecoordinates12,
        })
    );
    asserttrue(
        !intersectionfilterfun({
            currentroute: [0, 1, 2],

            nextnode: 4,
            nodecoordinates: nodecoordinates12,
        })
    );
    asserttrue(
        !intersectionfilterfun({
            currentroute: [0, 1, 2, 4, 5],

            nextnode: 3,
            nodecoordinates: nodecoordinates12,
        })
    );
    asserttrue(
        intersectionfilterfun({
            currentroute: [
                10, 11, 9, 12, 8, 1, 0, 3, 2, 4, 5, 6, 7, 20, 18, 15, 13, 17,
                14, 19,
            ],

            nextnode: 16,
            nodecoordinates: nodecoordinates21,
        })
    );
    console.log("  testcheckcurrentsegmentsintersectnextsegment end");
}
