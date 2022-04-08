// import { PathTabooList } from "../pathTabooList/PathTabooList";
import { construct_all_greedy_routes_and_lengths } from "./construct_all_greed_routes_and_lengths";
import { get_best_routeOfSeriesRoutesAndLengths } from "./get_best_routeOfSeriesRoutesAndLengths";
import { NodeCoordinates } from "./NodeCoordinates";

/* 贪心算法解决tsp问题,返回路径序列 
尝试所有起点找到最优的一个
*/
export function Greedyalgorithmtosolvetspwithallstartbest(
    node_coordinates: NodeCoordinates
    // pathTabooList: PathTabooList
): { route: number[]; total_length: number } {
    // const { length } = node_coordinates;
    const greedypathsandlengths: {
        routelength: number;
        route: number[];
    }[] = construct_all_greedy_routes_and_lengths(node_coordinates);
    const bestlengthsandroutes = get_best_routeOfSeriesRoutesAndLengths(
        greedypathsandlengths.map(({ route, routelength }) => ({
            route,
            total_length: routelength,
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

    const bestlength = bestlengthsandroutes.total_length;
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
    return { route: result, total_length: bestlength };
}
