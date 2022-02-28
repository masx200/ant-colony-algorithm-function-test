import { Nodecoordinates } from "./Nodecoordinates";
import { SparseTwoDimensionalMatrixSymmetry } from "./SparseTwoDimensionalMatrixSymmetry";
/* 缓存节点坐标和距离的数组的map */
export const nodecoordinatestostore = new WeakMap<
    Nodecoordinates,
    SparseTwoDimensionalMatrixSymmetry
>();
console.log(nodecoordinatestostore);
