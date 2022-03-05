import { Nodecoordinates } from "./Nodecoordinates";
import { cachenodecoordinatestostore } from "./cachenodecoordinatestostore";
import { SparseMatrixSymmetry } from "../matrixtools/SparseMatrixSymmetry";
import { SparseMatrixSymmetryCreate } from "../matrixtools/SparseMatrixSymmetryCreate";

// import { SparseMatrix } from "./SparseMatrix";

/* 获得缓存节点坐标和距离的数组的稀疏二维对称矩阵 */
export function getstoreofnodecoordinates(
    nodecoordinates: Nodecoordinates
): SparseMatrixSymmetry {
    return (
        cachenodecoordinatestostore.get(nodecoordinates) ??
        createdistancestore(nodecoordinates)
    );
}
function createdistancestore(
    nodecoordinates: Nodecoordinates
): SparseMatrixSymmetry<number> {
    const row = nodecoordinates.length;
    const euclideandistancerecord = SparseMatrixSymmetryCreate({
        row,
        column: row,
        // default: -1,
    });
    cachenodecoordinatestostore.set(nodecoordinates, euclideandistancerecord);

    return euclideandistancerecord;
}
