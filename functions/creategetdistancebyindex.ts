import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { Nodecoordinates } from "./Nodecoordinates";

export function creategetdistancebyindex(
    nodecoordinates: Nodecoordinates
): (left: number, right: number) => number {
    return (left: number, right: number) =>
        geteuclideandistancebyindex(left, right, nodecoordinates);
}
