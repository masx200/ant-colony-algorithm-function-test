import { Nodecoordinates } from "../functions/Nodecoordinates";
import { asserttrue } from "../test/asserttrue";
import { nodecoordinates10 } from "../test/nodecoordinates10";
// import { nodecoordinates30 } from "../test/nodecoordinates30";
import { nodecoordinates12 } from "../test/nodecoordinates12";
// import { nodecoordinates16 } from "../test/nodecoordinates16";
import { nodecoordinates21 } from "../test/nodecoordinates21";
const modules = import.meta.globEager("../tsp/*.json");
console.log(modules);
const TSP_cords: Record<string, Nodecoordinates> = {
    nodecoordinates10,
    // nodecoordinates16,
    nodecoordinates12,
    nodecoordinates21,
    // nodecoordinates30,
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
console.log(TSP_cords);
const entries: [string, Nodecoordinates][] = Object.entries(TSP_cords)
    .sort((a, b) => a[1].length - b[1].length)
    .map((entry) => {
        const name = entry[0];
        const scale = entry[1].length;
        asserttrue(scale > 0);
        return [`名称:${name},规模:${scale}`, entry[1]];
    });
export const TSP_cities_map = new Map<string, Nodecoordinates>(entries);
