import { PathTabooList } from "../pathTabooList/PathTabooList";
/* 如果禁忌表不包含此路径则返回true */
export function filternotforbiddenbeforepickfun(
    // count_of_nodes:number,
    currentroute: number[],
    pathTabooList: PathTabooList,
    nextnode: number
): boolean {
    // debugger
    return !pathTabooList.has([...currentroute, nextnode]);
}
