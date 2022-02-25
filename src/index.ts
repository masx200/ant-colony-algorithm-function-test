import { getPheromones, setPheromones } from "./getsetPheromones";

console.log("hello world");
setPheromones(1, 10, 9);
setPheromones(12, 10, 8);

console.assert(getPheromones(1, 10) === 9);
console.assert(getPheromones(12, 10) === 8);
console.assert(getPheromones(10, 1) === 9);
console.assert(getPheromones(10, 12) === 8);
setPheromones(10, 1, 90);
setPheromones(10, 12, 80);

console.assert(getPheromones(1, 10) === 90);
console.assert(getPheromones(12, 10) === 80);
console.assert(getPheromones(10, 1) === 90);
console.assert(getPheromones(10, 12) === 80);
console.log("getPheromones, setPheromones test ok" );
