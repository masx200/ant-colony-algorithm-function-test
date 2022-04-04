// import { MatrixSymmetryCreate } from "@masx200/sparse-2d-matrix";
import { create_delta_pheromone_of_iterate_best } from "./create_delta_pheromone_of_iterate_best";
// import { globalBestMatrixInitializer } from "./globalBestMatrixInitializer";

export function create_delta_pheromone_of_global_best({
    count_of_nodes,
    global_best_routesegments,
    globalbestlength,
}: {
    count_of_nodes: number;
    global_best_routesegments: [number, number][];
    globalbestlength: number;
}) {
    return create_delta_pheromone_of_iterate_best({
        count_of_nodes,
        route_segments: global_best_routesegments,
        route_length: globalbestlength,
    });
    // /* globalBestMatrixInitializer性能不好 */
    // return MatrixSymmetryCreate({
    //     row: count_of_nodes,
    //     //column: count_of_nodes,
    //     // initializer: /* intersection_filter_with_cycle_route({
    //     //     cycle_route: global_best_route,

    //     //     node_coordinates,
    //     // }) && Math.random() < 0.5
    //     //     ? undefined
    //     //     : */ globalBestMatrixInitializer(
    //     //     global_best_routesegments,
    //     //     globalbestlength
    //     // ),
    // });
}
