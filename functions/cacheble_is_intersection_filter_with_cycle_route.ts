import { NodeCoordinates } from "./NodeCoordinates";
import { generateUniqueStringOfCircularPath } from "./generateUniqueStringOfCircularPath";
import { node_coordinates_to_intersect_routes_unique } from "./node_coordinates_to_intersect_routes_unique";
import { getOrCreateMapOfMapFun } from "./getOrCreateMapOfMapFun";
import { intersection_filter_with_cycle_route_old } from "./intersection_filter_with_cycle_route_old";

export function cacheble_is_intersection_filter_with_cycle_route({
    cycleroute,
    node_coordinates,
}: {
    cycleroute: number[];

    node_coordinates: NodeCoordinates;
}): boolean {
    const map = getOrCreateMapOfMapFun(
        node_coordinates_to_intersect_routes_unique,
        node_coordinates
    );
    const unique_string = generateUniqueStringOfCircularPath(cycleroute);
    if (map.has(unique_string)) {
        const cached = map.get(unique_string);
        if (!cached) {
            return false;
        } else {
            return true;
        }
    }
    const result = intersection_filter_with_cycle_route_old({
        cycleroute,
        node_coordinates,
    });
    // if (result) {
    //     return result;
    // } else {
    map.set(unique_string, result);

    return result;
    // }
}
