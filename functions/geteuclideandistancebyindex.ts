// import { calcandsetdistance } from "./calcandsetdistance";
import { getstoreofnode_coordinates } from "./getstoreofnode_coordinates";
import { NodeCoordinates } from "./NodeCoordinates";

// import { numberstostringkeysymmetry } from "./numberstostringkeysymmetry";
/* 使用节点坐标获得欧式距离 */
export function geteuclideandistancebyindex(
    left: number,
    right: number,
    node_coordinates: NodeCoordinates,
    round = false
): number {
    //参数排序
    //距离参数不分正反
    const euclideandistancerecord = getstoreofnode_coordinates(
        node_coordinates,
        round
    );
    if (euclideandistancerecord.has(left, right)) {
        return euclideandistancerecord.get(left, right);
    } else {
        throw Error("out of bounds:" + left + "," + right);
    }
    // // console.log(euclideandistancerecord);
    // return euclideandistancerecord.has(left, right)
    //     ? euclideandistancerecord.get(left, right)
    //     : (() => { })();
    //*  calcandsetdistance(
    //       node_coordinates,
    //       left,
    //       right,
    //       euclideandistancerecord
    //   ); */
}
