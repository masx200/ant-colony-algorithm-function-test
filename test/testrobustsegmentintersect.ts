import { robustsegmentintersect } from "../functions/robust-segment-intersect";
import { asserttrue } from "./asserttrue";

export function testrobustsegmentintersect() {
    console.log("test robustsegmentintersect start");
    asserttrue(
        robustsegmentintersect([-1, 0], [1, 0], [0, -1], [0, 1]),
        "general test"
    );
    asserttrue(!robustsegmentintersect([0.5, 0], [1, 0], [0, -1], [0, 1]));
    asserttrue(robustsegmentintersect([0, 0], [1, 0], [0, -1], [0, 1]));
    asserttrue(
        robustsegmentintersect(
            [0, 0],
            [100000000000000020000, 1e-12],
            [1, 0],
            [1e20, 1e-11]
        )
    );
    asserttrue(
        !robustsegmentintersect(
            [0, 0],
            [1e20, 1e-11],
            [1, 0],
            [100000000000000020000, 1e-12]
        )
    );

    asserttrue(
        !robustsegmentintersect([0, 1], [0, 2], [0, -1], [0, -2]),
        "collinear, no intersect"
    );

    asserttrue(
        robustsegmentintersect([0, 1], [0, 2], [0, 1.5], [0, -2]),
        "collinear, intersect"
    );

    asserttrue(
        robustsegmentintersect([0, 1], [0, 2], [0, 1], [0, -2]),
        "collinear, endpoint touch"
    );

    asserttrue(
        robustsegmentintersect([0, 1], [0, -1], [0, 0], [0, 1]),
        "endpoint touches"
    );
    console.log("test robustsegmentintersect ok");
}
