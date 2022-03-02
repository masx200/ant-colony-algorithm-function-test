import { nodecoordinates10 } from "./nodecoordinates10";
import { nodecoordinates21 } from "./nodecoordinates21";
import { nodecoordinates30 } from "./nodecoordinates30";
import { nodecoordinates6 } from "./nodecoordinates6";
import { test_issubroutecycle } from "./test-issubroutecycle";
import { test_population_relative_information_entropy } from "./test-population-relative-information-entropy";
import { testgeteuclideandistance } from "./testgeteuclideandistance";
import { testgetPheromonessetPheromones } from "./testgetPheromonessetPheromones";
import { testGreedyalgorithmtosolvetsp } from "./testGreedyalgorithmtosolvetsp";
import { testpathsequalinbothdirections } from "./testpathsequalinbothdirections";
import { testPathTabooList } from "./testPathTabooList";
import { testrobustsegmentintersect } from "./testrobustsegmentintersect";
import { test_taboo_backtracking_path_construction } from "./testTaboo-backtracking-path-construction";
// console.log("hello world");

testGreedyalgorithmtosolvetsp(nodecoordinates6);
testgetPheromonessetPheromones();

testgeteuclideandistance();
testpathsequalinbothdirections();
testrobustsegmentintersect();

// testdrawlinechart();

testGreedyalgorithmtosolvetsp(nodecoordinates10);
test_population_relative_information_entropy();

test_issubroutecycle();

testGreedyalgorithmtosolvetsp(nodecoordinates21);
testGreedyalgorithmtosolvetsp(nodecoordinates30);
test_taboo_backtracking_path_construction(nodecoordinates6);
testPathTabooList();
