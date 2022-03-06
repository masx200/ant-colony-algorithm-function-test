import { asserttrue } from "./asserttrue";
import { testgreedyconstructroutebest } from "./test-greedyconstructroute";
import { nodecoordinates6 } from "./nodecoordinates6";

export function testgreedynodecoordinates6() {
    const { /* greedypath,  */ totallength } =
        testgreedyconstructroutebest(nodecoordinates6);

    asserttrue(totallength === 328.8245611270737);
}
