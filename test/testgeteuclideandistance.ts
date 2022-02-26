import { isEqual } from "lodash";
import { getalldistancesofnodes } from "../functions/getalldistancesofnodes";
import { geteuclideandistancebyindex } from "../functions/geteuclideandistancebyindex";
import { euclideandistance } from "../functions/euclideandistance";
import { Nodecoordinates } from "../functions/Nodecoordinates";
export function testgeteuclideandistance() {
    console.log("test geteuclideandistance test start");
    console.assert(euclideandistance([3, 4], [0, 0]) === 5);

    let nodecoordinates1: Nodecoordinates = [
        [0, 0],
        [1, 4],
        [5, 5],
        [6, 8],
    ];
    console.assert(geteuclideandistancebyindex(0, 3, nodecoordinates1) === 10);
    console.assert(geteuclideandistancebyindex(3, 0, nodecoordinates1) === 10);
    console.assert(geteuclideandistancebyindex(2, 2, nodecoordinates1) === 0);

    let nodecoordinates2: Nodecoordinates = [
        [0, 0],
        [1, 4],
        [6, 8],
        [5, 5],
    ];
    console.assert(geteuclideandistancebyindex(0, 2, nodecoordinates2) === 10);
    console.assert(geteuclideandistancebyindex(2, 0, nodecoordinates2) === 10);
    console.assert(geteuclideandistancebyindex(1, 1, nodecoordinates2) === 0);
    console.log(nodecoordinates1);
    console.log(nodecoordinates2);

    const node1distances = getalldistancesofnodes(nodecoordinates1);
    console.log(node1distances);
    // console.assert(
    //     [
    //         4.123105625617661, 7.0710678118654755, 10, 4.123105625617661,
    //         6.4031242374328485, 3.1622776601683795,
    //     ]
    //         .map((a, i) => a - node1distances[i])
    //         .map((a) => aboutequal(a, 0))
    //         .every(Boolean)
    // );
    console.assert(
        isEqual(
            [
                4.123105625617661, 7.0710678118654755, 10, 4.123105625617661,
                6.4031242374328485, 3.1622776601683795,
            ],
            node1distances
        )
    );
    console.assert(10 === Math.max(...node1distances));
    console.log("test geteuclideandistance test ok");
}

// function aboutequal(a: number, b: number) {
//     return Math.abs(a - b) <= Number.EPSILON;
// }
