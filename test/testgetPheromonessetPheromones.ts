import { isEqual } from "lodash";
import { createPheromonestore } from "../functions/createPheromonestore";
import { assertshouldcatcherror } from "./assertshouldcatcherror";

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
    console.assert(Pheromonestore.size() === 3);
    console.assert(Pheromonestore.delete(11, 11));
    console.assert(!Pheromonestore.delete(11, 11));
    console.assert(!Pheromonestore.has(11, 11));
    console.assert(getPheromone(1, 10) === 9);
    console.assert(getPheromone(12, 10) === 8);
    console.assert(getPheromone(10, 1) === 9);
    console.assert(getPheromone(10, 12) === 8);
    setPheromone(10, 1, 90);
    setPheromone(10, 12, 80);

    console.assert(getPheromone(1, 10) === 90);
    console.assert(getPheromone(12, 10) === 80);
    console.assert(getPheromone(10, 1) === 90);
    console.assert(getPheromone(10, 12) === 80);
    console.assert(Pheromonestore.has(1, 10));
    console.assert(Pheromonestore.has(12, 10));
    console.assert(Pheromonestore.size() === 2);
    console.assert(createPheromonestore(3).size() === 0);

    let values = Pheromonestore.values();
    // console.log(values);
    console.assert([90, 80].every((n) => values.includes(n)));
    let keys = Pheromonestore.keys();
    // console.log(keys);
    console.assert(
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

    console.assert(
        isEqual(
            [
                [1, 10, 90],
                [10, 12, 80],
            ],
            entries
        )
    );
    Pheromonestore.clear();
    console.assert(Pheromonestore.size() === 0);
    assertshouldcatcherror(() => {
        createPheromonestore(0);
    });
    console.log("getPheromones, setPheromones test ok");
}
