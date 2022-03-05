import { SparseTwoDimensionalMatrix } from "./SparseTwoDimensionalMatrix";

/* 稀疏二维矩阵 对称式*/
export type SparseTwoDimensionalMatrixSymmetry<
    R extends number = number,
    C extends number = number
> = SparseTwoDimensionalMatrix<R, C> & {
    symmetry: true;
};
