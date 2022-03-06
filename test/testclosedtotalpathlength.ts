import { closedtotalpathlength } from "../functions/closed-total-path-length";
import { creategetdistancebyindex } from "../functions/creategetdistancebyindex";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { totalpathlengthwithoutcycle } from "../functions/totalpathlengthwithoutcycle";
import { asserttrue } from "./asserttrue";

export function testclosedtotalpathlength() {
    console.log("test closedtotalpathlength start");
    const nodecoordinates: Nodecoordinates = [
        [0, 0],
        [0, 3],
        [4, 3],
    ];

    asserttrue(
        12 ===
            closedtotalpathlength({
                // countofnodes: 3,
                path: [0, 1, 2],
                getdistancebyindex: creategetdistancebyindex(nodecoordinates),
            })
    );
    asserttrue(3 === totalpathlengthwithoutcycle([0, 1], nodecoordinates));
    console.log("test closedtotalpathlength end");
}
