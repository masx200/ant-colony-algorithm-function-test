import { ispathsequalinbothdirectionswithcycle } from "../functions/ispathsequalinbothdirectionswithcycle";

export function testpathsequalinbothdirections() {
    console.log("test pathsequalinbothdirections start");

    console.assert(ispathsequalinbothdirectionswithcycle([1, 2, 3], [3, 2, 1]));
    console.assert(ispathsequalinbothdirectionswithcycle([1, 2, 3], [1, 2, 3]));
    console.assert(
        !ispathsequalinbothdirectionswithcycle([1, 2, 3], [0, 10, 100])
    );
    console.assert(
        !ispathsequalinbothdirectionswithcycle([1, 2, 3], [3, 2, 1, 4])
    );
    console.assert(ispathsequalinbothdirectionswithcycle([1, 2, 3], [3, 1, 2]));
    console.assert(
        ispathsequalinbothdirectionswithcycle([1, 2, 3, 4], [4, 1, 2, 3])
    );
    console.assert(
        ispathsequalinbothdirectionswithcycle([1, 2, 3, 4], [4, 3, 2, 1])
    );

    console.assert(
        ispathsequalinbothdirectionswithcycle([0, 1, 2, 3, 4], [0, 4, 3, 2, 1])
    );
    console.assert(
        ispathsequalinbothdirectionswithcycle([4, 0, 1, 2, 3], [0, 4, 3, 2, 1])
    );
    console.assert(
        ispathsequalinbothdirectionswithcycle([1, 2, 3, 4, 0], [4, 3, 2, 1, 0])
    );
    console.assert(
        ispathsequalinbothdirectionswithcycle([2, 3, 4, 0, 1], [4, 3, 2, 1, 0])
    );
    console.log("test pathsequalinbothdirections ok");
}
