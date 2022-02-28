import { SparseTwoDimensionalMatrix } from "./SparseTwoDimensionalMatrix";

/* 稀疏二维矩阵 对称式*/
export type SparseTwoDimensionalMatrixSymmetry = SparseTwoDimensionalMatrix & {
    symmetry: true;
};
