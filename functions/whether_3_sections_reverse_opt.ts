/** 
0: (3) [true, true, true]
1: (3) [true, true, false]
2: (3) [true, false, true]
3: (3) [true, false, false]
4: (3) [false, true, true]
5: (3) [false, true, false]
6: (3) [false, false, true]
7: (3) [false, false, false]
*/
export function* whether_3_sections_reverse_opt(): Generator<
    [boolean, boolean, boolean],
    void,
    unknown
> {
    for (let i of [true, false]) {
        for (let j of [true, false]) {
            for (let k of [true, false]) {
                yield [i, j, k];
            }
        }
    }
}
