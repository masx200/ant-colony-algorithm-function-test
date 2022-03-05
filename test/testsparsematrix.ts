import { isEqual } from "lodash";
import { assertSparseMatrixRowColumn } from "../matrixtools/assertSparseMatrixRowColumn";
import { isSparseMatrix } from "../matrixtools/isSparseMatrix";
import { SparseMatrixAdd } from "../matrixtools/SparseMatrixAdd";
import { SparseMatrixCreate } from "../matrixtools/SparseMatrixCreate";
import { SparseMatrixOfArrays } from "../matrixtools/SparseMatrixOfArrays";
import { SparseMatrixToArrays } from "../matrixtools/SparseMatrixToArrays";
import { assertshouldcatcherror } from "./assertshouldcatcherror";
import { asserttrue } from "./asserttrue";

export function testsparsematrix() {
    console.log("test sparsematrix start");
    assertshouldcatcherror(() => {
        SparseMatrixOfArrays([]);
    });
    const matrix1 = SparseMatrixOfArrays([
        [1, 2],
        [3, 4],
    ]);
    console.log(matrix1);
    console.log("entries", matrix1.entries());
    asserttrue(
        isEqual(
            [
                [0, 0, 1],
                [0, 1, 2],
                [1, 0, 3],
                [1, 1, 4],
            ],
            matrix1.entries()
        )
    );
    asserttrue(isSparseMatrix(matrix1));
    asserttrue(!isSparseMatrix([]));
    asserttrue(matrix1.at(-1, -1) === 4);
    const arrays = SparseMatrixToArrays(matrix1);
    console.log("arrays:", arrays);
    asserttrue(
        isEqual(arrays, [
            [1, 2],
            [3, 4],
        ])
    );

    assertshouldcatcherror(() => {
        SparseMatrixAdd(
            SparseMatrixOfArrays([
                [1, 0],
                [0, 1],
            ])
        );
    });
    asserttrue(
        isEqual(
            [
                [4, 3],
                [3, 4],
            ],
            SparseMatrixToArrays(
                SparseMatrixAdd(
                    SparseMatrixOfArrays([
                        [1, 0],
                        [0, 1],
                    ]),
                    SparseMatrixCreate({
                        row: 2,
                        column: 2,
                        initializer: () => 3,
                    })
                )
            )
        )
    );
    asserttrue(
        isEqual(
            [
                [4, 4],
                [4, 4],
            ],
            SparseMatrixToArrays(
                SparseMatrixAdd(
                    SparseMatrixOfArrays([
                        [1, 0],
                        [0, 1],
                    ]),
                    SparseMatrixCreate({
                        row: 2,
                        column: 2,
                        initializer: () => 3,
                    }),
                    SparseMatrixOfArrays([
                        [0, 1],
                        [1, 0],
                    ])
                )
            )
        )
    );

    console.log(SparseMatrixCreate());
    assertSparseMatrixRowColumn(SparseMatrixCreate(), 1, 1);
    assertSparseMatrixRowColumn(
        SparseMatrixCreate({ row: 2, column: 3 }),
        2,
        3
    );
    assertshouldcatcherror(() => {
        assertSparseMatrixRowColumn(
            SparseMatrixCreate({ row: 3, column: 3 }),
            2,
            3
        );
    });

    console.log("test sparsematrix end");
}
