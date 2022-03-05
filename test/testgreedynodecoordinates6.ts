import { asserttrue } from "./asserttrue";
import { testgreedyconstructroute } from "./test-greedyconstructroute";
import { nodecoordinates6 } from "./nodecoordinates6";

export function testgreedynodecoordinates6() {
    const { /* greedypath,  */ totallength } =
        testgreedyconstructroute(nodecoordinates6);

    asserttrue(totallength === 328.8245611270737);
}
