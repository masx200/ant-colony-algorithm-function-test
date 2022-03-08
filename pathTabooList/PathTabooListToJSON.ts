import { JSONOfpathTabooList } from "./JSONOfPathTabooList";
import { PathTabooList } from "../pathTabooList/PathTabooList";

export function pathTabooListToJSON<N extends number = number>(
    pathTabooList: PathTabooList<N>
): JSONOfpathTabooList<N> {
    const { countofnodes } = pathTabooList;
    const values = pathTabooList.values();
    return { countofnodes, values };
}
