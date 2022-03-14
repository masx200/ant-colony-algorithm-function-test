import { Nodecoordinates } from "./Nodecoordinates";
import { cachenodecoordinatestostore } from "./cachenodecoordinatestostore";

import { createdistancestore } from "./createdistancestore";
import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";

// import { Matrix } from "./Matrix";

/* 获得缓存节点坐标和距离的数组的稀疏二维对称矩阵 */
export function getstoreofnodecoordinates(
    nodecoordinates: Nodecoordinates
): MatrixSymmetry {
    return (
        cachenodecoordinatestostore.get(nodecoordinates) ??
        createdistancestore(nodecoordinates)
    );
}
