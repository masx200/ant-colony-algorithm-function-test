import { Nodecoordinates } from "../functions/Nodecoordinates";
import { asserttrue } from "./asserttrue";
import { testgreedyconstructroutebest } from "./test-greedyconstructroute";
// import { nodecoordinates6 } from "./nodecoordinates6";

export function testgreedynodecoordinates6() {
    const { /* greedypath,  */ totallength } =
        testgreedyconstructroutebest(nodecoordinates6);

    asserttrue(totallength === 328.8245611270737);
}

//export
const nodecoordinates6: Nodecoordinates = [
    [0, 25],
    [25, 0],
    [75, 0],
    [0, 75],

    [100, 75],
    [75, 100],
];
