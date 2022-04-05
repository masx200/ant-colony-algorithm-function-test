export function getworstRouteOfSeriesRoutesAndLengths(
    routesandlengths: {
        route: number[];
        total_length: number;
    }[]
): {
    route: number[];
    total_length: number;
} {
    if (!(routesandlengths.length > 0)) {
        throw new Error("routesandlengths empty!");
    }
    const iteratebestlengthandroute = routesandlengths.reduce(
        (previous, current) => {
            return previous.total_length > current.total_length
                ? previous
                : current;
        },
        routesandlengths[0]
    );

    return iteratebestlengthandroute;
}
