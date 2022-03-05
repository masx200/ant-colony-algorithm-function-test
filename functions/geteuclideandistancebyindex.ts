import { calcandsetdistance } from "./calcandsetdistance";
import { getstoreofnodecoordinates } from "./getstoreofnodecoordinates";
import { Nodecoordinates } from "./Nodecoordinates";

// import { numberstostringkeysymmetry } from "./numberstostringkeysymmetry";
/* 使用节点坐标获得欧式距离 */
export function geteuclideandistancebyindex(
    left: number,
    right: number,
    nodecoordinates: Nodecoordinates
): number {
    //参数排序
    //距离参数不分正反
    const euclideandistancerecord = getstoreofnodecoordinates(nodecoordinates);
    // console.log(euclideandistancerecord);
    return euclideandistancerecord.has(left, right)
        ? euclideandistancerecord.get(left, right)
        : calcandsetdistance(
              nodecoordinates,
              left,
              right,
              euclideandistancerecord
          );
}
