import { SparseMatrixForEach } from "./SparseMatrixForEach";
import { SparseMatrixFrom } from "./SparseMatrixFrom";
import { SparseMatrix } from "./SparseMatrix";

export function SparseMatrixMap<R extends number, C extends number>(
    matrix: SparseMatrix<R, C>,
    callback: (value: number, row: number, column: number) => number
): SparseMatrix<R, C> {
    const result = SparseMatrixFrom(matrix);
    SparseMatrixForEach(matrix, (v, i, j) => {
        const value = callback(v, i, j);
        result.set(i, j, value);
    });
    return result;
}
