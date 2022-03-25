import { MatrixToArrays } from "@masx200/sparse-2d-matrix";
import { createPheromoneStore } from "../functions/createPheromoneStore";

import { assertshouldcatcherror } from "./assertshouldcatcherror";
import { asserttrue } from "./asserttrue";

export function testgetPheromonessetPheromones() {
    // console.log("getPheromones, setPheromones test start");

    const pheromoneStore = createPheromoneStore(13);

    // console.log(pheromoneStore);
    const { get: getPheromone, set: setPheromone } = pheromoneStore;
    setPheromone(1, 10, 9);
    setPheromone(12, 10, 8);
    pheromoneStore.set(11, 11, 11);

    assertshouldcatcherror(() => {
        pheromoneStore.set(13, 11, 11);
    });
    assertshouldcatcherror(() => {
        pheromoneStore.get(13, 11);
    });
    assertshouldcatcherror(() => {
        pheromoneStore.get(-1, 1);
    });
    assertshouldcatcherror(() => {
        pheromoneStore.set(-1, 0, 0);
    });
    // asserttrue(pheromoneStore.size() === 3);
    // asserttrue(pheromoneStore.delete(11, 11));
    // asserttrue(!pheromoneStore.delete(11, 11));
    asserttrue(pheromoneStore.has(11, 11));
    asserttrue(MatrixToArrays(pheromoneStore).length === 13);
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
    asserttrue(pheromoneStore.has(1, 10));
    asserttrue(pheromoneStore.has(12, 10));
    // asserttrue(pheromoneStore.size() === 2);
    // asserttrue(createPheromoneStore(3).size() === 0);

    let values = pheromoneStore.values();
    // console.log(values);
    asserttrue([90, 80].every((n) => values.includes(n)));
    let keys = pheromoneStore.keys();
    // console.log(keys);
    asserttrue(keys.length === 169);
    asserttrue(keys.every((pair) => pair.length === 2));

    let entries = pheromoneStore.entries();
    // console.log(entries);
    asserttrue(entries.length === 169);
    asserttrue(entries.every((pair) => pair.length === 3));
    // asserttrue(
    //     isEqual(
    //         [
    //             [1, 10, 90],
    //             [10, 12, 80],
    //         ],
    //         entries
    //     )
    // );
    // pheromoneStore.clear();
    // asserttrue(pheromoneStore.size() === 0);
    assertshouldcatcherror(() => {
        createPheromoneStore(0);
    });
    // console.log("getPheromones, setPheromones test ok");
}
