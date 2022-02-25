import { getPheromone, setPheromone } from "./getsetPheromone";

export function testgetPheromonessetPheromones() {
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
    console.log("getPheromones, setPheromones test ok");
}
