import { whether_k_sections_reverse_opt } from "../../functions/whether_k_sections_reverse-opt";

it("whether_k_sections_reverse_opt", () => {
    const result = Array.from(whether_k_sections_reverse_opt(30, 7));
    expect(result.length).toBe(30);
    expect(result.every((a) => a.length === 7)).toBe(true);
    expect(result.flat().every((a) => typeof a === "boolean")).toBe(true);
    console.log("whether_k_sections_reverse_opt", result);
});
