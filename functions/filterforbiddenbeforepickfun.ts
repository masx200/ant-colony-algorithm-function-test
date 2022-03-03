import { PathTabooList } from "./PathTabooList";

export function filterforbiddenbeforepickfun(
    // countofnodes:number,
    currentroute: number[],
    pathTabooList: PathTabooList,
    nextnode: number
): boolean {
    // debugger
    return pathTabooList.has([...currentroute, nextnode]);
}
