import { numberstostringkeynotsymmetry } from "../functions/numberstostringkeynotsymmetry";
import { matrixkeyiterator } from "./matrixkeyiterator";
import { SparseMatrixKey } from "./SparseMatrixKey";
import { SparseMatrix } from "./SparseMatrix";
import { asserttrue } from "../test/asserttrue";

export interface SparseMatrixOptions<
    R extends number = number,
    C extends number = number
> {
    row?: R;
    column?: C;
    default?: number;
    initializer?: (row: number, column: number) => number;
}

/* 创建稀疏二维矩阵 非对称*/
export function SparseMatrixCreate<
    R extends number = number,
    C extends number = number
>(opts?: SparseMatrixOptions<R, C>): SparseMatrix<R, C> {
    const { row = 1, column = 1, initializer } = opts || {};
    function assertnotoutofbounds(inputrow: number, inputcolumn: number) {
        //序号应该从0开始到row-1结束
        if (
            inputrow > row - 1 ||
            inputcolumn > column - 1 ||
            inputrow < 0 ||
            inputcolumn < 0
        ) {
            throw new Error(
                "row or column out of bounds:" + inputrow + "," + inputcolumn
            );
        } else {
            return true;
        }
    }
    if (!(row > 0 && column > 0)) {
        throw new Error(" row, column should greater than 0");
    }
    const valuesrecord = new Map<`${number},${number}`, number>();
    const defaultvalue = opts?.default ?? 0;
    function get(row: number, column: number): number {
        assertnotoutofbounds(row, column);
        return (
            valuesrecord.get(numberstostringkeynotsymmetry(row, column)) ??
            defaultvalue
        );
    }
    const at = (inputrow: number, inputcolumn: number) => {
        return get(
            inputrow < 0 ? row + inputrow : inputrow,
            inputcolumn < 0 ? column + inputcolumn : column
        );
    };

    function set(row: number, column: number, value: number): void {
        asserttrue(typeof value === "number");
        assertnotoutofbounds(row, column);
        valuesrecord.set(numberstostringkeynotsymmetry(row, column), value);
    }
    // console.log(valuesrecord);
    function values(): number[] {
        return Array.from(keys()).map(([left, right]) => {
            return get(left, right);
        });
        // return Array.from(valuesrecord.values());
    }
    function keys(): [number, number][] {
        return Array.from(matrixkeyiterator(row, column));
        // return Array.from(valuesrecord.keys()).map(stringkeytonumbers);
    }

    function entries(): [number, number, number][] {
        return Array.from(keys()).map(([left, right]) => {
            return [left, right, get(left, right)];
        });
    }
    const has = (row: number, column: number) =>
        valuesrecord.has(numberstostringkeynotsymmetry(row, column));

    const obj: SparseMatrix<R, C> = {
        at,
        [SparseMatrixKey]: true,
        row: row as R,
        column: column as C,
        // clear: () => valuesrecord.clear(),
        has,
        // size: () => valuesrecord.size,
        values,
        keys,
        entries,
        get,
        set,
        // delete: (row: number, column: number) => {
        //     return valuesrecord.delete(
        //         numberstostringkeynotsymmetry(row, column)
        //     );
        // },
        [Symbol.toStringTag]: "SparseMatrix",
    };

    if (initializer) {
        for (let [i, j] of matrixkeyiterator(row, column)) {
            const value = initializer(i, j);
            if (typeof value === "number") {
                obj.set(i, j, value);
            } else {
                throw new Error("invalid return value");
            }
        }
    }
    return obj;
}
