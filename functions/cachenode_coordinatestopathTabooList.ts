import { NodeCoordinates } from "./NodeCoordinates";
import { PathTabooList } from "../pathTabooList/PathTabooList";

export const cachenode_coordinatestopathTabooList = new WeakMap<
    NodeCoordinates,
    PathTabooList
>();
console.log(cachenode_coordinatestopathTabooList);
