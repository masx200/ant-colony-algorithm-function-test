import { isEqual } from "lodash";
import { createpathTabooList } from "../pathTabooList/createPathTabooList";
import { ispathTabooList } from "../pathTabooList/isPathTabooList";
import { pathTabooListFrom } from "../pathTabooList/PathTabooListFrom";
import { pathTabooListToJSON } from "../pathTabooList/PathTabooListToJSON";

import { assertshouldcatcherror } from "./assertshouldcatcherror";
import { assert_true } from "./assert_true";

export function testpathTabooList() {
    // console.log("test pathTabooList start");

    const ptl = createpathTabooList(10);
    assert_true(ptl.count_of_nodes === 10);
    const ptlclone = pathTabooListFrom(ptl);
    assert_true(!isEqual(ptlclone, ptl));
    assert_true(ispathTabooList(ptlclone));
    assert_true(ptlclone.count_of_nodes == 10);
    assert_true(ispathTabooList(ptl));
    assertshouldcatcherror(() => {
        createpathTabooList(0);
    });
    assertshouldcatcherror(() => {
        createpathTabooList(1);
    });
    // console.log(ptl);
    assert_true(ptl.size() === 0);

    assert_true(ptl.count_of_nodes == 10);
    ptl.add([1, 2]);
    ptl.add([2, 1]);
    assert_true(ptl.size() === 1);
    assert_true(ptl.has([2, 1]));
    assert_true(ptl.has([1, 2]));
    assert_true(!ptl.has([1, 2, 3]));
    assert_true(!ptl.delete([1, 2, 3]));
    ptl.add([2, 1, 3]);
    assert_true(ptl.has([2, 1, 3]));
    assert_true(ptl.has([3, 1, 2]));
    assert_true(ptl.size() === 2);
    assert_true(
        isEqual(ptl.keys(), [
            [1, 2],
            [2, 1, 3],
        ])
    );
    assert_true(
        isEqual(ptl.values(), [
            [1, 2],
            [2, 1, 3],
        ])
    );
    assert_true(!ptl.delete([1, 2, 3]));
    assert_true(ptl.size() === 2);
    // console.log(ptl.values());
    assert_true(ptl.has([3, 1, 2]));
    assert_true(ptl.delete([3, 1, 2]));
    assert_true(!ptl.has([3, 1, 2]));
    // console.log(ptl.values());
    assert_true(isEqual(ptl.values(), [[1, 2]]), "ptl.values");
    assert_true(ptl.size() === 1, "ptl.size");
    ptl.clear();
    assert_true(ptl.size() === 0);

    ptl.add([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    assertshouldcatcherror(() => {
        ptl.add([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10]);
    });

    ptl.add([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    ptl.add([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
    assert_true(ptl.size() === 1);
    assert_true(ptl.has([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));
    assert_true(ptl.has([2, 3, 4, 5, 6, 7, 8, 9, 0, 1]));
    assert_true(isEqual(ptl.values(), [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]]));

    const jsonofptl = pathTabooListToJSON(ptl);
    // console.log(jsonofptl);
    assert_true(
        isEqual(jsonofptl, {
            count_of_nodes: 10,
            values: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]],
        })
    );

    assert_true(ptl.delete([2, 3, 4, 5, 6, 7, 8, 9, 0, 1]));
    assert_true(ptl.size() === 0);
    // console.log("test pathTabooList end");
}
