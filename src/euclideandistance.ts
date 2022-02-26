import { distance as mathdistance } from "mathjs";
/* 计算欧式距离 */
export function euclideandistance(
    leftpair: [number, number],
    rightpair: [number, number]
): number {
    return Number(mathdistance(leftpair, rightpair));
}
