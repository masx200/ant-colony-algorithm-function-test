import { PathTabooList } from "../pathTabooList/PathTabooList";
import { closedtotalpathlength } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
import { getbestRouteOfSeriesRoutesAndLengths } from "./getbestRouteOfSeriesRoutesAndLengths";
import { Nodecoordinates } from "./Nodecoordinates";
import { random_k_opt_limited_full } from "./random_k_opt_limited_full";

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
        //找到更优解,赋值最优解
        setbestlength(totallength);
        setbestroute(route);
    } else {
        pathTabooList.add(route);
    }
    //todo 精准的2-opt局部优化,消除交叉点
    return { route, totallength };
}
