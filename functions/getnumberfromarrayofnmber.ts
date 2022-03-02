export function getnumberfromarrayofnmber(input: number | number[]): number {
    return typeof input === "number" ? input : input[0];
}
