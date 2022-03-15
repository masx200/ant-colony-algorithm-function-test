import { sum } from "lodash";
import { asserttrue } from "../test/asserttrue";
/**相对标准差 */
export function calc_relative_standard_deviation(arg0: number[]): number {
    asserttrue(arg0.length > 0);
    const length = arg0.length;
    const avarage = sum(arg0) / length;

    const Standard_Deviation = Math.sqrt(
        sum(arg0.map((a) => Math.pow(a - avarage, 2))) / length
    );
    return Standard_Deviation / avarage;
}
