import { euclideandistance } from "./euclideandistance";
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
    return (
        euclideandistancerecord.get(left, right) /* ??
        euclideandistancerecord.get(`${right},${left}`) ?? */ ??
        (() => {
            let leftpair = nodecoordinates[left];
            let rightpair = nodecoordinates[right];
            let distance = euclideandistance(
                leftpair,

                rightpair
            );

            euclideandistancerecord.set(
                left,
                right,
                // numberstostringkeysymmetry(left, right),
                distance
            );
            return distance;
        })()
    );
}
