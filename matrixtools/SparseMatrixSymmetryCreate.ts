import { matrixkeyiterator } from "./matrixkeyiterator";
import { SparseMatrixCreate, SparseMatrixOptions } from "./SparseMatrixCreate";
import { SparseTwoDimensionalMatrixSymmetry } from "./SparseTwoDimensionalMatrixSymmetry";

/**
 *
 * 创建稀疏二维矩阵对称式
 */
export function SparseMatrixSymmetryCreate<R extends number>(
    opts: SparseMatrixOptions<R, R>
): SparseTwoDimensionalMatrixSymmetry<R> {
    const { row, column } = opts;
    function checkoutofbounds(inputrow: number, inputcolumn: number) {
        //序号应该从0开始到row-1结束
        if (
            inputrow > opts.row - 1 ||
            inputcolumn > opts.column - 1 ||
            inputrow < 0 ||
            inputcolumn < 0
        ) {
            throw new Error("row or column out of bounds");
        }
    }
    if (row !== column) {
        throw new Error("Symmetry Matrix , row, column should equal");
    }
    const { initializer, ...rest } = opts;
    const SparseTwoDimensionalMatrix = SparseMatrixCreate(rest);

    function get(row: number, column: number): number {
        checkoutofbounds(row, column);
        return SparseTwoDimensionalMatrix.has(row, column)
            ? SparseTwoDimensionalMatrix.get(row, column)
            : SparseTwoDimensionalMatrix.has(column, row)
            ? SparseTwoDimensionalMatrix.get(column, row)
            : opts.default ?? 0;
    }

    function set(row: number, column: number, value: number): void {
        checkoutofbounds(row, column);
        SparseTwoDimensionalMatrix.set(
            Math.min(row, column),
            Math.max(row, column),
            value
        );
    }
    // console.log(SparseTwoDimensionalMatrix);
    function values() {
        return Array.from(SparseTwoDimensionalMatrix.values());
    }
    function keys(): [number, number][] {
        return Array.from(SparseTwoDimensionalMatrix.keys());
    }

    function entries(): [number, number, number][] {
        return Array.from(SparseTwoDimensionalMatrix.entries());
    }
    const has = (row: number, column: number) =>
        SparseTwoDimensionalMatrix.has(row, column) ||
        SparseTwoDimensionalMatrix.has(column, row);

    const obj: SparseTwoDimensionalMatrixSymmetry<R> = {
        row,
        column,
        delete: (row: number, column: number) => {
            return SparseTwoDimensionalMatrix.delete(
                Math.min(row, column),
                Math.max(row, column)
            );
        },
        has,
        clear: SparseTwoDimensionalMatrix.clear,
        size: SparseTwoDimensionalMatrix.size,
        symmetry: true,
        values,
        keys,
        entries,
        get,
        set,
        [Symbol.toStringTag]: "SparseTwoDimensionalMatrixSymmetry",
    };
    if (initializer) {
        for (let [i, j] of matrixkeyiterator(row, column)) {
            const value = initializer(i, j);
            if (typeof value === "number") {
                obj.set(i, j, value);
            }
        }
    }
    return obj;
}
