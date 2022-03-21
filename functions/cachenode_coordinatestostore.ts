import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { NodeCoordinates } from "./NodeCoordinates";

/* 缓存节点坐标和距离的稀疏二维对称矩阵 */
export const cachenode_coordinatestostore = new WeakMap<
    NodeCoordinates,
    MatrixSymmetry
>();
console.log(cachenode_coordinatestostore);
