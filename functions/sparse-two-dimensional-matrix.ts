import { numberstostringkeynotsymmetry } from "./numberstostringkeynotsymmetry";
import { SparseTwoDimensionalMatrix } from "./SparseTwoDimensionalMatrix";
import { stringkeytonumbers } from "./stringkeytonumbers";
/* 创建稀疏二维矩阵 非对称*/
export function create_sparse_two_dimensional_matrix(): SparseTwoDimensionalMatrix {
    const valuesrecord = new Map<`${number},${number}`, number>();

    function get(left: number, right: number): number | undefined {
        return valuesrecord.get(numberstostringkeynotsymmetry(left, right));
    }

    function set(left: number, right: number, value: number): void {
        valuesrecord.set(numberstostringkeynotsymmetry(left, right), value);
    }
    // console.log(valuesrecord);
    function values() {
        return Array.from(valuesrecord.values());
    }
    function keys(): [number, number][] {
        return Array.from(valuesrecord.keys()).map(stringkeytonumbers);
    }

    function entries(): [number, number, number][] {
        return Array.from(valuesrecord.entries()).map(([key, value]) => {
            return [...stringkeytonumbers(key), value];
        });
    }
    const has = (left: number, right: number) =>
        valuesrecord.has(numberstostringkeynotsymmetry(left, right));

    return {
        clear: () => valuesrecord.clear(),
        has,
        size: () => valuesrecord.size,
        values,
        keys,
        entries,
        get,
        set,
        delete: (left: number, right: number) => {
            return valuesrecord.delete(
                numberstostringkeynotsymmetry(left, right)
            );
        },
        [Symbol.toStringTag]: "SparseTwoDimensionalMatrix",
    };
}
