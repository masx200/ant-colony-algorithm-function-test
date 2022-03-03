import { Nodecoordinates } from "../functions/Nodecoordinates";
import { PathTabooList } from "../functions/PathTabooList";

export const cachenodecoordinatestopathTabooList = new WeakMap<
    Nodecoordinates,
    PathTabooList
>();
console.log(cachenodecoordinatestopathTabooList);
