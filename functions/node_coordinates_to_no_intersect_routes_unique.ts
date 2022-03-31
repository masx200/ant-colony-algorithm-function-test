import { NodeCoordinates } from "./NodeCoordinates";

export const node_coordinates_to_no_intersect_routes_unique: WeakMap<
    NodeCoordinates,
    Set<string>
> = new WeakMap();
export const node_coordinates_to_intersect_routes_unique: WeakMap<
    NodeCoordinates,
    Set<string>
> = new WeakMap();
