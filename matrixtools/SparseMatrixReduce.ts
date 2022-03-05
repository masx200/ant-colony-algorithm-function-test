import { asserttrue } from "../test/asserttrue";
import { SparseMatrix } from "./SparseMatrix";
import { SparseMatrixMap } from "./SparseMatrixMap";

export function SparseMatrixReduce<R extends number, C extends number>(
    callback: (
        previousValue: number,
        currentValue: number,
        row: number,
        column: number
    ) => number,
    matrix1: SparseMatrix<R, C>,
    ...matrixs: SparseMatrix<R, C>[]
) {
    asserttrue(matrixs.length, "invalid arguments matrixs");
    const { row, column } = matrix1;
    asserttrue(
        matrixs.every((m) => {
            return m.row === row && m.column === column;
        })
    );
    return matrixs.reduce((previousmatrix, m) => {
        return SparseMatrixMap(previousmatrix, (previousvalue, i, j) => {
            return callback(previousvalue, m.get(i, j), i, j);
        });
    }, matrix1);
}
