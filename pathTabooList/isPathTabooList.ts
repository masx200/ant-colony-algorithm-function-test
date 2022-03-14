import { createpathTabooList } from "./createPathTabooList";
import { PathTabooList } from "./PathTabooList";

const tempptl = createpathTabooList(2);
const keysofpathTabooList = Reflect.ownKeys(tempptl);
export function ispathTabooList(list: any): list is PathTabooList<number> {
    return keysofpathTabooList.every((key) => {
        return (
            Reflect.has(list, key) &&
            typeof Reflect.get(list, key) === typeof Reflect.get(tempptl, key)
        );
    });
}
