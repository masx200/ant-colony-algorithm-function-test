import { generateUniqueArrayOfCircularPath } from "./generateUniqueArrayOfCircularPath";
import { generateUniqueStringOfArray } from "./generateUniqueStringOfArray";

export function generateUniqueStringOfCircularPath(route: number[]): string {
    return generateUniqueStringOfArray(
        generateUniqueArrayOfCircularPath(route)
    );
}
