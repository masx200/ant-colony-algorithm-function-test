import { SparseMatrixCreate } from "./SparseMatrixCreate";
import { SparseTwoDimensionalMatrix } from "./SparseTwoDimensionalMatrix";

export function SparseMatrixTranspose<R extends number, C extends number>(
    matrix: SparseTwoDimensionalMatrix<R, C>
): SparseTwoDimensionalMatrix<C, R> {
    const { row: column, column: row } = matrix;
    return SparseMatrixCreate<C, R>({
        row: row,
        column: column,
        initializer: (i, j) => {
            return matrix.get(j, i);
        },
    });
}
