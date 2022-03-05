import { dot } from "mathjs";
import { asserttrue } from "../test/asserttrue";
import { SparseMatrix } from "./SparseMatrix";
import { SparseMatrixCreate } from "./SparseMatrixCreate";
import { SparseMatrixGetColumn } from "./SparseMatrixGetColumn";
import { SparseMatrixGetRow } from "./SparseMatrixGetRow";

export function SparseMatrixMultiplyMatrix<
    M extends number,
    P extends number,
    N extends number
>(
    matrix1: SparseMatrix<M, P>,
    matrix2: SparseMatrix<P, N>
): SparseMatrix<M, N> {
    const row = matrix1.row;
    const column = matrix2.column;
    asserttrue(matrix1.column === matrix2.row);
    const result = SparseMatrixCreate({
        row,
        column,
        initializer: (i, j) =>
            dot(
                SparseMatrixGetRow(matrix1, i),
                SparseMatrixGetColumn(matrix2, j)
            ),
    });
    return result;
}
