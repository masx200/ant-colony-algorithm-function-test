import { asserttrue } from "../test/asserttrue";
import { SparseMatrixMap } from "./SparseMatrixMap";
import { SparseMatrix } from "./SparseMatrix";

export function SparseMatrixSubtract<R extends number, C extends number>(
    matrix1: SparseMatrix<R, C>,
    matrix2: SparseMatrix<R, C>
) {
    const { row, column } = matrix1;
    asserttrue(matrix2.row === row && matrix2.column === column);
    return SparseMatrixMap(matrix1, (v, i, j) => {
        return v - matrix2.get(i, j);
    });
}
