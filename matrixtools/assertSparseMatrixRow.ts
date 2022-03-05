import { SparseMatrix } from "./SparseMatrix";

export function assertSparseMatrixRow<R extends number>(
    matrix: SparseMatrix<number, number>,
    row: R
): asserts matrix is SparseMatrix<R, number> {
    if (matrix.row !== row) {
        throw Error("assert error SparseMatrixRow," + row);
    }
}
