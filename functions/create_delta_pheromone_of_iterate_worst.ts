import { MatrixSymmetryCreate } from "@masx200/sparse-2d-matrix";
// import { iterateWorstMatrixInitializer } from "./iterateWorstMatrixInitializer";

export function create_delta_pheromone_of_iterate_worst({
    count_of_nodes,
    iterateworstroutesegments,
    iterateworstlength,
}: {
    count_of_nodes: number;
    iterateworstroutesegments: [number, number][];
    iterateworstlength: number;
    }) {
        /* iterateWorstMatrixInitializer性能不好 */
        const result = MatrixSymmetryCreate({
            row: count_of_nodes,
            // column: count_of_nodes,
            /*     intersection_filter_with_cycle_route({
                    cycleroute: iteratebestroute,

                    node_coordinates,
                }) && Math.random() < 0.5
                    ? undefined
                    : */
            // initializer: iterateBestMatrixInitializer(
            //     route_segments,
            //     route_length
            // ),
        });
        iterateworstroutesegments.forEach(function ([left, right]) {
            result.set(left, right, -1 / iterateworstlength);
        });
        return result;
        // return MatrixSymmetryCreate({
        //     row: count_of_nodes,
        //     initializer: iterateWorstMatrixInitializer(
        //         iterateworstroutesegments,
        //         iterateworstlength
        //     ),
        // });
    }
