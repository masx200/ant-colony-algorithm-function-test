import { closedtotalpathlength } from "../functions/closed-total-path-length";
import { creategetdistancebyindex } from "../functions/creategetdistancebyindex";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { totalpathlengthwithoutcycle } from "../functions/totalpathlengthwithoutcycle";
import { asserttrue } from "./asserttrue";

export function testclosedtotalpathlength() {
    console.log("test closedtotalpathlength start");
    const node_coordinates: NodeCoordinates = [
        [0, 0],
        [0, 3],
        [4, 3],
    ];

    asserttrue(
        12 ===
            closedtotalpathlength({
                // count_of_nodes: 3,
                path: [0, 1, 2],
                getdistancebyindex: creategetdistancebyindex(node_coordinates),
            })
    );
    asserttrue(3 === totalpathlengthwithoutcycle([0, 1], node_coordinates));
    console.log("test closedtotalpathlength end");
}
