import { SparseMatrixCreate } from "./SparseMatrixCreate";
import { SparseTwoDimensionalMatrix } from "./SparseTwoDimensionalMatrix";

export function SparseMatrixFrom(
    matrix: SparseTwoDimensionalMatrix
): SparseTwoDimensionalMatrix {
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
