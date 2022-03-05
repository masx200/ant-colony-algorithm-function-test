import { SparseMatrix } from "./SparseMatrix";

export function assertSparseMatrixColumn<C extends number>(
    matrix: SparseMatrix<number, number>,
    column: C
): asserts matrix is SparseMatrix<number, C> {
    if (matrix.column !== column) {
        throw Error("assert error SparseMatrix column," + column);
    }
}
