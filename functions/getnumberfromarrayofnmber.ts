export function getnumberfromarrayofnmber(input: number | number[]): number {
    const result = typeof input === "number" ? input : input[0];
    if (typeof result !== "number") {
        // debugger;
        throw new Error("accident");
    }
    return result;
}
