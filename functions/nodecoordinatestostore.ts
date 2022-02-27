import { Nodecoordinates } from "./Nodecoordinates";
/* 缓存节点坐标和距离的数组的map */
export const nodecoordinatestostore = new WeakMap<
    Nodecoordinates,
    Map<`${number},${number}`, number>
>();
// console.log(nodecoordinatestostore);
