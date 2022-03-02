/**矩阵的键的生成器 */
export function* matrixkeyiterator(
    row: number,
    column: number
): Generator<[number, number], void, unknown> {
    if (!(row > 0 && column > 0)) {
        throw new Error(" row, column should greater than 0");
    }
    let i = 0;
    let j = 0;
    let count = 0;
    const maxcount = row * column;
    while (count < maxcount) {
        yield [i, j];
        if (j < column - 1) {
            j++;
        } else {
            i++;
            j = 0;
        }
        count++;
    }
}
