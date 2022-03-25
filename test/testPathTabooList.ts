import { isEqual } from "lodash";
import { createpathTabooList } from "../pathTabooList/createPathTabooList";
import { ispathTabooList } from "../pathTabooList/isPathTabooList";
import { pathTabooListFrom } from "../pathTabooList/PathTabooListFrom";
import { pathTabooListToJSON } from "../pathTabooList/PathTabooListToJSON";

import { assertshouldcatcherror } from "./assertshouldcatcherror";
import { asserttrue } from "./asserttrue";

export function testpathTabooList() {
    // console.log("test pathTabooList start");

    const ptl = createpathTabooList(10);
    asserttrue(ptl.count_of_nodes === 10);
    const ptlclone = pathTabooListFrom(ptl);
    asserttrue(!isEqual(ptlclone, ptl));
    asserttrue(ispathTabooList(ptlclone));
    asserttrue(ptlclone.count_of_nodes == 10);
    asserttrue(ispathTabooList(ptl));
    assertshouldcatcherror(() => {
        createpathTabooList(0);
    });
    assertshouldcatcherror(() => {
        createpathTabooList(1);
    });
    // console.log(ptl);
    asserttrue(ptl.size() === 0);

    asserttrue(ptl.count_of_nodes == 10);
    ptl.add([1, 2]);
    ptl.add([2, 1]);
    asserttrue(ptl.size() === 1);
    asserttrue(ptl.has([2, 1]));
    asserttrue(ptl.has([1, 2]));
    asserttrue(!ptl.has([1, 2, 3]));
    asserttrue(!ptl.delete([1, 2, 3]));
    ptl.add([2, 1, 3]);
    asserttrue(ptl.has([2, 1, 3]));
    asserttrue(ptl.has([3, 1, 2]));
    asserttrue(ptl.size() === 2);
    asserttrue(
        isEqual(ptl.keys(), [
            [1, 2],
            [2, 1, 3],
        ])
    );
    asserttrue(
        isEqual(ptl.values(), [
            [1, 2],
            [2, 1, 3],
        ])
    );
    asserttrue(!ptl.delete([1, 2, 3]));
    asserttrue(ptl.size() === 2);
    // console.log(ptl.values());
    asserttrue(ptl.has([3, 1, 2]));
    asserttrue(ptl.delete([3, 1, 2]));
    asserttrue(!ptl.has([3, 1, 2]));
    // console.log(ptl.values());
    asserttrue(isEqual(ptl.values(), [[1, 2]]), "ptl.values");
    asserttrue(ptl.size() === 1, "ptl.size");
    ptl.clear();
    asserttrue(ptl.size() === 0);

    ptl.add([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    assertshouldcatcherror(() => {
        ptl.add([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10]);
    });

    ptl.add([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    ptl.add([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
    asserttrue(ptl.size() === 1);
    asserttrue(ptl.has([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));
    asserttrue(ptl.has([2, 3, 4, 5, 6, 7, 8, 9, 0, 1]));
    asserttrue(isEqual(ptl.values(), [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]]));

    const jsonofptl = pathTabooListToJSON(ptl);
    // console.log(jsonofptl);
    asserttrue(
        isEqual(jsonofptl, {
            count_of_nodes: 10,
            values: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]],
        })
    );

    asserttrue(ptl.delete([2, 3, 4, 5, 6, 7, 8, 9, 0, 1]));
    asserttrue(ptl.size() === 0);
    // console.log("test pathTabooList end");
}
