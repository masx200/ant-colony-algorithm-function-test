import { SparseMatrix } from "./SparseMatrix";

export function SparseMatrixToArrays(matrix: SparseMatrix): number[][] {
    const { row, column } = matrix;

    return Array(row)
        .fill([])
        .map((_v, r) => {
            return Array(column)
                .fill(0)
                .map((_v, c) => {
                    return matrix.get(r, c);
                });
        });
}
