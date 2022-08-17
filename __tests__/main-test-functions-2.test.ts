import { test_population_relative_information_entropy } from "../test/test-population-relative-information-entropy";
import { testgeteuclideandistance } from "../test/testgeteuclideandistance";
import { testgetPheromonessetPheromones } from "../test/testgetPheromonessetPheromones";
import { testpathsequalinbothdirections } from "../test/testpathsequalinbothdirections";
import { testrobustsegmentintersect } from "../test/testrobustsegmentintersect";
import { it } from "vitest";
it("main test functions-2", () => {
    testgetPheromonessetPheromones();

    testgeteuclideandistance();
    testpathsequalinbothdirections();
    testrobustsegmentintersect();

    test_population_relative_information_entropy();
});
