import { SparseMatrix } from "./SparseMatrix";

export function isSparseMatrixRow<R extends number>(
    matrix: SparseMatrix<number, number>,
    row: R
): matrix is SparseMatrix<R, number> {
    return matrix.row === row;
}
