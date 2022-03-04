import { asserttrue } from "./asserttrue";
import { greedyconstructroute } from "./greedyconstructroute";
import { nodecoordinates6 } from "./nodecoordinates6";

export function testgreedynodecoordinates6() {
    const { /* greedypath,  */ totallength } =
        greedyconstructroute(nodecoordinates6);

    asserttrue(totallength === 328.8245611270737);
}
