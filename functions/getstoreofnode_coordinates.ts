import { NodeCoordinates } from "./NodeCoordinates";
import { cachenode_coordinatestostore } from "./cachenode_coordinatestostore";

import { createdistancestore } from "./createdistancestore";
import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";

// import { Matrix } from "./Matrix";

/* 获得缓存节点坐标和距离的数组的稀疏二维对称矩阵 */
export function getstoreofnode_coordinates(
    node_coordinates: NodeCoordinates
): MatrixSymmetry {
    return (
        cachenode_coordinatestostore.get(node_coordinates) ??
        createdistancestore(node_coordinates)
    );
}
