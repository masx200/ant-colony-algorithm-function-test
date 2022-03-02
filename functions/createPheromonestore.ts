// import { numberstostringkeysymmetry } from "./numberstostringkeysymmetry";
import { create_sparse_two_dimensional_matrix_symmetry } from "./sparse-two-dimensional-matrix-symmetry";
import { SparseTwoDimensionalMatrixSymmetry } from "./SparseTwoDimensionalMatrixSymmetry";

// import { stringkeytonumbers } from "./stringkeytonumbers";
/* 创建信息素仓库 */
export function createPheromonestore(
    scale: number
): SparseTwoDimensionalMatrixSymmetry {
    return create_sparse_two_dimensional_matrix_symmetry({
        row: scale,
        column: scale,
        default: -1,
    });
}
// /* 信息素存储 */
// const Pheromonesrecord = new Map<`${number},${number}`, number>();
// /* 获得信息素 */
// function get(left: number, right: number): number | undefined {
//     //信息素参数不分正反
//     return (
//         Pheromonesrecord.get(`${left},${right}`) ??
//         Pheromonesrecord.get(`${right},${left}`)
//     );
// }
// /* 修改信息素 */
// function set(left: number, right: number, Pheromone: number): void {
//     //参数排序
//     //信息素参数不分正反

//     Pheromonesrecord.set(numberstostringkeysymmetry(left, right), Pheromone);
// }
// // console.log(Pheromonesrecord);
// function values() {
//     return Array.from(Pheromonesrecord.values());
// }
// function keys(): [number, number][] {
//     return Array.from(Pheromonesrecord.keys()).map(stringkeytonumbers);
// }

// function entries(): [number, number, number][] {
//     return Array.from(Pheromonesrecord.entries()).map(([key, value]) => {
//         return [...stringkeytonumbers(key), value];
//     });
// }
// return {
//     values,
//     keys,
//     entries,
//     get,
//     set,
//     [Symbol.toStringTag]: "PheromoneStore",
// };
// }
