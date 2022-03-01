/* 稀疏二维矩阵 非对称式*/
export type SparseTwoDimensionalMatrix = {
    values: () => number[];
    keys: () => [number, number][];
    entries: () => [number, number, number][];
    get: (left: number, right: number) => number | undefined;
    set: (left: number, right: number, value: number) => void;
    [Symbol.toStringTag]: string;
    size(): number;
    clear: () => void;
    has: (left: number, right: number) => boolean;
    delete: (left: number, right: number) => boolean;
};
