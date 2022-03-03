import { Nodecoordinates } from "./Nodecoordinates";
import { PathTabooList } from "./PathTabooList";

export const cachenodecoordinatestopathTabooList = new WeakMap<
    Nodecoordinates,
    PathTabooList
>();
console.log(cachenodecoordinatestopathTabooList);
