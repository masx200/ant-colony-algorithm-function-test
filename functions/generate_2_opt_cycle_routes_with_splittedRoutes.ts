import { asserttrue } from "../test/asserttrue";
import { reversearray } from "./reversearray";
/* 生成3-opt的路径 */
export function generate_2_opt_cycle_routes_with_splittedRoutes(
    oldRoute: number[],
    splittedRoutes: [number[], number[]]
): number[][] {
    asserttrue(oldRoute.length >= 4);

    asserttrue(
        splittedRoutes.every((partial_route) => partial_route.length >= 2)
    );
    const [first, second] = splittedRoutes;
    /*      [false, false],等于     [true, true], */
    /*    [true, false],,等于     [false, true], */
    const routes: number[][] = [
        [true, false],
        [false, false],
    ].map(([i, j]) => {
        return [
            ...(i ? reversearray(first) : first),
            ...(j ? reversearray(second) : second),
        ];
    });
    asserttrue(routes.every((route) => route.length === oldRoute.length));
    return routes;
}
