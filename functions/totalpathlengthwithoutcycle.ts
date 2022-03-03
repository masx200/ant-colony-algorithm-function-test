import { sum } from "mathjs";
import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { Nodecoordinates } from "./Nodecoordinates";

/* 计算路径片段的总长度,非环路 */
export function totalpathlengthwithoutcycle(
    path: number[],
    nodecoordinates: Nodecoordinates
): number {
    if (path.length >= nodecoordinates.length) {
        throw Error("invalid path not match nodecoordinates");
    }
    return sum(
        path
            .map((value, index, array) => {
                const nextindex = index === array.length - 1 ? 0 : index + 1;
                return [value, array[nextindex]];
            })
            .slice(0, -1)
            .map(([left, right]) =>
                /* console.log(left, right);*/ geteuclideandistancebyindex(
                    left,
                    right,
                    nodecoordinates
                )
            )
    );
}
