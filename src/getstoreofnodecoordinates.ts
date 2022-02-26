import { Nodecoordinates } from "./Nodecoordinates";
import { nodecoordinatestostore } from "./nodecoordinatestostore";
/* 缓存节点坐标和距离的数组的map */
export function getstoreofnodecoordinates(
    nodecoordinates: Nodecoordinates
): Map<`${number},${number}`, number> {
    return (
        nodecoordinatestostore.get(nodecoordinates) ??
        (() => {
            const euclideandistancerecord = new Map<
                `${number},${number}`,
                number
            >();
            nodecoordinatestostore.set(
                nodecoordinates,
                euclideandistancerecord
            );

            return euclideandistancerecord;
        })()
    );
}
