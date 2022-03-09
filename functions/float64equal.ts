export function float64equal(a: number, b: number): boolean {
    return Math.abs(a - b) <= Number.EPSILON;
}
