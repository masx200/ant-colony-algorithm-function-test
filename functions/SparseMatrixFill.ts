import { matrixkeyiterator } from "./matrixkeyiterator";
import { SparseTwoDimensionalMatrix } from "./SparseTwoDimensionalMatrix";
/**矩阵所有元素填充 */
export function SparseMatrixFill<R extends number, C extends number>(
    matrix: SparseTwoDimensionalMatrix<R, C>,
    value: number
) {
    const { row, column } = matrix;

    for (let [i, j] of matrixkeyiterator(row, column)) {
        matrix.set(i, j, value);
    }
}
