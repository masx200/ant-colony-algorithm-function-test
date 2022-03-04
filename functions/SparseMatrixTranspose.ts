import { SparseMatrixCreate } from "./SparseMatrixCreate";
import { SparseTwoDimensionalMatrix } from "./SparseTwoDimensionalMatrix";

export function SparseMatrixTranspose<R extends number, C extends number>(
    matrix: SparseTwoDimensionalMatrix<R, C>
): SparseTwoDimensionalMatrix<C, R> {
    const { row, column } = matrix;
    return SparseMatrixCreate<C, R>({
        row: row as unknown as C,
        column: column as unknown as R,
        initializer: (i, j) => {
            return matrix.get(j, i);
        },
    });
}
