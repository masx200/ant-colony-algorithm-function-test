import { calc_relative_standard_deviation } from "../../functions/calc_relative_standard_deviation";
//相对一次标准差
it("relative_standard_deviation", () => {
    console.log("relative_standard_deviation start");
    expect(0).toEqual(calc_relative_standard_deviation([1, 1, 1]));

    const result1 = calc_relative_standard_deviation([1, 3, 4]);
    console.log("relative_standard_deviation of [1,3,4]", result1);
    expect(result1).toEqual(5 / 12);
});
