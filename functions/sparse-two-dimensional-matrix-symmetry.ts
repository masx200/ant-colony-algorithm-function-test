// import { numberstostringkeynotsymmetry } from "./numberstostringkeynotsymmetry";
import { create_sparse_two_dimensional_matrix } from "./sparse-two-dimensional-matrix";
// import { stringkeytonumbers } from "./stringkeytonumbers";
import { SparseTwoDimensionalMatrixSymmetry } from "./SparseTwoDimensionalMatrixSymmetry";

/**
 *
 * 创建稀疏二维矩阵对称式
 */
export function create_sparse_two_dimensional_matrix_symmetry(): SparseTwoDimensionalMatrixSymmetry {
    const SparseTwoDimensionalMatrix = create_sparse_two_dimensional_matrix();

    function get(left: number, right: number): number | undefined {
        return (
            SparseTwoDimensionalMatrix.get(left, right) ??
            SparseTwoDimensionalMatrix.get(right, left)
        );
    }

    function set(left: number, right: number, value: number): void {
        SparseTwoDimensionalMatrix.set(
            Math.min(left, right),
            Math.max(left, right),
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
    const has = (left: number, right: number) =>
        SparseTwoDimensionalMatrix.has(left, right) ||
        SparseTwoDimensionalMatrix.has(right, left);

    return {
        delete: (left: number, right: number) => {
            return SparseTwoDimensionalMatrix.delete(
                Math.min(left, right),
                Math.max(left, right)
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
}
