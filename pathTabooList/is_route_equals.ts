import { ispathsequalinbothdirectionswithcycle } from "../functions/ispathsequalinbothdirectionswithcycle";
import { ispathsequalinbothdirectionswithoutcycle } from "../functions/ispathsequalinbothdirectionswithoutcycle";

export function is_route_equals<N extends number = number>(
    value: number[],
    route: number[],
    countofnodes: N
): boolean {
    if (route.length === countofnodes) {
        /* 回环路径 */
        return ispathsequalinbothdirectionswithcycle(route, value);
    } else {
        /* 非回环路径 */
        return ispathsequalinbothdirectionswithoutcycle(route, value);
    }
}
