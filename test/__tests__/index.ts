import { test_issubroutecycle } from "../test-issubroutecycle";
import { test_population_relative_information_entropy } from "../test-population-relative-information-entropy";
import { testcheckcurrentsegmentsintersectnextsegment } from "../testcheckcurrentsegmentsintersectnextsegment";
import { testgeteuclideandistance } from "../testgeteuclideandistance";
import { testgetPheromonessetPheromones } from "../testgetPheromonessetPheromones";
import { testpathsequalinbothdirections } from "../testpathsequalinbothdirections";
import { testPathTabooList } from "../testPathTabooList";
import { testrobustsegmentintersect } from "../testrobustsegmentintersect";
it("main test", () => {
    testgetPheromonessetPheromones();

    testgeteuclideandistance();
    testpathsequalinbothdirections();
    testrobustsegmentintersect();

    // testdrawlinechart();

    test_population_relative_information_entropy();

    test_issubroutecycle();
    testPathTabooList();
    testcheckcurrentsegmentsintersectnextsegment();
});
