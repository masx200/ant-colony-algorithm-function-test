import { SparseMatrixCreate } from "./SparseMatrixCreate";
import { SparseMatrix } from "./SparseMatrix";
/**单位矩阵 */
export function SparseMatrixIdentity<R extends number, C extends number>({
    row,
    column,
}: {
    row: R;
    column: C;
}): SparseMatrix<R, C> {
    return SparseMatrixCreate({
        row: row,
        column: column,
        initializer: (i, j) => {
            return i === j ? 1 : 0;
        },
    });
}
