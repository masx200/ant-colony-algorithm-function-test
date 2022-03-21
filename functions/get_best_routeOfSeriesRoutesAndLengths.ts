/**找出最短路径 */
export function get_best_routeOfSeriesRoutesAndLengths(
    routesandlengths: {
        route: number[];
        totallength: number;
    }[]
): {
    route: number[];
    totallength: number;
} {
    if (!(routesandlengths.length > 0)) {
        throw new Error("routesandlengths empty!");
    }
    const iteratebestlengthandroute = routesandlengths.reduce(
        (previous, current) => {
            return previous.totallength < current.totallength
                ? previous
                : current;
        },
        routesandlengths[0]
    );

    return iteratebestlengthandroute;
}
