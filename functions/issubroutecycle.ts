import { cyclereoganize } from "./cyclereoganize";
import {
    ispathsequalinbothdirections,
    reversearray,
} from "./ispathsequalinbothdirections";
import { issubroutenotcyclewithreverse } from "./issubroutenotcyclewithreverse";
/* 判断是否是子路径,包括环路和非环路 */
export function issubroutecycle(
    parentroute: number[],
    childroute: number[],
    countofnodes: number //总节点数,用于判断是否是环路
): boolean {
    if (
        countofnodes <= 0 ||
        countofnodes < parentroute.length ||
        countofnodes < childroute.length ||
        parentroute.length < childroute.length ||
        parentroute.length === 0 ||
        childroute.length === 0
    ) {
        throw new Error("incorrect route or countofnodes");
    }
    /* 如果路径长度达到最大值则视为环路
    两个都是环路
    */
    if (
        parentroute.length === countofnodes &&
        childroute.length == countofnodes
    ) {
        return ispathsequalinbothdirections(parentroute, childroute);
    } else if (
        parentroute.length !== countofnodes &&
        childroute.length !== countofnodes
    ) {
        return issubroutenotcyclewithreverse(parentroute, childroute);
        /* 如果两个都不是环路 */
    } else if (
        parentroute.length === countofnodes &&
        childroute.length !== countofnodes
    ) {
        return (
            issubroutenotcyclewithreverse(
                cyclereoganize(parentroute, childroute[0]),
                childroute
            ) ||
            issubroutenotcyclewithreverse(
                cyclereoganize(parentroute, childroute.slice(-1)[0]),
                reversearray(childroute)
            )
        );
        /* 如果父路径是环路,子路径不是环路 */
    } else {
        /* 如果子路径是环路,父路径不是环路 */
        return false;
    }
}
