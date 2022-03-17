import { PathTabooList } from "../pathTabooList/PathTabooList";
import { closedtotalpathlength } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
import { divide_route_to_2_opt_with_segment } from "./divide_route_to_2-opt-with-segment";
import { generate_2_opt_cycle_routes_with_splitted_Routes } from "./generate_2_opt_cycle_routes_with_splitted_Routes";
import { getbestRouteOfSeriesRoutesAndLengths } from "./getbestRouteOfSeriesRoutesAndLengths";
import { intersection_filter_with_cycle_route_find_one } from "./intersection_filter_with_cycle_route-find-one";
import { Nodecoordinates } from "./Nodecoordinates";
import { random_k_opt_limited_full } from "./random_k_opt_limited_full";

/**对全局最优解进行随机k-opt优化,如果还有交叉点,使用精准2-opt去除交叉点 */
export function construct_route_from_k_opt_of_global_best({
    getbestroute,
    max_results_of_k_opt,
    nodecoordinates,
    getbestlength,
    pathTabooList,
    setbestlength,
    setbestroute,
}: {
    getbestroute: () => number[];
    max_results_of_k_opt: number;
    nodecoordinates: Nodecoordinates;
    getbestlength: () => number;
    pathTabooList: PathTabooList<number>;
    setbestlength: (bestlength: number) => void;
    setbestroute: (route: number[]) => void;
}): { route: number[]; totallength: number } {
    const routes_of_k_opt = random_k_opt_limited_full({
        // countofnodes,
        oldRoute: getbestroute(),
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
        .filter((a) => a.totallength !== getbestlength());
    const { route: best_route_of_k_opt, totallength: best_length_of_k_opt } =
        getbestRouteOfSeriesRoutesAndLengths(routesAndLengths);
    routesAndLengths.forEach(({ route, totallength }) => {
        if (best_length_of_k_opt < totallength) {
            //非最优解添加到禁忌表
            pathTabooList.add(route);
        }
    });
    const bestlength = getbestlength();
    const totallength = best_length_of_k_opt;
    const route = best_route_of_k_opt;
    if (bestlength && bestlength > totallength) {
        console.log(
            "k-opt-发现更优解",

            best_route_of_k_opt,
            best_length_of_k_opt
        );
        pathTabooList.add(getbestroute());
        //找到更优解,赋值最优解
        setbestlength(totallength);
        setbestroute(route);
    } else {
        pathTabooList.add(route);
    }
    // 精准的2-opt局部优化,消除交叉点

    const intersection = intersection_filter_with_cycle_route_find_one({
        cycleroute: getbestroute(),
        nodecoordinates,
    });
    if (intersection) {
        const splitted_Routes = divide_route_to_2_opt_with_segment(
            getbestroute(),
            intersection
        );
        const routes_of_2_opt_accurate =
            generate_2_opt_cycle_routes_with_splitted_Routes(
                getbestroute(),
                splitted_Routes
            );
        const routesAndLengths = routes_of_2_opt_accurate
            .map((route) => {
                const totallength = closedtotalpathlength({
                    // countofnodes: route.length,
                    path: route,
                    getdistancebyindex:
                        creategetdistancebyindex(nodecoordinates),
                });
                return { totallength, route };
            })
            .filter((a) => a.totallength !== getbestlength());
        const {
            route: best_route_of_2_opt,
            totallength: best_length_of_2_opt,
        } = getbestRouteOfSeriesRoutesAndLengths(routesAndLengths);
        routesAndLengths.forEach(({ route, totallength }) => {
            if (best_length_of_2_opt < totallength) {
                //非最优解添加到禁忌表
                pathTabooList.add(route);
            }
        });
        const bestlength = getbestlength();
        const totallength = best_length_of_2_opt;
        const route = best_route_of_2_opt;
        if (bestlength && bestlength > totallength) {
            console.log(
                "2-opt-发现更优解",

                best_route_of_2_opt,
                best_length_of_2_opt
            );
            pathTabooList.add(getbestroute());
            //找到更优解,赋值最优解
            setbestlength(totallength);
            setbestroute(route);
        } else {
            pathTabooList.add(route);
        }
        return { route, totallength };
    } else {
        return { route, totallength };
    }
}
