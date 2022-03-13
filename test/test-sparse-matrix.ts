import { isEqual } from "lodash";
import { assertSparseMatrixRowColumn } from "../matrixtools/assertSparseMatrixRowColumn";
import { isSparseMatrix } from "../matrixtools/isSparseMatrix";
import { SparseMatrixAdd } from "../matrixtools/SparseMatrixAdd";
import { SparseMatrixAssign } from "../matrixtools/SparseMatrixAssign";
import { SparseMatrixContinuousMultiplication } from "../matrixtools/SparseMatrixContinuousMultiplication";
import { SparseMatrixCreate } from "../matrixtools/SparseMatrixCreate";
import { SparseMatrixEquals } from "../matrixtools/SparseMatrixEquals";
import { SparseMatrixEvery } from "../matrixtools/SparseMatrixEvery";
import { SparseMatrixFill } from "../matrixtools/SparseMatrixFill";
import { SparseMatrixFrom } from "../matrixtools/SparseMatrixFrom";
import { SparseMatrixGetColumn } from "../matrixtools/SparseMatrixGetColumn";
import { SparseMatrixGetRow } from "../matrixtools/SparseMatrixGetRow";
import { SparseMatrixIdentity } from "../matrixtools/SparseMatrixIdentity";
import { SparseMatrixMax } from "../matrixtools/SparseMatrixMax";
import { SparseMatrixMin } from "../matrixtools/SparseMatrixMin";
import { SparseMatrixMultiplyNumber } from "../matrixtools/SparseMatrixMultiplyNumber";
import { SparseMatrixOfArrays } from "../matrixtools/SparseMatrixOfArrays";
import { SparseMatrixOnes } from "../matrixtools/SparseMatrixOnes";
import { SparseMatrixSome } from "../matrixtools/SparseMatrixSome";
import { SparseMatrixSubtract } from "../matrixtools/SparseMatrixSubtract";
import { SparseMatrixToArrays } from "../matrixtools/SparseMatrixToArrays";
import { SparseMatrixTranspose } from "../matrixtools/SparseMatrixTranspose";
import { SparseMatrixZeros } from "../matrixtools/SparseMatrixZeros";
import { assertshouldcatcherror } from "./assertshouldcatcherror";
import { asserttrue } from "./asserttrue";

export function testsparsematrix() {
    console.log("test sparsematrix start");
    const matrix3 = SparseMatrixCreate({
        row: 3,
        column: 2,
        initializer: (i, j) => i + j,
    });
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

    console.log(SparseMatrixCreate({ row: 1, column: 1 }));
    assertSparseMatrixRowColumn(
        SparseMatrixCreate({ row: 1, column: 1 }),
        1,
        1
    );
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
    const matrix2 = SparseMatrixOfArrays([
        [1, 2],
        [3, 4],
        [3, 4],
    ]);
    asserttrue(
        isEqual(matrix2.entries(), [
            [0, 0, 1],
            [0, 1, 2],
            [1, 0, 3],
            [1, 1, 4],
            [2, 0, 3],
            [2, 1, 4],
        ])
    );
    console.log(matrix2);
    console.log(matrix2.entries());
    SparseMatrixAssign(
        matrix2,
        SparseMatrixCreate({ row: 3, column: 2, initializer: (i, j) => i + j })
    );
    console.log(matrix2.entries());
    console.log(matrix3.entries());
    console.log(SparseMatrixToArrays(matrix2), SparseMatrixToArrays(matrix3));
    asserttrue(
        isEqual(SparseMatrixToArrays(matrix2), SparseMatrixToArrays(matrix3))
    );
    asserttrue(SparseMatrixEquals(matrix2, matrix3));
    asserttrue(SparseMatrixEquals(matrix2, SparseMatrixFrom(matrix3), matrix3));
    asserttrue(
        !SparseMatrixEquals(
            SparseMatrixFrom(matrix3),
            SparseMatrixTranspose(matrix3)
        )
    );
    console.log(SparseMatrixTranspose(matrix3));
    console.log(SparseMatrixTranspose(matrix3).entries());
    asserttrue(
        isEqual(
            [
                [0, 0, 0],
                [0, 1, 1],
                [0, 2, 2],
                [1, 0, 1],
                [1, 1, 2],
                [1, 2, 3],
            ],
            SparseMatrixTranspose(matrix3).entries()
        )
    );
    const matrix4 = SparseMatrixCreate({
        row: 3,
        column: 2,
        initializer: (i, j) => i * j,
    });
    console.log(SparseMatrixToArrays(matrix4));
    asserttrue(
        isEqual(
            [
                [0, 0],
                [0, 1],
                [0, 2],
            ],
            SparseMatrixToArrays(matrix4)
        )
    );
    SparseMatrixFill(matrix4, 9);
    console.log(SparseMatrixToArrays(matrix4));
    asserttrue(
        isEqual(
            [
                [9, 9],
                [9, 9],
                [9, 9],
            ],
            SparseMatrixToArrays(matrix4)
        )
    );
    asserttrue(SparseMatrixFrom(matrix3) != matrix3);
    asserttrue(SparseMatrixEquals(SparseMatrixFrom(matrix3), matrix3));
    asserttrue(
        SparseMatrixEquals(
            SparseMatrixOfArrays([
                [1, 1],
                [1, 1],
            ]),
            SparseMatrixMax(
                SparseMatrixOfArrays([
                    [1, 0],
                    [0, 1],
                ]),
                SparseMatrixOfArrays([
                    [0, 1],
                    [1, 0],
                ])
            )
        )
    );
    asserttrue(
        SparseMatrixEquals(
            SparseMatrixOfArrays([
                [0, 0],
                [0, 0],
            ]),
            SparseMatrixMin(
                SparseMatrixOfArrays([
                    [1, 0],
                    [0, 1],
                ]),
                SparseMatrixOfArrays([
                    [0, 1],
                    [1, 0],
                ])
            )
        )
    );
    asserttrue(
        SparseMatrixEvery(
            SparseMatrixOfArrays([
                [0, 0],
                [0, 0],
            ]),
            (v) => v === 0
        )
    );
    asserttrue(
        SparseMatrixSome(
            SparseMatrixOfArrays([
                [0, 1],
                [0, 0],
            ]),
            (v) => v === 1
        )
    );

    asserttrue(
        SparseMatrixEquals(
            SparseMatrixOfArrays([
                [1, -1],
                [-1, 1],
            ]),
            SparseMatrixSubtract(
                SparseMatrixOfArrays([
                    [1, 0],
                    [0, 1],
                ]),
                SparseMatrixOfArrays([
                    [0, 1],
                    [1, 0],
                ])
            )
        )
    );
    asserttrue(
        SparseMatrixEquals(
            SparseMatrixOfArrays([
                [3, 0],
                [0, 3],
            ]),
            SparseMatrixMultiplyNumber(
                3,
                SparseMatrixOfArrays([
                    [1, 0],
                    [0, 1],
                ])
            )
        )
    );

    asserttrue(
        SparseMatrixEquals(
            SparseMatrixOfArrays([
                [6, 0],
                [0, 6],
            ]),
            SparseMatrixContinuousMultiplication(
                SparseMatrixOfArrays([
                    [3, 0],
                    [0, 3],
                ]),
                SparseMatrixOfArrays([
                    [1, 0],
                    [0, 1],
                ]),
                SparseMatrixOfArrays([
                    [2, 0],
                    [0, 2],
                ])
            )
        )
    );
    asserttrue(
        SparseMatrixEquals(
            SparseMatrixOfArrays([
                [1, 0],
                [0, 1],
            ]),
            SparseMatrixIdentity({ row: 2, column: 2 })
        )
    );
    asserttrue(
        SparseMatrixEquals(
            SparseMatrixOfArrays([
                [0, 0],
                [0, 0],
            ]),
            SparseMatrixZeros({ row: 2, column: 2 })
        )
    );
    asserttrue(
        SparseMatrixEquals(
            SparseMatrixOfArrays([
                [1, 1, 1],
                [1, 1, 1],
            ]),
            SparseMatrixOnes({ row: 2, column: 3 })
        )
    );
    console.log(
        SparseMatrixToArrays(
            SparseMatrixContinuousMultiplication(
                SparseMatrixOfArrays([
                    [1, 2],
                    [3, 4],
                ]),
                SparseMatrixOfArrays([
                    [1, 2],
                    [3, 4],
                ])
            )
        )
    );
    asserttrue(
        isEqual(
            [1, 2],
            SparseMatrixGetRow(
                SparseMatrixOfArrays([
                    [1, 2],
                    [3, 4],
                ]),
                0
            )
        )
    );
    asserttrue(
        isEqual(
            [1, 3],
            SparseMatrixGetColumn(
                SparseMatrixOfArrays([
                    [1, 2],
                    [3, 4],
                ]),
                0
            )
        ),
        "SparseMatrixGetColumn"
    );
    asserttrue(
        SparseMatrixEquals(
            SparseMatrixContinuousMultiplication(
                SparseMatrixOfArrays([
                    [1, 2],
                    [3, 4],
                ]),
                SparseMatrixOfArrays([
                    [1, 2],
                    [3, 4],
                ])
            ),
            SparseMatrixOfArrays([
                [7, 10],
                [15, 22],
            ])
        )
    );
    console.log(
        SparseMatrixToArrays(
            SparseMatrixContinuousMultiplication(
                SparseMatrixOfArrays([
                    [1, 2],
                    [3, 4],
                ]),
                SparseMatrixOfArrays([
                    [1, 2],
                    [3, 4],
                ])
            )
        )
    );
    asserttrue(
        SparseMatrixEquals(
            SparseMatrixOfArrays([
                [3, 3],
                [3, 3],
            ]),
            SparseMatrixMax(
                SparseMatrixOfArrays([
                    [1, 0],
                    [0, 3],
                ]),
                SparseMatrixOfArrays([
                    [3, 3],
                    [3, 0],
                ])
            )
        )
    );
    console.log("test sparsematrix end");
}
