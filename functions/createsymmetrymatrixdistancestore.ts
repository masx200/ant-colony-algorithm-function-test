import { Nodecoordinates } from "./Nodecoordinates";
import { SparseMatrixSymmetryCreate } from "../matrixtools/SparseMatrixSymmetryCreate";
import { euclideandistance } from "./euclideandistance";

export function createsymmetrymatrixdistancestore(
    nodecoordinates: Nodecoordinates
) {
    const row = nodecoordinates.length;
    return SparseMatrixSymmetryCreate({
        row,
        // column: row,
        // default: -1,
        initializer: (left, right) => {
            let leftpair = nodecoordinates[left];
            let rightpair = nodecoordinates[right];
            let distance = euclideandistance(
                leftpair,

                rightpair
            );
            return distance;
        },
    });
}
