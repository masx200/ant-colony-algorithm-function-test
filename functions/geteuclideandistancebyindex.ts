import { calcandsetdistance } from "./calcandsetdistance";
import { getstoreofnode_coordinates } from "./getstoreofnode_coordinates";
import { NodeCoordinates } from "./NodeCoordinates";

// import { numberstostringkeysymmetry } from "./numberstostringkeysymmetry";
/* 使用节点坐标获得欧式距离 */
export function geteuclideandistancebyindex(
    left: number,
    right: number,
    node_coordinates: NodeCoordinates
): number {
    //参数排序
    //距离参数不分正反
    const euclideandistancerecord =
        getstoreofnode_coordinates(node_coordinates);
    // console.log(euclideandistancerecord);
    return euclideandistancerecord.has(left, right)
        ? euclideandistancerecord.get(left, right)
        : calcandsetdistance(
              node_coordinates,
              left,
              right,
              euclideandistancerecord
          );
}
