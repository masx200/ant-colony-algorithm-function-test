import { Nodecoordinates } from "./Nodecoordinates";

import { euclideandistance } from "./euclideandistance";
import { MatrixSymmetryCreate } from "@masx200/sparse-2d-matrix";

export function createsymmetrymatrixdistancestore(
    nodecoordinates: Nodecoordinates
) {
    const row = nodecoordinates.length;
    return MatrixSymmetryCreate({
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
