import { ispathsequalinbothdirectionswithcycle } from "../functions/ispathsequalinbothdirectionswithcycle";
import { asserttrue } from "./asserttrue";

export function testpathsequalinbothdirections() {
    // console.log("test pathsequalinbothdirections start");

    asserttrue(ispathsequalinbothdirectionswithcycle([1, 2, 3], [3, 2, 1]));
    asserttrue(ispathsequalinbothdirectionswithcycle([1, 2, 3], [1, 2, 3]));
    asserttrue(!ispathsequalinbothdirectionswithcycle([1, 2, 3], [0, 10, 100]));
    asserttrue(!ispathsequalinbothdirectionswithcycle([1, 2, 3], [3, 2, 1, 4]));
    asserttrue(ispathsequalinbothdirectionswithcycle([1, 2, 3], [3, 1, 2]));
    asserttrue(
        ispathsequalinbothdirectionswithcycle([1, 2, 3, 4], [4, 1, 2, 3])
    );
    asserttrue(
        ispathsequalinbothdirectionswithcycle([1, 2, 3, 4], [4, 3, 2, 1])
    );

    asserttrue(
        ispathsequalinbothdirectionswithcycle([0, 1, 2, 3, 4], [0, 4, 3, 2, 1])
    );
    asserttrue(
        ispathsequalinbothdirectionswithcycle([4, 0, 1, 2, 3], [0, 4, 3, 2, 1])
    );
    asserttrue(
        ispathsequalinbothdirectionswithcycle([1, 2, 3, 4, 0], [4, 3, 2, 1, 0])
    );
    asserttrue(
        ispathsequalinbothdirectionswithcycle([2, 3, 4, 0, 1], [4, 3, 2, 1, 0])
    );
    // console.log("test pathsequalinbothdirections ok");
}
