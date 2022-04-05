import { calc_relative_deviation_from_optimal } from "../functions/calc_relative_deviation_from_optimal";
//与最优的相对偏差
it("relative_deviation_from_optimal", () => {
    // console.log("relative_deviation_from_optimal start");
    expect(0).toEqual(calc_relative_deviation_from_optimal([1, 1, 1], 1));

    const result1 = calc_relative_deviation_from_optimal([1, 3, 4], 8 / 3);
    // console.log("relative_deviation_from_optimal of [1,3,4]", result1);
    expect(result1).toEqual(5 / 12);
});
