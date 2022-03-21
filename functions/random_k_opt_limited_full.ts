import { generate_k_opt_cycle_routes_limited } from "./generate_k_opt_cycle_routes_limited";
import { random } from "lodash";
import { asserttrue } from "../test/asserttrue";

export function random_k_opt_limited_full({
    // count_of_nodes,
    oldRoute,
    max_results_of_k_opt,
}: {
    // count_of_nodes: number;
    oldRoute: number[];
    max_results_of_k_opt: number;
}): number[][] {
    asserttrue(oldRoute.length >= 4);
    const count_of_nodes = oldRoute.length;
    const routes_of_max: number[][] = [];

    while (routes_of_max.length < max_results_of_k_opt) {
        //如果没达到max_results_of_k_opt,则继续生成路径
        const k = Math.round(random(2, Math.floor(count_of_nodes / 2), false));
        const routes_of_k_opt = generate_k_opt_cycle_routes_limited({
            oldRoute,
            k,
            max_results: max_results_of_k_opt - routes_of_max.length,
        });
        routes_of_k_opt.forEach((r) => {
            routes_of_max.push(r);
        });
    }
    return routes_of_max;
}
