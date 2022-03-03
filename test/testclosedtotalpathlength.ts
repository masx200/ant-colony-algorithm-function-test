import { closedtotalpathlength } from "../functions/closed-total-path-length";
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

    asserttrue(12 === closedtotalpathlength([0, 1, 2], nodecoordinates));
    asserttrue(3 === totalpathlengthwithoutcycle([0, 1], nodecoordinates));
    console.log("test closedtotalpathlength end");
}
