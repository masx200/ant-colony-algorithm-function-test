import { isObjectButNotFunction } from "./isObjectButNotFunction";
import { ObjectSorted } from "./ObjectSorted";

export function generateUniqueStringOfArray(value: any[]): string {
    if (!Array.isArray(value)) {
        throw new Error("invalid value, expected array argument");
    }
    return JSON.stringify(value, (_key, v) => {
        if (isObjectButNotFunction(v)) {
            return ObjectSorted(v);
        }
        return v;
    });
}
