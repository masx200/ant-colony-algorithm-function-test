import { matrixkeyiterator } from "./matrixkeyiterator";
import { SparseTwoDimensionalMatrix } from "./SparseTwoDimensionalMatrix";

export function SparseMatrixForEach<R extends number, C extends number>(
    matrix: SparseTwoDimensionalMatrix<R, C>,
    callback: (value: number, row: number, column: number) => void
): void {
    const { row, column } = matrix;
    for (let [i, j] of matrixkeyiterator(row, column)) {
        const value = matrix.get(i, j);
        callback(value, i, j);
    }
}
