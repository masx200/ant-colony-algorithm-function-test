import { createPathTabooList } from "./createPathTabooList";
import { PathTabooList } from "./PathTabooList";

const keysofPathTabooList = Reflect.ownKeys(createPathTabooList(2));
export function isPathTabooList(list: any): list is PathTabooList<number> {
    return keysofPathTabooList.every((key) => {
        return Reflect.has(list, key);
    });
}
