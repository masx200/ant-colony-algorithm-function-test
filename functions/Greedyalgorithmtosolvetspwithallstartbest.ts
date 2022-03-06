// import { pickRandom } from "mathjs";
import { closedtotalpathlength } from "./closed-total-path-length";
import { Greedyalgorithmtosolvetspwithselectedstart } from "./Greedyalgorithmtosolvetspwithselectedstart";
import { Nodecoordinates } from "./Nodecoordinates";

/* 贪心算法解决tsp问题,返回路径序列 
尝试所有起点找到最优的一个
*/
export function Greedyalgorithmtosolvetspwithallstartbest(
    nodecoordinates: Nodecoordinates
): { route: number[]; totallength: number } {
    // const { length } = nodecoordinates;
    const inputindexs = Array(nodecoordinates.length)
        .fill(0)
        .map((_v, i) => i);

    const greedypathsandlengths: {
        routelength: number;
        route: number[];
    }[] = inputindexs.map(function (start): {
        routelength: number;
        route: number[];
    } {
        const route = Greedyalgorithmtosolvetspwithselectedstart(
            nodecoordinates,
            start
        );
        const routelength = closedtotalpathlength(route, nodecoordinates);
        return { routelength, route };
    });
    const bestlengthsandroutes = greedypathsandlengths.reduce(
        (previous, current) => {
            return previous.routelength < current.routelength
                ? previous
                : current;
        },
        greedypathsandlengths[0]
    );

    const bestlength = bestlengthsandroutes.routelength;
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
    return { route: result, totallength: bestlength };
}
