import { createPheromonestore } from "./createPheromonestore";

export function testgetPheromonessetPheromones() {
    console.log("getPheromones, setPheromones test start");

    const Pheromonestore = createPheromonestore();
    console.log(Pheromonestore);
    const { getPheromone, setPheromone } = Pheromonestore;
    setPheromone(1, 10, 9);
    setPheromone(12, 10, 8);

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
    console.log(createPheromonestore());

    let values = Pheromonestore.values();
    console.log(values);
    console.assert([90, 80].every((n) => values.includes(n)));
    console.log("getPheromones, setPheromones test ok");
}
