import { Nodecoordinates } from "./Nodecoordinates";
import { cachenodecoordinatestostore } from "./cachenodecoordinatestostore";
import { SparseTwoDimensionalMatrixSymmetry } from "../matrixtools/SparseTwoDimensionalMatrixSymmetry";
import { SparseMatrixSymmetryCreate } from "../matrixtools/SparseMatrixSymmetryCreate";

// import { SparseTwoDimensionalMatrix } from "./SparseTwoDimensionalMatrix";

/* 获得缓存节点坐标和距离的数组的稀疏二维对称矩阵 */
export function getstoreofnodecoordinates(
    nodecoordinates: Nodecoordinates
): SparseTwoDimensionalMatrixSymmetry {
    return (
        cachenodecoordinatestostore.get(nodecoordinates) ??
        createdistancestore(nodecoordinates)
    );
}
function createdistancestore(
    nodecoordinates: Nodecoordinates
): SparseTwoDimensionalMatrixSymmetry<number> {
    const row = nodecoordinates.length;
    const euclideandistancerecord = SparseMatrixSymmetryCreate({
        row,
        column: row,
        default: -1,
    });
    cachenodecoordinatestostore.set(nodecoordinates, euclideandistancerecord);

    return euclideandistancerecord;
}
