import { SparseMatrix } from "./SparseMatrix";

export function SparseMatrixSome<R extends number, C extends number>(
    matrix: SparseMatrix<R, C>,
    callback: (value: number, row: number, column: number) => boolean
): boolean {
    return Array.from(matrix.entries()).some(([i, j, v]) => {
        return callback(v, i, j);
    });
}
