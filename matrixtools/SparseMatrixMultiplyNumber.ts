import { SparseMatrixMap } from "./SparseMatrixMap";
import { SparseMatrix } from "./SparseMatrix";

export function SparseMatrixMultiplyNumber<R extends number, C extends number>(
    value: number,
    matrix: SparseMatrix<R, C>
): SparseMatrix<R, C> {
    return SparseMatrixMap(matrix, (v) => v * value);
}
