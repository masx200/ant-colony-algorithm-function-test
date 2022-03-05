import { asserttrue } from "../test/asserttrue";
import { SparseMatrix } from "./SparseMatrix";
import { SparseMatrixCreate } from "./SparseMatrixCreate";

export function SparseMatrixOfArrays(arrays: number[][]): SparseMatrix {
    const row = arrays.length;
    const column = arrays[0]?.length;

    asserttrue(row > 0 && column > 0, "row and column should greater than 0");

    return SparseMatrixCreate({
        row,
        column,
        initializer: (i, j) => arrays[i]?.[j],
    });
}
