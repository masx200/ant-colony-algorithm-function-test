import { pathsequalinbothdirections } from "./Pathsequalinbothdirections";

export function testpathsequalinbothdirections() {
    console.log("test pathsequalinbothdirections start");

    console.assert(pathsequalinbothdirections([1, 2, 3], [3, 2, 1]));
    console.assert(pathsequalinbothdirections([1, 2, 3], [1, 2, 3]));
    console.assert(!pathsequalinbothdirections([1, 2, 3], [0, 0, 0]));
    console.assert(!pathsequalinbothdirections([1, 2, 3], [3, 2, 1, 4]));
    console.log("test pathsequalinbothdirections ok");
}
