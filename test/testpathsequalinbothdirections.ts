import { ispathsequalinbothdirections } from "../functions/ispathsequalinbothdirections";

export function testpathsequalinbothdirections() {
    console.log("test pathsequalinbothdirections start");

    console.assert(ispathsequalinbothdirections([1, 2, 3], [3, 2, 1]));
    console.assert(ispathsequalinbothdirections([1, 2, 3], [1, 2, 3]));
    console.assert(!ispathsequalinbothdirections([1, 2, 3], [0, 10, 100]));
    console.assert(!ispathsequalinbothdirections([1, 2, 3], [3, 2, 1, 4]));
    console.log("test pathsequalinbothdirections ok");
}
