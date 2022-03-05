import { asserttrue } from "../test/asserttrue";
import { SparseMatrixMap } from "./SparseMatrixMap";
import { SparseTwoDimensionalMatrix } from "./SparseTwoDimensionalMatrix";

export function SparseMatrixSubtract<R extends number, C extends number>(
    matrix1: SparseTwoDimensionalMatrix<R, C>,
    matrix2: SparseTwoDimensionalMatrix<R, C>
) {
    const { row, column } = matrix1;
    asserttrue(matrix2.row === row && matrix2.column === column);
    return SparseMatrixMap(matrix1, (v, i, j) => {
        return v - matrix2.get(i, j);
    });
}
