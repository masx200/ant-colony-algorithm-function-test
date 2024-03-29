import { whether_3_sections_reverse_opt } from "../k-opt/whether_3_sections_reverse_opt";
import { it } from "vitest";
import { expect } from "vitest";
it("whether_3_sections_reverse_opt", () => {
    const result = Array.from(whether_3_sections_reverse_opt());
    expect(result.length).toBe(8);
    expect(result.every((a) => a.length === 3)).toBe(true);
    expect(result.flat().every((a) => typeof a === "boolean")).toBe(true);
    // console.log("whether_3_sections_reverse_opt", result);
});
