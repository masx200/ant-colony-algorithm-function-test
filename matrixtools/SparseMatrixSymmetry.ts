import { SparseMatrix } from "./SparseMatrix";

/* 稀疏二维矩阵 对称式*/
export type SparseMatrixSymmetry<R extends number = number> = SparseMatrix<
    R,
    R
> & {
    symmetry: true;
};
