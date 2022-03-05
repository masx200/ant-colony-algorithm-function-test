import { SparseMatrixCreate } from "./SparseMatrixCreate";
import { SparseMatrix } from "./SparseMatrix";
const keysofmatrix = Reflect.ownKeys(SparseMatrixCreate({ row: 1, column: 1 }));
export function isSparseMatrix(
    matrix: any
): matrix is SparseMatrix<number, number> {
    return keysofmatrix.every((key) => {
        return Reflect.has(matrix, key);
    });
}
