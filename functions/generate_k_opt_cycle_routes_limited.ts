import { asserttrue } from "../test/asserttrue";
import { divide_route_to_k_opt } from "./divide_route_to_k-opt";
import { reversearray } from "./reversearray";
import { whether_k_sections_reverse_opt } from "./whether_k_sections_reverse-opt";
// import { split_cycle_route_to_3_sections } from "./split_cycle_route_to_3_sections";
// import { whether_3_sections_reverse_opt } from "./whether_3_sections_reverse_opt";

export function generate_k_opt_cycle_routes_limited(
    oldRoute: number[],
    k: number,
    max_results: number
): number[][] {
    asserttrue(oldRoute.length >= 2 * k);
    //splitedRoutes.length===k
    const splitedRoutes = divide_route_to_k_opt(oldRoute, k);

    console.log("splitedRoutes", splitedRoutes);
    asserttrue(
        splitedRoutes.every((partial_route) => partial_route.length >= 2)
    );

    const routes: number[][] = [
        ...whether_k_sections_reverse_opt(max_results, k),
    ].map((values) => {
        return values
            .map((value, index) => {
                return value
                    ? reversearray(splitedRoutes[index])
                    : splitedRoutes[index];
            })
            .flat();
    });
    asserttrue(routes.every((route) => route.length === oldRoute.length));
    return routes;
}
