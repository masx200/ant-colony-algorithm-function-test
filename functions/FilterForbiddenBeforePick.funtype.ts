import { PathTabooList } from "../pathTabooList/PathTabooList";

export type FilterForbiddenBeforePick = (
    // count_of_nodes: number,
    currentroute: number[],
    pathTabooList: PathTabooList,
    nextnode: number,
) => boolean;
