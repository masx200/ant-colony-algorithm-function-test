import { Nodecoordinates } from "./Nodecoordinates";
import { cachenodecoordinatestostore } from "./cachenodecoordinatestostore";

import { createsymmetrymatrixdistancestore } from "./createsymmetrymatrixdistancestore";
import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";

export function createdistancestore(
    nodecoordinates: Nodecoordinates
): MatrixSymmetry<number> {
    const euclideandistancerecord =
        createsymmetrymatrixdistancestore(nodecoordinates);
    cachenodecoordinatestostore.set(nodecoordinates, euclideandistancerecord);

    return euclideandistancerecord;
}
