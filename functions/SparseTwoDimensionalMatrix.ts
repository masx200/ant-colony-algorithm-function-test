export type SparseTwoDimensionalMatrix = {
    values: () => number[];
    keys: () => [number, number][];
    entries: () => [number, number, number][];
    get: (left: number, right: number) => number | undefined;
    set: (left: number, right: number, value: number) => void;
    [Symbol.toStringTag]: string;
    size(): number;
};
