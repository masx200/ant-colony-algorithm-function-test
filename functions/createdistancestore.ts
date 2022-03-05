import { Nodecoordinates } from "./Nodecoordinates";
import { cachenodecoordinatestostore } from "./cachenodecoordinatestostore";
import { SparseMatrixSymmetry } from "../matrixtools/SparseMatrixSymmetry";
import { createsymmetrymatrixdistancestore } from "./createsymmetrymatrixdistancestore";

export function createdistancestore(
    nodecoordinates: Nodecoordinates
): SparseMatrixSymmetry<number> {
    const euclideandistancerecord =
        createsymmetrymatrixdistancestore(nodecoordinates);
    cachenodecoordinatestostore.set(nodecoordinates, euclideandistancerecord);

    return euclideandistancerecord;
}
