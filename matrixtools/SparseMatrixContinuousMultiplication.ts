import { assertnumber } from "../test/assertnumber";
import { SparseMatrix } from "./SparseMatrix";
import { SparseMatrixMultiplyMatrix } from "./SparseMatrixMultiplyMatrix";
import { assertSparseMatrixRowColumn } from "./assertSparseMatrixRowColumn";

export function SparseMatrixContinuousMultiplication<
    M extends number,
    N extends number
>(
    matrix1: SparseMatrix<M, number>,
    ...matrixs: [...SparseMatrix[], SparseMatrix<number, N>]
): SparseMatrix<M, N> {
    const row = matrix1.row;
    const column = matrixs.at(-1)?.column;
    assertnumber(column);
    const result: SparseMatrix<number, number> = matrixs.reduce(
        (previous, current) => {
            return SparseMatrixMultiplyMatrix(previous, current);
        },
        matrix1
    );
    assertSparseMatrixRowColumn(result, row, column as N);

    return result;
}
