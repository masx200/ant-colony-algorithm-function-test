import { assert_true } from "../test/assert_true";
import { divide_route_to_k_opt_random } from "./divide_route_to_k-opt-random";
import { reversearray } from "./reversearray";
import { whether_k_sections_reverse_opt } from "./whether_k_sections_reverse-opt";
// import { split_cycle_route_to_3_sections } from "./split_cycle_route_to_3_sections";
// import { whether_3_sections_reverse_opt } from "./whether_3_sections_reverse_opt";
/* 生成k-opt的路径 */
export function generate_k_opt_cycle_routes_limited({
    oldRoute,
    k,
    max_results,
}: {
    oldRoute: number[];
    k: number;
    max_results: number;
}): number[][] {
    assert_true(oldRoute.length >= 2 * k);
    //splitted_Routes.length===k
    const splitted_Routes = divide_route_to_k_opt_random(
        oldRoute,
        Math.round(k)
    );

    // console.log("splitted_Routes", splitted_Routes);
    assert_true(
        splitted_Routes.every((partial_route) => partial_route.length >= 2)
    );

    const routes: number[][] = [
        ...whether_k_sections_reverse_opt({
            max_of_results: max_results,
            k: Math.round(k),
        }),
    ].map((values) => {
        return values
            .map((value, index) => {
                return value
                    ? reversearray(splitted_Routes[index])
                    : splitted_Routes[index];
            })
            .flat();
    });
    assert_true(routes.every((route) => route.length === oldRoute.length));
    return routes;
}
