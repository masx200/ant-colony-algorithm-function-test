import { createpathTabooList } from "./createPathTabooList";
import { PathTabooList } from "./PathTabooList";

const keysofpathTabooList = Reflect.ownKeys(createpathTabooList(2));
export function ispathTabooList(list: any): list is PathTabooList<number> {
    return keysofpathTabooList.every((key) => {
        return Reflect.has(list, key);
    });
}
