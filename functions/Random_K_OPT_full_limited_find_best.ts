import { Nodecoordinates } from "./Nodecoordinates";
import { random_k_opt_limited_full } from "./random_k_opt_limited_full";
import { closedtotalpathlength } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
import { getbestRouteOfSeriesRoutesAndLengths } from "./getbestRouteOfSeriesRoutesAndLengths";

/** 有限随机k-opt优化,并找出其中的最优  */
export function Random_K_OPT_full_limited_find_best({
    oldRoute,
    max_results_of_k_opt,
    nodecoordinates,
    oldLength,
}: {
    oldRoute: number[];
    max_results_of_k_opt: number;
    nodecoordinates: Nodecoordinates;
    oldLength: number;
}): { optimal_route: number[]; optimal_length: number } {
    const routes_of_k_opt = random_k_opt_limited_full({
        oldRoute: oldRoute,
        max_results_of_k_opt,
    });

    const routesAndLengths = routes_of_k_opt
        .map((route) => {
            const totallength = closedtotalpathlength({
                // countofnodes: route.length,
                path: route,
                getdistancebyindex: creategetdistancebyindex(nodecoordinates),
            });
            return { totallength, route };
        })
        .filter((a) => a.totallength !== oldLength);
    /* routesAndLengths可能为空了 */
    const { route: best_route_of_k_opt, totallength: best_length_of_k_opt } =
        routesAndLengths.length
            ? getbestRouteOfSeriesRoutesAndLengths(routesAndLengths)
            : { route: oldRoute, totallength: oldLength };
    let optimal_route = best_route_of_k_opt;
    let optimal_length = best_length_of_k_opt;
    return { optimal_route, optimal_length };
}
