import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { euclideandistance } from "./euclideandistance";
import { Nodecoordinates } from "./Nodecoordinates";

export function calcandsetdistance(
    nodecoordinates: Nodecoordinates,
    left: number,
    right: number,
    euclideandistancerecord: MatrixSymmetry
): number {
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
}
