export function iterateWorstMatrixInitializer(
    iterateworstroutesegments: [number, number][],
    iterateworstlength: number
): ((row: number, column: number) => number) | undefined {
    return (i, j) =>
        iterateworstroutesegments.some(
            ([left, right]) =>
                (i === left && j === right) || (j === left && i === right)
        )
            ? -1 / iterateworstlength
            : 0;
}
