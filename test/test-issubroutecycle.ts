import { issubroutecycle } from "../functions/issubroutecycle";
import { assert_true } from "./assert_true";

export function test_issubroutecycle() {
    // console.log("test_issubroutecycle start");

    assert_true(issubroutecycle([1, 2, 3, 4], [1, 2, 3, 4], 4));
    assert_true(issubroutecycle([1, 2, 3], [1, 2, 3], 4));
    assert_true(issubroutecycle([1, 2, 3, 4], [4, 1, 2, 3], 4));
    assert_true(issubroutecycle([1, 2, 3, 4], [4, 1, 2], 4));
    assert_true(!issubroutecycle([1, 2, 3, 4], [1, 2, 4], 4));
    assert_true(!issubroutecycle([4, 3, 2, 1], [1, 2, 4], 4));
    assert_true(!issubroutecycle([1, 2, 3, 4], [4, 2, 1], 4));

    assert_true(issubroutecycle([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4], 8));
    assert_true(issubroutecycle([1, 2, 3, 4, 5, 6, 7, 8], [2, 3, 4, 5], 8));
    assert_true(issubroutecycle([1, 2, 3, 4, 5, 6, 7, 8], [5, 4, 3, 2], 8));
    assert_true(issubroutecycle([1, 2, 3, 4, 5, 6, 7, 8], [2, 3, 4, 5], 9));
    assert_true(issubroutecycle([1, 2, 3, 4, 5, 6, 7, 8], [5, 4, 3, 2], 9));
    assert_true(!issubroutecycle([1, 2, 3, 4, 5], [4, 2, 1, 5, 3], 5));
    // console.log("test_issubroutecycle ok");
}
