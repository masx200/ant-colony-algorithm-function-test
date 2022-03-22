import { NodeCoordinates } from "../functions/NodeCoordinates";
import { asserttrue } from "../test/asserttrue";
import { node_coordinates10 } from "../test/node_coordinates10";
// import { node_coordinates30 } from "../test/node_coordinates30";
import { node_coordinates12 } from "../test/node_coordinates12";
// import { node_coordinates16 } from "../test/node_coordinates16";
import { node_coordinates21 } from "../test/node_coordinates21";
const modules = import.meta.globEager("../tsp/*.json");
// console.log(modules);
const TSP_cords: Record<string, NodeCoordinates> = {
    node_coordinates10,
    // node_coordinates16,
    node_coordinates12,
    node_coordinates21,
    // node_coordinates30,
    ...Object.fromEntries(
        Object.entries(modules).map(([key, value]) => {
            const name = key
                .slice(0, key.lastIndexOf("."))
                .slice(key.lastIndexOf("/") + 1);
            asserttrue(name.length > 0);
            return [name, value.default];
        })
    ),
};
// console.log(TSP_cords);
const entries: [string, NodeCoordinates][] = Object.entries(TSP_cords)
    .sort((a, b) => a[1].length - b[1].length)
    .map((entry) => {
        const name = entry[0];
        const scale = entry[1].length;
        asserttrue(scale > 0);
        return [`名称:${name},规模:${scale}`, entry[1]];
    });
export const TSP_cities_map = new Map<string, NodeCoordinates>(entries);
