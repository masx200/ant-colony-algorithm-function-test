import { cache_of_max_distance_of_node_coordinates } from "./cache_of_max_distance_of_node_coordinates";
import { getalldistancesofnodes } from "./getalldistancesofnodes";
import { NodeCoordinates } from "./NodeCoordinates";
/**获得所有距离中的最大值,并缓存  */
export function get_max_distance_of_node_coordinates(
    node_coordinates: NodeCoordinates
): number {
    const result =
        cache_of_max_distance_of_node_coordinates.get(node_coordinates) ??
        Math.max(...getalldistancesofnodes(node_coordinates));

    if (!cache_of_max_distance_of_node_coordinates.has(node_coordinates)) {
        cache_of_max_distance_of_node_coordinates.set(node_coordinates, result);
    }
    return result;
}
