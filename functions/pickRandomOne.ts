import { random, sum } from "lodash";
import { asserttrue } from "../test/asserttrue";

export function pickRandomOne<T>(input: Array<T>, weights: number[] = []): T {
    asserttrue(input.length > 0);
    if (input.length === 1) {
        return input[0];
    }
    if (weights.length) {
        asserttrue(weights.length === input.length);
        const sumofweights = sum(weights);
        const Roulette = weights.map((_w, i, a) => {
            return sum(a.slice(0, i + 1)) / sumofweights;
        });
        // console.log("Roulette", Roulette);
        const ran = Math.random();
        for (let i = 0; i < input.length; i++) {
            if (ran < Roulette[i]) {
                const result = input[i];
                // console.log("pickRandomOne", result, input, weights);
                return result;
            }
        }
        const last = input.at(-1);
        asserttrue(typeof last !== "undefined");
        // console.log("pickRandomOne", last, input, weights);
        return last;
    } else {
        const index = Math.min(random(0, input.length), input.length - 1);
        asserttrue(index >= 0);
        asserttrue(index < input.length);
        const result = input[index];
        // console.log("pickRandomOne", result, input);
        return result;
    }
}
