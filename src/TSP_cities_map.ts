import { Nodecoordinates } from "../functions/Nodecoordinates";
import { nodecoordinates10 } from "../test/nodecoordinates10";
import { nodecoordinates16 } from "../test/nodecoordinates16";
import { nodecoordinates21 } from "../test/nodecoordinates21";
import { nodecoordinates30 } from "../test/nodecoordinates30";
import { nodecoordinates12 } from "../test/nodecoordinates12";

const TSP_cords = {
    nodecoordinates10,
    nodecoordinates16,
    nodecoordinates12,
    nodecoordinates21,
    nodecoordinates30,
};
const entries: [string, Nodecoordinates][] = Object.entries(TSP_cords)
    .sort((a, b) => a[1].length - b[1].length)
    .map((entry) => {
        const name = entry[0];
        const scale = entry[1].length;
        return [`名称:${name},规模:${scale}`, entry[1]];
    });
export const TSP_cities_map = new Map<string, Nodecoordinates>(entries);
