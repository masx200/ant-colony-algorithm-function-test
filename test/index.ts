import { test_population_relative_information_entropy } from "./test-population-relative-information-entropy";
import { testgeteuclideandistance } from "./testgeteuclideandistance";
import { testgetPheromonessetPheromones } from "./testgetPheromonessetPheromones";
import { testGreedyalgorithmtosolvetsp } from "./testGreedyalgorithmtosolvetsp";
import { nodecoordinates1 } from "./nodecoordinates1";
import { nodecoordinates2 } from "./nodecoordinates2";
import { testpathsequalinbothdirections } from "./testpathsequalinbothdirections";
import { testrobustsegmentintersect } from "./testrobustsegmentintersect";

// console.log("hello world");

testgetPheromonessetPheromones();

testgeteuclideandistance();
testpathsequalinbothdirections();
testrobustsegmentintersect();

// testdrawlinechart();
testGreedyalgorithmtosolvetsp(nodecoordinates1);
testGreedyalgorithmtosolvetsp(nodecoordinates2);
test_population_relative_information_entropy();
