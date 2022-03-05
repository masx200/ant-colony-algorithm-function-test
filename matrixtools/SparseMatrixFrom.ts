import { SparseMatrixCreate } from "./SparseMatrixCreate";
import { SparseTwoDimensionalMatrix } from "./SparseTwoDimensionalMatrix";

export function SparseMatrixFrom<R extends number, C extends number>(
    matrix: SparseTwoDimensionalMatrix<R, C>
): SparseTwoDimensionalMatrix<R, C> {
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
