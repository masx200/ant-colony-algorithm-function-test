// import { numberstostringkeynotsymmetry } from "./numberstostringkeynotsymmetry";
import { create_sparse_two_dimensional_matrix } from "./sparse-two-dimensional-matrix";
// import { stringkeytonumbers } from "./stringkeytonumbers";
import { SparseTwoDimensionalMatrixSymmetry } from "./SparseTwoDimensionalMatrixSymmetry";
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
    return {
        symmetry: true,
        values,
        keys,
        entries,
        get,
        set,
        [Symbol.toStringTag]: "SparseTwoDimensionalMatrixSymmetry",
    };
}
