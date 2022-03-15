import { sum } from "lodash";
import { divide_route_to_k_opt } from "../functions/divide_route_to_k-opt";
import { generate_3_opt_cycle_routes } from "../functions/generate_3_opt_cycle_routes";
import { split_cycle_route_to_3_sections } from "../functions/split_cycle_route_to_3_sections";
import { asserttrue } from "./asserttrue";

export function test_3_opt_cycle_routes() {
    for (let i = 0; i < 5; i++) {
        const oldRoute = [0, 1, 2, 3, 4, 5, 6];
        const splitedRoutes = split_cycle_route_to_3_sections(oldRoute);
        asserttrue(splitedRoutes.length === 3);
        console.log("splitedRoutes", splitedRoutes);
        asserttrue(
            splitedRoutes.every((partial_route) => partial_route.length >= 2)
        );
        asserttrue((oldRoute.length = sum(splitedRoutes.map((a) => a.length))));
        const newRoutes = generate_3_opt_cycle_routes(oldRoute);
        asserttrue(newRoutes.length === 8);
        asserttrue(
            newRoutes.every((route) => route.length === oldRoute.length)
        );
        console.log("oldRoute", oldRoute);
        console.log("newRoutes", newRoutes);
    }
    for (let i = 0; i < 5; i++) {
        const oldRoute = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const splitedRoutes = split_cycle_route_to_3_sections(oldRoute);
        asserttrue(splitedRoutes.length === 3);
        console.log("splitedRoutes", splitedRoutes);
        asserttrue(
            splitedRoutes.every((partial_route) => partial_route.length >= 2)
        );
        asserttrue((oldRoute.length = sum(splitedRoutes.map((a) => a.length))));
        const newRoutes = generate_3_opt_cycle_routes(oldRoute);
        asserttrue(newRoutes.length === 8);
        asserttrue(
            newRoutes.every((route) => route.length === oldRoute.length)
        );
        console.log("oldRoute", oldRoute);
        console.log("newRoutes", newRoutes);
    }
    for (let i = 0; i < 5; i++) {
        const oldRoute = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const splitedRoutes = divide_route_to_k_opt(oldRoute, 3);
        asserttrue(splitedRoutes.length === 3);
        console.log("splitedRoutes", splitedRoutes);
        asserttrue(
            splitedRoutes.every((partial_route) => partial_route.length >= 2)
        );
        asserttrue((oldRoute.length = sum(splitedRoutes.map((a) => a.length))));
        const newRoutes = generate_3_opt_cycle_routes(oldRoute);
        asserttrue(newRoutes.length === 8);
        asserttrue(
            newRoutes.every((route) => route.length === oldRoute.length)
        );
        console.log("oldRoute", oldRoute);
        console.log("newRoutes", newRoutes);
    }
    for (let i = 0; i < 5; i++) {
        const oldRoute = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const splitedRoutes = divide_route_to_k_opt(oldRoute, 5);
        asserttrue(splitedRoutes.length === 5);
        console.log("splitedRoutes", splitedRoutes);
        asserttrue(
            splitedRoutes.every((partial_route) => partial_route.length >= 2)
        );
        asserttrue((oldRoute.length = sum(splitedRoutes.map((a) => a.length))));
        const newRoutes = generate_3_opt_cycle_routes(oldRoute);
        asserttrue(newRoutes.length === 8);
        asserttrue(
            newRoutes.every((route) => route.length === oldRoute.length)
        );
        console.log("oldRoute", oldRoute);
        console.log("newRoutes", newRoutes);
    }
}
