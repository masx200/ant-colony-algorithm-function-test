import { SparseMatrix } from "./SparseMatrix";

export function SparseMatrixEvery<R extends number, C extends number>(
    matrix: SparseMatrix<R, C>,
    callback: (value: number, row: number, column: number) => boolean
): boolean {
    return Array.from(matrix.entries()).every(([i, j, v]) => {
        return callback(v, i, j);
    });
}
