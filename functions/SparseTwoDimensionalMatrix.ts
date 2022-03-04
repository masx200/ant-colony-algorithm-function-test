/* 稀疏二维矩阵 非对称式*/
export type SparseTwoDimensionalMatrix<
    R extends number = number,
    C extends number = number
> = {
    values: () => number[];
    keys: () => [number, number][];
    entries: () => [number, number, number][];
    get: (row: number, column: number) => number;
    set: (row: number, column: number, value: number) => void;
    [Symbol.toStringTag]: string;
    size(): number;
    clear: () => void;
    has: (row: number, column: number) => boolean;
    delete: (row: number, column: number) => boolean;
} & { row: R; column: C };
