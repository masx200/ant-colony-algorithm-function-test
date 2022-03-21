import "core-js/actual/array/at";
import { test_issubroutecycle } from "../test/test-issubroutecycle";
import { test_population_relative_information_entropy } from "../test/test-population-relative-information-entropy";
import { testcheckcurrentsegmentsintersectnextsegment } from "../test/testcheckcurrentsegmentsintersectnextsegment";
import { testclosedtotalpathlength } from "../test/testclosedtotalpathlength";
import { testgeteuclideandistance } from "../test/testgeteuclideandistance";
import { testgetPheromonessetPheromones } from "../test/testgetPheromonessetPheromones";
import { testpathsequalinbothdirections } from "../test/testpathsequalinbothdirections";
import { testpathTabooList } from "../test/testPathTabooList";
import { testrobustsegmentintersect } from "../test/testrobustsegmentintersect";
import { testgreedynode_coordinates6 } from "../test/testgreedynode_coordinates6";
// import { testMatrix } from "../test-sparse-matrix";

it("main test functions", () => {
    testgetPheromonessetPheromones();

    testgeteuclideandistance();
    testpathsequalinbothdirections();
    testrobustsegmentintersect();

    // testdrawlinechart();

    test_population_relative_information_entropy();

    test_issubroutecycle();
    testpathTabooList();
    testcheckcurrentsegmentsintersectnextsegment();
    testclosedtotalpathlength();
    testgreedynode_coordinates6();
    // testMatrix();
});
