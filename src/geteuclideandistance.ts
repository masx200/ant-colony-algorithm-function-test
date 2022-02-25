import * as math from "mathjs";
import { Nodecoordinates } from "./Nodecoordinates";
const nodecoordinatestonumber = new WeakMap<Nodecoordinates, number>();
let count = 0;
function getcountofnodecoordinates(nodecoordinates: Nodecoordinates): number {
    return (
        nodecoordinatestonumber.get(nodecoordinates) ??
        (() => {
            let lastcount = count;
            nodecoordinatestonumber.set(nodecoordinates, lastcount);
            count++;
            return lastcount;
        })()
    );
}
console.log(nodecoordinatestonumber);
const euclideandistancerecord = new Map<
    `${number},${number},${number}`,
    number
>();
/* 获得欧式距离 */
export function geteuclideandistancebyindex(
    left: number,
    right: number,
    nodecoordinates: Nodecoordinates
): number {
    //参数排序
    //距离参数不分正反
    let idofnodecoordinates = getcountofnodecoordinates(nodecoordinates);
    return (
        euclideandistancerecord.get(
            `${left},${right},${idofnodecoordinates}`
        ) ??
        euclideandistancerecord.get(
            `${right},${left},${idofnodecoordinates}`
        ) ??
        (() => {
            let leftpair = nodecoordinates[left];
            let rightpair = nodecoordinates[right];
            let distance = euclideandistance(
                leftpair,

                rightpair
            );
            let max = Math.max(left, right);
            let min = Math.min(left, right);

            euclideandistancerecord.set(
                `${min},${max},${idofnodecoordinates}`,
                distance
            );
            return distance;
        })()
    );
}
export function euclideandistance(
    leftpair: [number, number],
    rightpair: [number, number]
): number {
    return Number(math.distance(leftpair, rightpair));
}
console.log(euclideandistancerecord);

// console.log(math.distance);
