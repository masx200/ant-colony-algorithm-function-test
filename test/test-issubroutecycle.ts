import { issubroutecycle } from "../functions/issubroutecycle";

export function test_issubroutecycle() {
    console.log("test_issubroutecycle start");

    console.assert(issubroutecycle([1, 2, 3, 4], [1, 2, 3, 4], 4));
    console.assert(issubroutecycle([1, 2, 3], [1, 2, 3], 4));
    console.assert(issubroutecycle([1, 2, 3, 4], [4, 1, 2, 3], 4));
    console.assert(issubroutecycle([1, 2, 3, 4], [4, 1, 2], 4));
    console.assert(!issubroutecycle([1, 2, 3, 4], [1, 2, 4], 4));
    console.assert(!issubroutecycle([4, 3, 2, 1], [1, 2, 4], 4));
    console.assert(!issubroutecycle([1, 2, 3, 4], [4, 2, 1], 4));

    console.assert(issubroutecycle([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4], 8));
    console.assert(issubroutecycle([1, 2, 3, 4, 5, 6, 7, 8], [2, 3, 4, 5], 8));
    console.assert(issubroutecycle([1, 2, 3, 4, 5, 6, 7, 8], [5, 4, 3, 2], 8));
    console.assert(issubroutecycle([1, 2, 3, 4, 5, 6, 7, 8], [2, 3, 4, 5], 9));
    console.assert(issubroutecycle([1, 2, 3, 4, 5, 6, 7, 8], [5, 4, 3, 2], 9));
    console.log("test_issubroutecycle ok");
}
