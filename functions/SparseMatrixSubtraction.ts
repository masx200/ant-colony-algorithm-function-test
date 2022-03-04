import { SparseMatrixMap } from "./SparseMatrixMap";
import { SparseTwoDimensionalMatrix } from "./SparseTwoDimensionalMatrix";

export function SparseMatrixSubtraction<R extends number, C extends number>(
    matrix1: SparseTwoDimensionalMatrix<R, C>,
    matrix2: SparseTwoDimensionalMatrix<R, C>
) {
    return SparseMatrixMap(matrix1, (v, i, j) => {
        return v - matrix2.get(i, j);
    });
}
