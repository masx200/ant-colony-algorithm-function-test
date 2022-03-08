import { PathTabooList } from "./PathTabooList";
import { pathTabooListOfJSON } from "./PathTabooListOfJSON";
import { pathTabooListToJSON } from "./PathTabooListToJSON";

export function pathTabooListFrom<N extends number = number>(
    pathTabooList: PathTabooList<N>
): PathTabooList<N> {
    return pathTabooListOfJSON(pathTabooListToJSON(pathTabooList));
}
