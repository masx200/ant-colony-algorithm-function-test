/* 回环路径重新组织顺序 */
export function cyclereoganize(route: number[], startwith: number): number[] {
    if (!route.includes(startwith)) {
        throw new Error("incorrect startwith or route");
    }
    const firstindexinright = route.findIndex((v) => v === startwith);
    if (firstindexinright < 0) {
        throw new Error("incorrect startwith or route");
    }
    const result = route
        .slice(firstindexinright)
        .concat(route.slice(0, firstindexinright));
    return result;
}
