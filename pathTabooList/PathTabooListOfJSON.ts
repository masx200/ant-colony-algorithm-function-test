import { createpathTabooList } from "../pathTabooList/createPathTabooList";

import { PathTabooList } from "../pathTabooList/PathTabooList";
import { JSONOfpathTabooList } from "./JSONOfPathTabooList";

export function pathTabooListOfJSON<N extends number = number>(
    json: JSONOfpathTabooList<N>,
): PathTabooList<N> {
    const { count_of_nodes, values } = json;

    const pathTabooList = createpathTabooList(count_of_nodes);
    values.forEach((route) => pathTabooList.add(route));
    return pathTabooList;
}
