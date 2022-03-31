import { MatrixSymmetryCreate } from "@masx200/sparse-2d-matrix";
// import { iterateBestMatrixInitializer } from "./iterateBestMatrixInitializer";

export function create_delta_pheromone_of_iterate_best({
    count_of_nodes,
    route_segments,
    route_length,
}: {
    count_of_nodes: number;
    route_segments: [number, number][];
    route_length: number;
    }) {
        /* iterateBestMatrixInitializer性能不好 */
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
        route_segments.forEach(function ([left, right]) {
            result.set(left, right, 1 / route_length);
        });
        return result;
    }
