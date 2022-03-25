import { NodeCoordinates } from "./NodeCoordinates";
import { generateUniqueStringOfCircularPath } from "./generateUniqueStringOfCircularPath";
import { node_coordinates_to_no_intersect_routes_unique } from "./node_coordinates_to_no_intersect_routes_unique";
import { getOrCreateSetOfMapFun } from "./getOrCreateSetOfMapFun";
import { intersection_filter_with_cycle_route_old } from "./intersection_filter_with_cycle_route_old";

export function cacheble_intersection_filter_with_cycle_route({
    cycleroute,
    node_coordinates,
}: {
    cycleroute: number[];

    node_coordinates: NodeCoordinates;
}): boolean {
    const getOrCreateSetOfMap = getOrCreateSetOfMapFun(
        node_coordinates_to_no_intersect_routes_unique
    );
    const set = getOrCreateSetOfMap(node_coordinates);
    const unique_string = generateUniqueStringOfCircularPath(cycleroute);
    if (set.has(unique_string)) {
        return false;
    }
    const result = intersection_filter_with_cycle_route_old({
        cycleroute,
        node_coordinates,
    });
    if (result) {
        return result;
    } else {
        set.add(unique_string);

        return result;
    }
}
