import { asserttrue } from "../test/asserttrue";

import { SparseMatrix } from "./SparseMatrix";

export function SparseMatrixEquals<R extends number, C extends number>(
    matrix1: SparseMatrix<R, C>,
    ...matrixs: SparseMatrix<R, C>[]
): boolean {
    asserttrue(matrixs.length, "invalid arguments matrixs");
    const { row, column } = matrix1;
    return matrixs.every((m) => {
        return (
            m.row === row &&
            m.column === column &&
            m.keys().every(([i, j]) => {
                return m.get(i, j) === matrix1.get(i, j);
            })
        );
    });
}
