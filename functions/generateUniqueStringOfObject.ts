import { isObjectButNotFunction } from "./isObjectButNotFunction";
import { ObjectSorted } from "./ObjectSorted";

export function generateUniqueStringOfObject(value: object): string {
    if (!isObjectButNotFunction(value)) {
        throw new Error("invalid value, expected object argument");
    }

    return JSON.stringify(ObjectSorted(value), (_key, v) => {
        if (isObjectButNotFunction(v)) {
            return ObjectSorted(v);
        }
        return v;
    });
}
