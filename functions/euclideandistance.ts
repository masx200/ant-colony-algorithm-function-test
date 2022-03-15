// import { distance as mathdistance } from "mathjs";
/* 计算欧式距离 */
export function euclideandistance(
    leftpair: [number, number],
    rightpair: [number, number]
): number {
    return Number(Math.hypot(...leftpair.map((a, i) => a - rightpair[i])));
}
