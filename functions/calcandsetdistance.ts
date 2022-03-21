import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { euclideandistance } from "./euclideandistance";
import { NodeCoordinates } from "./NodeCoordinates";

export function calcandsetdistance(
    node_coordinates: NodeCoordinates,
    left: number,
    right: number,
    euclideandistancerecord: MatrixSymmetry
): number {
    let leftpair = node_coordinates[left];
    let rightpair = node_coordinates[right];
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
