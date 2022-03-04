import { SparseMatrixForEach } from "./SparseMatrixForEach";
import { SparseTwoDimensionalMatrix } from "./SparseTwoDimensionalMatrix";

export function SparseMatrixAssign<R extends number, C extends number>(
    matrix1: SparseTwoDimensionalMatrix<R, C>,
    matrix2: SparseTwoDimensionalMatrix<R, C>
): void {
    SparseMatrixForEach(matrix2, (v, i, j) => {
        matrix1.set(i, j, v);
    });
}
