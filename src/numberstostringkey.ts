export function numberstostringkey(
    left: number,
    right: number): `${number},${number}` {
    let max = Math.max(left, right);
    let min = Math.min(left, right);
    return `${min},${max}`;
}
