import { Nodecoordinates } from "./Nodecoordinates";
import { cachenodecoordinatestostore } from "./cachenodecoordinatestostore";
import { SparseMatrixSymmetry } from "../matrixtools/SparseMatrixSymmetry";
import { createdistancestore } from "./createdistancestore";

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
