import { SparseMatrixMap } from "./SparseMatrixMap";
import { SparseTwoDimensionalMatrix } from "./SparseTwoDimensionalMatrix";

export function SparseMatrixMultiplyNumber<R extends number, C extends number>(
    matrix: SparseTwoDimensionalMatrix<R, C>,
    value: number
): SparseTwoDimensionalMatrix<R, C> {
    return SparseMatrixMap(matrix, (v) => v * value);
}
