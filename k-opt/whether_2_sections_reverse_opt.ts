/** 
[1,2,3,4]   [2,1,4,3]
[1,2,4,3]   [2,1,3,4]
*/
export function* whether_2_sections_reverse_opt(): Generator<
    [boolean, boolean],
    void,
    unknown
> {
    /*      [false, false],等于     [true, true], */
    /*    [true, false],,等于     [false, true], */
    yield[true, false];
    yield[false, false];
}
