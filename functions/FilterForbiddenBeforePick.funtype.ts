import { PathTabooList } from "./PathTabooList";

export type FilterForbiddenBeforePick = (
    currentroute: number[],
    pathTabooList: PathTabooList,
    nextnode: number
) => boolean;
