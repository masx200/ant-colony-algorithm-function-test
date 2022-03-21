import { ispathsequalinbothdirectionswithcycle } from "../functions/ispathsequalinbothdirectionswithcycle";
import { ispathsequalinbothdirectionswithoutcycle } from "../functions/ispathsequalinbothdirectionswithoutcycle";

export function is_route_equals<N extends number = number>(
    value: number[],
    route: number[],
    count_of_nodes: N
): boolean {
    if (route.length === count_of_nodes) {
        /* 回环路径 */
        return ispathsequalinbothdirectionswithcycle(route, value);
    } else {
        /* 非回环路径 */
        return ispathsequalinbothdirectionswithoutcycle(route, value);
    }
}
