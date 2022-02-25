import { distance as mathdistance } from "mathjs";
import { Nodecoordinates } from "./Nodecoordinates";
const nodecoordinatestostore = new WeakMap<
  Nodecoordinates,
  Map<`${number},${number}`, number>
>();

function getstoreofnodecoordinates(
  nodecoordinates: Nodecoordinates
): Map<`${number},${number}`, number> {
  return (
    nodecoordinatestostore.get(nodecoordinates) ??
    (() => {
      const euclideandistancerecord = new Map<`${number},${number}`, number>();
      nodecoordinatestostore.set(nodecoordinates, euclideandistancerecord);

      return euclideandistancerecord;
    })()
  );
}
console.log(nodecoordinatestostore);

/* 获得欧式距离 */
export function geteuclideandistancebyindex(
  left: number,
  right: number,
  nodecoordinates: Nodecoordinates
): number {
  //参数排序
  //距离参数不分正反
  const euclideandistancerecord = getstoreofnodecoordinates(nodecoordinates);
  console.log(euclideandistancerecord);
  return (
    euclideandistancerecord.get(`${left},${right}`) ??
    euclideandistancerecord.get(`${right},${left}`) ??
    (() => {
      let leftpair = nodecoordinates[left];
      let rightpair = nodecoordinates[right];
      let distance = euclideandistance(
        leftpair,

        rightpair
      );
      let max = Math.max(left, right);
      let min = Math.min(left, right);

      euclideandistancerecord.set(`${min},${max}`, distance);
      return distance;
    })()
  );
}
export function euclideandistance(
  leftpair: [number, number],
  rightpair: [number, number]
): number {
  return Number(mathdistance(leftpair, rightpair));
}
