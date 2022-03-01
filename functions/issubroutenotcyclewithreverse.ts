import { reversearray } from "./reversearray";
import { issubroutenotcyclewithoutreverse } from "./issubroutenotcyclewithoutreverse";
/* 判断有双向无回环的路径是否相等 */
export function issubroutenotcyclewithreverse(
    parentroute: number[],
    childroute: number[]
): boolean {
    return (
        issubroutenotcyclewithoutreverse(parentroute, childroute) ||
        issubroutenotcyclewithoutreverse(parentroute, reversearray(childroute))
    );
}
