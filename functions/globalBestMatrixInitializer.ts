export function globalBestMatrixInitializer(
    globalbestroutesegments: [number, number][],
    globalbestlength: number
): ((row: number, column: number) => number) | undefined {
    return (i, j) =>
        globalbestroutesegments.some(
            ([left, right]) =>
                (i === left && j === right) || (j === left && i === right)
        )
            ? 1 / globalbestlength
            : 0;
}
