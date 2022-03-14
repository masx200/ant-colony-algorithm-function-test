import { asserttrue } from "../test/asserttrue";
import { reversearray } from "./reversearray";
import { split_cycle_route_to_3_sections } from "./split_cycle_route_to_3_sections";
import { whether_3_sections_reverse } from "./whether_3_sections_reverse";

export function generate_3_opt_cycle_routes(oldRoute: number[]): number[][] {
    asserttrue(oldRoute.length >= 6);

    const splitedRoutes = split_cycle_route_to_3_sections(oldRoute);

    console.log("splitedRoutes", splitedRoutes);
    asserttrue(
        splitedRoutes.every((partial_route) => partial_route.length >= 2)
    );
    const [first, second, third] = splitedRoutes;
    const routes = [...whether_3_sections_reverse()].map(([i, j, k]) => {
        return [
            ...(i ? reversearray(first) : first),
            ...(j ? reversearray(second) : second),
            ...(k ? reversearray(third) : third),
        ];
    });
    asserttrue(routes.every((route) => route.length === oldRoute.length));
    return routes;
}
