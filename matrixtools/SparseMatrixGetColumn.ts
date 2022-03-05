import { SparseMatrix } from "./SparseMatrix";

export const SparseMatrixGetColumn = (
    matrix: SparseMatrix,
    column: number
): number[] => {
    return Array(matrix.row)
        .fill(0)
        .map((_v, r) => {
            return matrix.get(column, r);
        });
};
