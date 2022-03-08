import { PathTabooList } from "../pathTabooList/PathTabooList";

export type FilterForbiddenBeforePick = (
    // countofnodes: number,
    currentroute: number[],
    pathTabooList: PathTabooList,
    nextnode: number
) => boolean;
