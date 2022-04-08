import { NodeCoordinates } from "../functions/NodeCoordinates";
import { assert_true } from "./assert_true";
import { testgreedyconstructroutebest } from "./test-greedyconstructroute";
// import { node_coordinates6 } from "./node_coordinates6";

export function testgreedynode_coordinates6() {
    const { /* greedypath,  */ total_length } = testgreedyconstructroutebest(
        node_coordinates6,
        true
    );
    // console.log(total_length)
    assert_true(
        Math.round(total_length) ===
            Math.round(
                328
                //    328.8245611270737
            )
    );
}

//export
const node_coordinates6: NodeCoordinates = [
    [0, 25],
    [25, 0],
    [75, 0],
    [0, 75],

    [100, 75],
    [75, 100],
];
