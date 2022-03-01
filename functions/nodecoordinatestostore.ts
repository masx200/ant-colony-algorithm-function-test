import { Nodecoordinates } from "./Nodecoordinates";
import { SparseTwoDimensionalMatrixSymmetry } from "./SparseTwoDimensionalMatrixSymmetry";
/* 缓存节点坐标和距离的稀疏二维对称矩阵 */
export const nodecoordinatestostore = new WeakMap<
    Nodecoordinates,
    SparseTwoDimensionalMatrixSymmetry
>();
console.log(nodecoordinatestostore);
