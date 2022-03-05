import { SparseMatrixCreate } from "./SparseMatrixCreate";
import { SparseMatrix } from "./SparseMatrix";

export function SparseMatrixTranspose<R extends number, C extends number>(
    matrix: SparseMatrix<R, C>
): SparseMatrix<C, R> {
    const { row: column, column: row } = matrix;
    return SparseMatrixCreate<C, R>({
        row: row,
        column: column,
        initializer: (i, j) => {
            return matrix.get(j, i);
        },
    });
}
