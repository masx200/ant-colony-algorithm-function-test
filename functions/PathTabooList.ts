import { PathTabooListSymbol } from "./PathTabooListSymbol";

/**
 * 路径禁忌列表  类似于Set*/
export type PathTabooList<N extends number = number> = {
    [PathTabooListSymbol]: true;
    size(): number;
    countofnodes: N;
    add(route: number[]): void;
    clear(): void;
    delete(route: number[]): boolean;
    keys(): number[][];
    values(): number[][];
    has(route: number[]): boolean;
    [Symbol.toStringTag]: string;
};
export function createandsetaset(
    store: Map<number, Set<number[]>>,
    route: number[]
): Set<number[]> {
    const set = new Set<number[]>();
    store.set(route.length, set);
    return set;
}
