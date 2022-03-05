import { matrixkeyiterator } from "./matrixkeyiterator";
import { SparseMatrix } from "./SparseMatrix";
/**矩阵所有元素填充 */
export function SparseMatrixFill<R extends number, C extends number>(
    matrix: SparseMatrix<R, C>,
    value: number
): void {
    const { row, column } = matrix;

    for (let [i, j] of matrixkeyiterator(row, column)) {
        matrix.set(i, j, value);
    }
}
