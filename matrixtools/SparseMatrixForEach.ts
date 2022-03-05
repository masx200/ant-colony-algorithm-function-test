import { matrixkeyiterator } from "./matrixkeyiterator";
import { SparseMatrix } from "./SparseMatrix";

export function SparseMatrixForEach<R extends number, C extends number>(
    matrix: SparseMatrix<R, C>,
    callback: (value: number, row: number, column: number) => void
): void {
    const { row, column } = matrix;
    for (let [i, j] of matrixkeyiterator(row, column)) {
        const value = matrix.get(i, j);
        callback(value, i, j);
    }
}
