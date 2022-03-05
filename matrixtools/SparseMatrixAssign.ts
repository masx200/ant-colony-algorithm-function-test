import { asserttrue } from "../test/asserttrue";
import { SparseMatrixForEach } from "./SparseMatrixForEach";
import { SparseTwoDimensionalMatrix } from "./SparseTwoDimensionalMatrix";

export function SparseMatrixAssign<R extends number, C extends number>(
    matrix1: SparseTwoDimensionalMatrix<R, C>,
    matrix2: SparseTwoDimensionalMatrix<R, C>
): void {
    const { row, column } = matrix1;
    asserttrue(matrix2.row === row && matrix2.column === column);
    SparseMatrixForEach(matrix2, (v, i, j) => {
        matrix1.set(i, j, v);
    });
}
