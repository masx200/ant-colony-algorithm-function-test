import { SparseMatrixCreate } from "./SparseMatrixCreate";
import { SparseMatrix } from "./SparseMatrix";
/**单位矩阵 */
export function SparseMatrixZeros<R extends number, C extends number>({
    row,
    column,
}: {
    row: R;
    column: C;
}): SparseMatrix<R, C> {
    return SparseMatrixCreate({
        row: row,
        column: column,
        initializer: () => {
            return 0;
        },
    });
}
