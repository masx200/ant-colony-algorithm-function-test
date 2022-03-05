import { asserttrue } from "../test/asserttrue";
import { SparseMatrixMap } from "./SparseMatrixMap";
import { SparseTwoDimensionalMatrix } from "./SparseTwoDimensionalMatrix";

export function SparseMatrixMax<R extends number, C extends number>(
    matrix1: SparseTwoDimensionalMatrix<R, C>,
    ...matrixs: SparseTwoDimensionalMatrix<R, C>[]
) {
    const { row, column } = matrix1;
    asserttrue(
        matrixs.every((m) => {
            return m.row === row && m.column === column;
        })
    );
    return matrixs.reduce((a, m) => {
        return SparseMatrixMap(a, (v, i, j) => {
            return Math.max(v + m.get(i, j));
        });
    }, matrix1);
}
