/* 判断无双向无回环的子路径 */
export function issubroutenotcyclewithoutreverse(
    parentroute: number[],
    childroute: number[]
): boolean {
    const startitem = childroute[0];

    const positionofitemofparent = parentroute.findIndex(
        (v) => v === startitem
    );
    if (positionofitemofparent < 0) {
        return false;
    }
    return childroute
        .map(
            (item, index) => item - parentroute[positionofitemofparent + index]
        )
        .every((a) => a === 0);
}
