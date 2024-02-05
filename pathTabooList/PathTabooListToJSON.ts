import { JSONOfpathTabooList } from "./JSONOfPathTabooList";
import { PathTabooList } from "../pathTabooList/PathTabooList";

export function pathTabooListToJSON<N extends number = number>(
    pathTabooList: PathTabooList<N>,
): JSONOfpathTabooList<N> {
    const { count_of_nodes } = pathTabooList;
    const values = pathTabooList.values();
    return { count_of_nodes, values };
}
