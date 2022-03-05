import { asserttrue } from "../test/asserttrue";
import { SparseMatrixForEach } from "./SparseMatrixForEach";
import { SparseMatrix } from "./SparseMatrix";

export function SparseMatrixAssign<R extends number, C extends number>(
    matrix1: SparseMatrix<R, C>,
    matrix2: SparseMatrix<R, C>
): void {
    const { row, column } = matrix1;
    asserttrue(matrix2.row === row && matrix2.column === column);
    SparseMatrixForEach(matrix2, (v, i, j) => {
        matrix1.set(i, j, v);
    });
}
