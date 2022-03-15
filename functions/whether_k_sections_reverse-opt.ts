import { random } from "lodash";

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
export function whether_k_sections_reverse_opt(
    max_of_results: number,
    k: number
): boolean[][] {
    const set = new Set<number>();
    const min_binary = 0;
    const max_binary = 2 ** k - 1;
    while (set.size < max_of_results) {
        set.add(random(min_binary, max_binary, false));
    }

    return Array.from(set).map((n) => {
        return n
            .toString(2)
            .padStart(k, "0")
            .split("")
            .map((a) => a === "1");
    });
}
