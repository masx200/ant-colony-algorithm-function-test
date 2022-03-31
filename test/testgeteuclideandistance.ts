import { isEqual } from "lodash";
import { euclideandistance } from "../functions/euclideandistance";
import { getalldistancesofnodes } from "../functions/getalldistancesofnodes";
import { geteuclideandistancebyindex } from "../functions/geteuclideandistancebyindex";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { assert_true } from "./assert_true";
export function testgeteuclideandistance() {
    // console.log("test geteuclideandistance test start");
    assert_true(euclideandistance([3, 4], [0, 0]) === 5);

    let node_coordinates1: NodeCoordinates = [
        [0, 0],
        [1, 4],
        [5, 5],
        [6, 8],
    ];
    assert_true(geteuclideandistancebyindex(0, 3, node_coordinates1) === 10);
    assert_true(geteuclideandistancebyindex(3, 0, node_coordinates1) === 10);
    assert_true(geteuclideandistancebyindex(2, 2, node_coordinates1) === 0);

    let node_coordinates2: NodeCoordinates = [
        [0, 0],
        [1, 4],
        [6, 8],
        [5, 5],
    ];
    assert_true(geteuclideandistancebyindex(0, 2, node_coordinates2) === 10);
    assert_true(geteuclideandistancebyindex(2, 0, node_coordinates2) === 10);
    assert_true(geteuclideandistancebyindex(1, 1, node_coordinates2) === 0);
    // console.log(node_coordinates1);
    // console.log(node_coordinates2);

    const node1distances = getalldistancesofnodes(node_coordinates1);
    // console.log(node1distances);
    // asserttrue(
    //     [
    //         4.123105625617661, 7.0710678118654755, 10, 4.123105625617661,
    //         6.4031242374328485, 3.1622776601683795,
    //     ]
    //         .map((a, i) => a - node1distances[i])
    //         .map((a) => aboutequal(a, 0))
    //         .every(Boolean)
    // );
    assert_true(
        isEqual(
            [
                4.123105625617661, 7.0710678118654755, 10, 4.123105625617661,
                6.4031242374328485, 3.1622776601683795,
            ],
            node1distances
        )
    );
    assert_true(10 === Math.max(...node1distances));
    // console.log("test geteuclideandistance test ok");
}

// function aboutequal(a: number, b: number) {
//     return Math.abs(a - b) <= Number.EPSILON;
// }
