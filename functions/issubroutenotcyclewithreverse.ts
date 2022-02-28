import { reversearray } from "./ispathsequalinbothdirections";
import { issubroutenotcyclewithoutreverse } from "./issubroutenotcyclewithoutreverse";

export function issubroutenotcyclewithreverse(
    parentroute: number[],
    childroute: number[]
): boolean {
    return (
        issubroutenotcyclewithoutreverse(parentroute, childroute) ||
        issubroutenotcyclewithoutreverse(parentroute, reversearray(childroute))
    );
}
