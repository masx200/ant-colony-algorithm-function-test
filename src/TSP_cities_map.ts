import { Nodecoordinates } from "../functions/Nodecoordinates";
import { nodecoordinates10 } from "../test/nodecoordinates10";
import { nodecoordinates16 } from "../test/nodecoordinates16";
import { nodecoordinates21 } from "../test/nodecoordinates21";
import { nodecoordinates30 } from "../test/nodecoordinates30";
import { nodecoordinates12 } from "../test/nodecoordinates12";

export const TSP_cities_map = new Map<string, Nodecoordinates>();
const TSP_cords = [
    nodecoordinates10,
    nodecoordinates16,
    nodecoordinates12,
    nodecoordinates21,
    nodecoordinates30,
];
TSP_cords.forEach((nodecoordinates, i) => {
    TSP_cities_map.set(
        `序号:${i},规模:${nodecoordinates.length}`,
        nodecoordinates
    );
});
