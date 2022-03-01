import { Nodecoordinates } from "./Nodecoordinates";
import { nodecoordinatestostore } from "./nodecoordinatestostore";
import { create_sparse_two_dimensional_matrix_symmetry } from "./sparse-two-dimensional-matrix-symmetry";
// import { SparseTwoDimensionalMatrix } from "./SparseTwoDimensionalMatrix";
import { SparseTwoDimensionalMatrixSymmetry } from "./SparseTwoDimensionalMatrixSymmetry";
/* 获得缓存节点坐标和距离的数组的稀疏二维对称矩阵 */
export function getstoreofnodecoordinates(
    nodecoordinates: Nodecoordinates
): SparseTwoDimensionalMatrixSymmetry {
    return (
        nodecoordinatestostore.get(nodecoordinates) ??
        (() => {
            const euclideandistancerecord =
                create_sparse_two_dimensional_matrix_symmetry();
            nodecoordinatestostore.set(
                nodecoordinates,
                euclideandistancerecord
            );

            return euclideandistancerecord;
        })()
    );
}
