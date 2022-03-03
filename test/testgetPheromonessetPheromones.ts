import { isEqual } from "lodash";
import { createPheromonestore } from "../functions/createPheromonestore";
import { assertshouldcatcherror } from "./assertshouldcatcherror";
import { asserttrue } from "./asserttrue";

export function testgetPheromonessetPheromones() {
    console.log("getPheromones, setPheromones test start");

    const Pheromonestore = createPheromonestore(13);

    console.log(Pheromonestore);
    const { get: getPheromone, set: setPheromone } = Pheromonestore;
    setPheromone(1, 10, 9);
    setPheromone(12, 10, 8);
    Pheromonestore.set(11, 11, 11);

    assertshouldcatcherror(() => {
        Pheromonestore.set(13, 11, 11);
    });
    assertshouldcatcherror(() => {
        Pheromonestore.get(13, 11);
    });
    assertshouldcatcherror(() => {
        Pheromonestore.get(-1, 1);
    });
    assertshouldcatcherror(() => {
        Pheromonestore.set(-1, 0, 0);
    });
    asserttrue(Pheromonestore.size() === 3);
    asserttrue(Pheromonestore.delete(11, 11));
    asserttrue(!Pheromonestore.delete(11, 11));
    asserttrue(!Pheromonestore.has(11, 11));
    asserttrue(getPheromone(1, 10) === 9);
    asserttrue(getPheromone(12, 10) === 8);
    asserttrue(getPheromone(10, 1) === 9);
    asserttrue(getPheromone(10, 12) === 8);
    setPheromone(10, 1, 90);
    setPheromone(10, 12, 80);

    asserttrue(getPheromone(1, 10) === 90);
    asserttrue(getPheromone(12, 10) === 80);
    asserttrue(getPheromone(10, 1) === 90);
    asserttrue(getPheromone(10, 12) === 80);
    asserttrue(Pheromonestore.has(1, 10));
    asserttrue(Pheromonestore.has(12, 10));
    asserttrue(Pheromonestore.size() === 2);
    asserttrue(createPheromonestore(3).size() === 0);

    let values = Pheromonestore.values();
    // console.log(values);
    asserttrue([90, 80].every((n) => values.includes(n)));
    let keys = Pheromonestore.keys();
    // console.log(keys);
    asserttrue(
        isEqual(
            [
                [1, 10],
                [10, 12],
            ],
            keys
        )
    );
    let entries = Pheromonestore.entries();
    // console.log(entries);

    asserttrue(
        isEqual(
            [
                [1, 10, 90],
                [10, 12, 80],
            ],
            entries
        )
    );
    Pheromonestore.clear();
    asserttrue(Pheromonestore.size() === 0);
    assertshouldcatcherror(() => {
        createPheromonestore(0);
    });
    console.log("getPheromones, setPheromones test ok");
}
