import { nodecoordinates21 } from "./nodecoordinates21";
import { nodecoordinates10 } from "./nodecoordinates10";
import { nodecoordinates30 } from "./nodecoordinates30";
import { test_issubroutecycle } from "./test-issubroutecycle";
import { test_population_relative_information_entropy } from "./test-population-relative-information-entropy";
import { testgeteuclideandistance } from "./testgeteuclideandistance";
import { testgetPheromonessetPheromones } from "./testgetPheromonessetPheromones";
import { testGreedyalgorithmtosolvetsp } from "./testGreedyalgorithmtosolvetsp";
import { testpathsequalinbothdirections } from "./testpathsequalinbothdirections";
import { testPathTabooList } from "./testPathTabooList";
import { testrobustsegmentintersect } from "./testrobustsegmentintersect";
import { nodecoordinates6 } from "./nodecoordinates6";
// console.log("hello world");

testGreedyalgorithmtosolvetsp(nodecoordinates6);
testgetPheromonessetPheromones();

testgeteuclideandistance();
testpathsequalinbothdirections();
testrobustsegmentintersect();

// testdrawlinechart();
testGreedyalgorithmtosolvetsp(nodecoordinates21);
testGreedyalgorithmtosolvetsp(nodecoordinates10);
test_population_relative_information_entropy();
testGreedyalgorithmtosolvetsp(nodecoordinates30);
test_issubroutecycle();
testPathTabooList();
