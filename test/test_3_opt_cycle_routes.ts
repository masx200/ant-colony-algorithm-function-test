import { generate_3_opt_cycle_routes } from "../functions/generate_3_opt_cycle_routes";
import { split_cycle_route_to_3_sections } from "../functions/split_cycle_route_to_3_sections";
import { asserttrue } from "./asserttrue";

export function test_3_opt_cycle_routes() {
    for (let i = 0; i < 5; i++) {
        const oldRoute = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const splitedRoutes = split_cycle_route_to_3_sections(oldRoute);

        console.log("splitedRoutes", splitedRoutes);
        asserttrue(
            splitedRoutes.every((partial_route) => partial_route.length >= 2)
        );

        const newRoutes = generate_3_opt_cycle_routes(oldRoute);
        asserttrue(newRoutes.length === 8);
        asserttrue(
            newRoutes.every((route) => route.length === oldRoute.length)
        );
        console.log("oldRoute", oldRoute);
        console.log("newRoutes", newRoutes);
    }
}
