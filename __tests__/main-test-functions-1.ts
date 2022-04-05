import "core-js/actual/array/at";
import { test_issubroutecycle } from "../test/test-issubroutecycle";
import { testcheckcurrentsegmentsintersectnextsegment } from "../test/testcheckcurrentsegmentsintersectnextsegment";
import { testclosedtotalpathlength } from "../test/testclosedtotalpathlength";
import { testpathTabooList } from "../test/testPathTabooList";
import { testgreedynode_coordinates6 } from "../test/testgreedynode_coordinates6";

it("main test functions-1", () => {
    test_issubroutecycle();
    testpathTabooList();
    testcheckcurrentsegmentsintersectnextsegment();
    testclosedtotalpathlength();
    testgreedynode_coordinates6();
});
