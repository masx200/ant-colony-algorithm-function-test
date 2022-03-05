import { SparseMatrix } from "./SparseMatrix";

export function assertSparseMatrixRowColumn<R extends number, C extends number>(
    matrix: SparseMatrix<number, number>,
    row: R,
    column: C
): asserts matrix is SparseMatrix<R, C> {
    if (matrix.column !== column || matrix.row !== row) {
        throw Error(
            "assert error SparseMatrix row column," + row + "," + column
        );
    }
}
