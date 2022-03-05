import { asserttrue } from "../test/asserttrue";
import { SparseMatrixMap } from "./SparseMatrixMap";
import { SparseMatrix } from "./SparseMatrix";

export function SparseMatrixAdd<R extends number, C extends number>(
    matrix1: SparseMatrix<R, C>,
    ...matrixs: SparseMatrix<R, C>[]
) {
    const { row, column } = matrix1;
    asserttrue(
        matrixs.every((m) => {
            return m.row === row && m.column === column;
        })
    );
    return matrixs.reduce((a, m) => {
        return SparseMatrixMap(a, (v, i, j) => {
            return v + m.get(i, j);
        });
    }, matrix1);
}
