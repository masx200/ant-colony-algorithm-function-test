import { SparseMatrixSymmetry } from "../matrixtools/SparseMatrixSymmetry";
import { euclideandistance } from "./euclideandistance";
import { Nodecoordinates } from "./Nodecoordinates";

export function calcandsetdistance(
    nodecoordinates: Nodecoordinates,
    left: number,
    right: number,
    euclideandistancerecord: SparseMatrixSymmetry
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
