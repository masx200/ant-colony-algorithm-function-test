import { sum } from "lodash";
import { asserttrue } from "../test/asserttrue";
/**相对一次标准差 */
export function calc_relative_standard_deviation(arg0: number[]): number {
    asserttrue(arg0.length > 0);
    const length = arg0.length;
    const avarage = sum(arg0) / length;

    const Standard_Deviation =
        sum(arg0.map((a) => Math.abs(a - avarage))) / length;
    return Standard_Deviation / avarage;
}
