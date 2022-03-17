import assert from "assert";
import { pickRandomOne } from "../functions/pickRandomOne";

it("pickRandomOne", () => {
    assert([7].includes(pickRandomOne([7])));
    for (let i = 0; i < 5; i++) {
        const input = [1, 4, 5, 7, 1, 6, 6, 1, 3, 5, 7];

        assert(input.includes(pickRandomOne(input)));
        assert(
            input.includes(
                pickRandomOne(
                    input,
                    input.map((a) => 1 / a)
                )
            )
        );
    }
});
