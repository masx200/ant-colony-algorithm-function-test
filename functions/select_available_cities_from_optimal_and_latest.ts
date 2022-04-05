import intersection from "lodash/intersection";
import difference from "lodash/difference";

export function select_available_cities_from_optimal_and_latest({
    available_nodes,
    get_neighbors_from_optimal_routes_and_latest_routes,
    current_city,
    max_size,
}: {
    available_nodes: Set<number>;
    get_neighbors_from_optimal_routes_and_latest_routes: (
        current_city: number
    ) => number[];
    current_city: number;
    max_size: number;
}): number[] {
    const maximum = Math.max(max_size, available_nodes.size);

    const neighbors = intersection(
        Array.from(available_nodes),
        get_neighbors_from_optimal_routes_and_latest_routes(current_city)
    );
    const rest_nodes = difference(Array.from(available_nodes), neighbors);
    const source = [neighbors, rest_nodes].flat();
    const result: number[] = source.slice(0, maximum);
    return result;
}