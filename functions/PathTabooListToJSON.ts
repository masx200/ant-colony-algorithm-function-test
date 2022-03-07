import { JSONOfPathTabooList } from "./JSONOfPathTabooList";
import { PathTabooList } from "./PathTabooList";

export function PathTabooListToJSON<N extends number = number>(
    pathTabooList: PathTabooList<N>
): JSONOfPathTabooList<N> {
    const { countofnodes } = pathTabooList;
    const values = pathTabooList.values();
    return { countofnodes, values };
}
