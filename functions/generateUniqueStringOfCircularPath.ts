import { generateUniqueArrayOfCircularPath } from "./generateUniqueArrayOfCircularPath";

export function generateUniqueStringOfCircularPath(route: number[]): string {
    return JSON.stringify(generateUniqueArrayOfCircularPath(route));
}
