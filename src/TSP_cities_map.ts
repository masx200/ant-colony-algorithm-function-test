import {
    getDimension,
    getNames,
    getNodeCoordinates,
} from "@masx200/tsp-lib-test-data";
import { NodeCoordinates } from "../functions/NodeCoordinates";
import { asserttrue } from "../test/asserttrue";
// console.log(modules);
const TSP_cords: Record<string, () => Promise<NodeCoordinates>> =
    Object.fromEntries(
        getNames()
            .map((n) => ({ name: n, dimension: getDimension(n) }))
            .filter(({ dimension }) => dimension <= 1500)
            .map(({ name }) => [name, () => getNodeCoordinates(name)])
    );
// console.log(TSP_cords);
const entries: [string, () => Promise<NodeCoordinates>][] = Object.entries(
    TSP_cords
)
    .sort((a, b) => getDimension(a[0]) - getDimension(b[0]))
    .map((entry) => {
        const name = entry[0];
        const scale = getDimension(name);
        // const scale = entry[1].length;
        // asserttrue(scale > 0);
        return [`名称:${name},规模:${scale}`, entry[1]];
    });
asserttrue(entries.length);
export const TSP_cities_map = new Map<string, () => Promise<NodeCoordinates>>(
    entries
);
// console.log(getDimension, getNames, getNodeCoordinates);
