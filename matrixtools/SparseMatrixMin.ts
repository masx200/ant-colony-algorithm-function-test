import { SparseMatrix } from "./SparseMatrix";
import { SparseMatrixReduce } from "./SparseMatrixReduce";

export function SparseMatrixMin<R extends number, C extends number>(
    matrix1: SparseMatrix<R, C>,
    ...matrixs: SparseMatrix<R, C>[]
) {
    return SparseMatrixReduce(
        (previousValue: number, currentValue: number) => {
            return Math.min(previousValue, currentValue);
        },
        matrix1,
        ...matrixs
    );
}
