import { PathTabooList } from "./PathTabooList";
import { PathTabooListOfJSON } from "./PathTabooListOfJSON";
import { PathTabooListToJSON } from "./PathTabooListToJSON";

export function PathTabooListFrom<N extends number = number>(
    pathTabooList: PathTabooList<N>
): PathTabooList<N> {
    return PathTabooListOfJSON(PathTabooListToJSON(pathTabooList));
}
