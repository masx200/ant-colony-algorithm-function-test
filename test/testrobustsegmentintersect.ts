import { robustsegmentintersect } from "../functions/robust-segment-intersect";

export function testrobustsegmentintersect() {
    console.log("test robustsegmentintersect start");
    console.assert(
        robustsegmentintersect([-1, 0], [1, 0], [0, -1], [0, 1]),
        "general test"
    );
    console.assert(!robustsegmentintersect([0.5, 0], [1, 0], [0, -1], [0, 1]));
    console.assert(robustsegmentintersect([0, 0], [1, 0], [0, -1], [0, 1]));
    console.assert(
        robustsegmentintersect(
            [0, 0],
            [100000000000000020000, 1e-12],
            [1, 0],
            [1e20, 1e-11]
        )
    );
    console.assert(
        !robustsegmentintersect(
            [0, 0],
            [1e20, 1e-11],
            [1, 0],
            [100000000000000020000, 1e-12]
        )
    );

    console.assert(
        !robustsegmentintersect([0, 1], [0, 2], [0, -1], [0, -2]),
        "collinear, no intersect"
    );

    console.assert(
        robustsegmentintersect([0, 1], [0, 2], [0, 1.5], [0, -2]),
        "collinear, intersect"
    );

    console.assert(
        robustsegmentintersect([0, 1], [0, 2], [0, 1], [0, -2]),
        "collinear, endpoint touch"
    );

    console.assert(
        robustsegmentintersect([0, 1], [0, -1], [0, 0], [0, 1]),
        "endpoint touches"
    );
    console.log("test robustsegmentintersect ok");
}
