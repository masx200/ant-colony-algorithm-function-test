import { SparseMatrix } from "./SparseMatrix";

export function isSparseMatrixColumn<C extends number>(
    matrix: SparseMatrix<number, number>,
    column: C
): matrix is SparseMatrix<number, C> {
    return matrix.column === column;
}
