import { issubroutecycle } from "../functions/issubroutecycle";
import { asserttrue } from "./asserttrue";

export function test_issubroutecycle() {
    // console.log("test_issubroutecycle start");

    asserttrue(issubroutecycle([1, 2, 3, 4], [1, 2, 3, 4], 4));
    asserttrue(issubroutecycle([1, 2, 3], [1, 2, 3], 4));
    asserttrue(issubroutecycle([1, 2, 3, 4], [4, 1, 2, 3], 4));
    asserttrue(issubroutecycle([1, 2, 3, 4], [4, 1, 2], 4));
    asserttrue(!issubroutecycle([1, 2, 3, 4], [1, 2, 4], 4));
    asserttrue(!issubroutecycle([4, 3, 2, 1], [1, 2, 4], 4));
    asserttrue(!issubroutecycle([1, 2, 3, 4], [4, 2, 1], 4));

    asserttrue(issubroutecycle([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4], 8));
    asserttrue(issubroutecycle([1, 2, 3, 4, 5, 6, 7, 8], [2, 3, 4, 5], 8));
    asserttrue(issubroutecycle([1, 2, 3, 4, 5, 6, 7, 8], [5, 4, 3, 2], 8));
    asserttrue(issubroutecycle([1, 2, 3, 4, 5, 6, 7, 8], [2, 3, 4, 5], 9));
    asserttrue(issubroutecycle([1, 2, 3, 4, 5, 6, 7, 8], [5, 4, 3, 2], 9));
    asserttrue(!issubroutecycle([1, 2, 3, 4, 5], [4, 2, 1, 5, 3], 5));
    // console.log("test_issubroutecycle ok");
}
