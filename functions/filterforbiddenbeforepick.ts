import { PathTabooList } from "./PathTabooList";

export function filterforbiddenbeforepick(
    currentroute: number[],
    pathTabooList: PathTabooList,
    nextnode: number
): boolean {
    return pathTabooList.has([...currentroute, nextnode]);
}
