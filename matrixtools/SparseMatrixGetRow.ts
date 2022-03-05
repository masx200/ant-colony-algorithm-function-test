import { SparseMatrix } from "./SparseMatrix";

export const SparseMatrixGetRow = (
    matrix: SparseMatrix,
    row: number
): number[] => {
    return Array(matrix.column)
        .fill(0)
        .map((_v, c) => {
            return matrix.get(row, c);
        });
};
