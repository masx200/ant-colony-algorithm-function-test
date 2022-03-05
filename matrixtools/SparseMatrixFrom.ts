import { SparseMatrixCreate } from "./SparseMatrixCreate";
import { SparseMatrix } from "./SparseMatrix";

export function SparseMatrixFrom<R extends number, C extends number>(
    matrix: SparseMatrix<R, C>
): SparseMatrix<R, C> {
    const { row, column } = matrix;

    const obj = SparseMatrixCreate({
        row,
        column,
        initializer(i, j) {
            return matrix.get(i, j);
        },
    });
    return obj;
}
