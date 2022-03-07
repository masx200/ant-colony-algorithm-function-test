import { SparseMatrixSymmetry } from "../matrixtools/SparseMatrixSymmetry";
import { Nodecoordinates } from "./Nodecoordinates";
import { pheromoneDiffusionCallback } from "./pheromoneDiffusionCallback";

export function performPheromoneDiffusionOperations({
    globalbestroutesegments,
    pheromonestore,
    nodecoordinates,
}: {
    globalbestroutesegments: [number, number][];
    pheromonestore: SparseMatrixSymmetry<number>;
    nodecoordinates: Nodecoordinates;
}): void {
    globalbestroutesegments.forEach(
        pheromoneDiffusionCallback({
            pheromonestore,
            nodecoordinates,
            globalbestroutesegments,
        })
    );
}
