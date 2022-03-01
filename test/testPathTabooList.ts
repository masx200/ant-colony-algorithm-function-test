import { isEqual } from "lodash";
import { createPathTabooList } from "../functions/PathTabooList";

export function testPathTabooList() {
    console.log("test PathTabooList start");

    const ptl = createPathTabooList(10);
    console.log(ptl);
    console.assert(ptl.size() === 0);

    console.assert(ptl.countofnodes == 10);
    ptl.add([1, 2]);
    ptl.add([2, 1]);
    console.assert(ptl.size() === 1);
    console.assert(ptl.has([2, 1]));
    console.assert(ptl.has([1, 2]));
    console.assert(!ptl.has([1, 2, 3]));
    console.assert(!ptl.delete([1, 2, 3]));
    ptl.add([2, 1, 3]);
    console.assert(ptl.has([2, 1, 3]));
    console.assert(ptl.has([3, 1, 2]));
    console.assert(ptl.size() === 2);
    console.assert(
        isEqual(ptl.keys(), [
            [1, 2],
            [2, 1, 3],
        ])
    );
    console.assert(
        isEqual(ptl.values(), [
            [1, 2],
            [2, 1, 3],
        ])
    );
    console.assert(!ptl.delete([1, 2, 3]));
    console.assert(ptl.size() === 2);
    console.assert(ptl.delete([3, 1, 2]));
    console.assert(ptl.size() === 1);
    ptl.clear();
    console.assert(ptl.size() === 0);

    ptl.add([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    ptl.add([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    ptl.add([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
    console.assert(ptl.size() === 1);
    console.assert(ptl.has([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));
    console.assert(ptl.has([2, 3, 4, 5, 6, 7, 8, 9, 0, 1]));
    console.assert(isEqual(ptl.values(), [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]]));
    console.assert(ptl.delete([2, 3, 4, 5, 6, 7, 8, 9, 0, 1]));
    console.assert(ptl.size() === 0);
    console.log("test PathTabooList end");
}
