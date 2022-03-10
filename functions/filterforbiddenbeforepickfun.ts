import { PathTabooList } from "../pathTabooList/PathTabooList";
/* 如果禁忌表不包含此路径则返回true */
export function filternotforbiddenbeforepickfun(
    // countofnodes:number,
    currentroute: number[],
    pathTabooList: PathTabooList,
    nextnode: number
): boolean {
    // debugger
    return !pathTabooList.has([...currentroute, nextnode]);
}
