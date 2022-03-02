import { PathTabooList } from "./PathTabooList";

export function filterforbiddenbeforepick(
    currentroute: number[],
    pathTabooList: PathTabooList,
    nextnode: number
): boolean {
    // debugger
    return pathTabooList.has([...currentroute, nextnode]);
}
