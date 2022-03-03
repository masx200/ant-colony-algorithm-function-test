import { PathTabooList } from "./PathTabooList";

export type FilterForbiddenBeforePick = (
    // countofnodes: number,
    currentroute: number[],
    pathTabooList: PathTabooList,
    nextnode: number
) => boolean;
