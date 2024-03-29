import { whether_k_sections_reverse_opt } from "../k-opt/whether_k_sections_reverse-opt";
import { it } from "vitest";
import { expect } from "vitest";
it("whether_k_sections_reverse_opt", () => {
    test1();

    test2();
});
function test2() {
    const result = Array.from(
        whether_k_sections_reverse_opt({ max_of_results: 30, k: 3 }),
    );
    //最多生成2^k条
    expect(result.length).toBe(8);
    expect(result.every((a) => a.length === 3)).toBe(true);
    expect(result.flat().every((a) => typeof a === "boolean")).toBe(true);
    // console.log("whether_k_sections_reverse_opt", "k=" + 3, result);
}

function test1() {
    const result = Array.from(
        whether_k_sections_reverse_opt({ max_of_results: 30, k: 7 }),
    );
    expect(result.length).toBe(30);
    expect(result.every((a) => a.length === 7)).toBe(true);
    expect(result.flat().every((a) => typeof a === "boolean")).toBe(true);
    // console.log("whether_k_sections_reverse_opt", "k=" + 7, result);
}
