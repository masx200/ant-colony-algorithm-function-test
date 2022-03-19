/**环形路径切成线段 */
export function cycleroutetosegments(path: number[]): [number, number][] {
    return path.map((value, index, array) => {
        const nextindex = index === array.length - 1 ? 0 : index + 1;
        return [value, array[nextindex]];
    });
}
