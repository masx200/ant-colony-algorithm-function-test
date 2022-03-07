import { createPathTabooList } from "./createPathTabooList";
import { JSONOfPathTabooList } from "./JSONOfPathTabooList";
import { PathTabooList } from "./PathTabooList";

export function PathTabooListOfJSON<N extends number = number>(
    json: JSONOfPathTabooList<N>
): PathTabooList<N> {
    const { countofnodes, values } = json;

    const pathTabooList = createPathTabooList(countofnodes);
    values.forEach((route) => pathTabooList.add(route));
    return pathTabooList;
}
