export function getbestRouteOfSeriesRoutesAndLengths(
    routesandlengths: {
        route: number[];
        totallength: number;
    }[]
): {
    route: number[];
    totallength: number;
} {
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
