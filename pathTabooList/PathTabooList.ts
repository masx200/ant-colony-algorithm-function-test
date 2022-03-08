import { pathTabooListSymbol } from "./pathTabooListSymbol";

/**
 * 路径禁忌列表  类似于Set*/
export type PathTabooList<N extends number = number> = {
    [pathTabooListSymbol]: true;
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
