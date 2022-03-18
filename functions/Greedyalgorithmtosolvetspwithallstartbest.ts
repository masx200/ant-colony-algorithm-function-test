// import { PathTabooList } from "../pathTabooList/PathTabooList";
import { construct_all_greed_routes_and_lengths } from "./construct_all_greed_routes_and_lengths";
import { getbestRouteOfSeriesRoutesAndLengths } from "./getbestRouteOfSeriesRoutesAndLengths";
import { Nodecoordinates } from "./Nodecoordinates";

/* 贪心算法解决tsp问题,返回路径序列 
尝试所有起点找到最优的一个
*/
export function Greedyalgorithmtosolvetspwithallstartbest(
    nodecoordinates: Nodecoordinates
    // pathTabooList: PathTabooList
): { route: number[]; totallength: number } {
    // const { length } = nodecoordinates;
    const greedypathsandlengths: {
        routelength: number;
        route: number[];
    }[] = construct_all_greed_routes_and_lengths(nodecoordinates);
    const bestlengthsandroutes = getbestRouteOfSeriesRoutesAndLengths(
        greedypathsandlengths.map(({ route, routelength }) => ({
            route,
            totallength: routelength,
        }))
    );

    //     greedypathsandlengths.reduce(
    //     (previous, current) => {
    //         return previous.routelength < current.routelength
    //             ? previous
    //             : current;
    //     },
    //     greedypathsandlengths[0]
    // );

    const bestlength = bestlengthsandroutes.totallength;
    const result = bestlengthsandroutes.route;
    // for (let [routelength, route] of) {
    //     if (routelength < bestlength) {
    //         bestlength = routelength;
    //         result = route;
    //     }
    // }

    if (!Array.isArray(result)) {
        throw new Error("Accident");
    }
    /* 其他非最优解添加到禁忌表 */
    // greedypathsandlengths.forEach(({ route, routelength }) => {
    //     if (bestlength < routelength) {
    //         pathTabooList.add(route);
    //     }
    // });
    return { route: result, totallength: bestlength };
}
