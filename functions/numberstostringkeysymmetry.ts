/* 数字生成字符串键值 对称式矩阵*/
export function numberstostringkeysymmetry(
    left: number,
    right: number
): `${number},${number}` {
    let max = Math.max(left, right);
    let min = Math.min(left, right);
    return `${min},${max}`;
}
