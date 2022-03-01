import { nodecoordinates1 } from "./nodecoordinates1";
import { nodecoordinates2 } from "./nodecoordinates2";
import { nodecoordinates3 } from "./nodecoordinates3";
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
testGreedyalgorithmtosolvetsp(nodecoordinates1);
testGreedyalgorithmtosolvetsp(nodecoordinates2);
test_population_relative_information_entropy();
testGreedyalgorithmtosolvetsp(nodecoordinates3);
test_issubroutecycle();
testPathTabooList();
