import {
  euclideandistance,
  geteuclideandistancebyindex,
} from "./geteuclideandistance";
import { Nodecoordinates } from "./Nodecoordinates";

export function testgeteuclideandistance() {
  console.log("testgeteuclideandistance test start");
  console.assert(euclideandistance([3, 4], [0, 0]) === 5);

  let nodecoordinates1: Nodecoordinates = [
    [0, 0],
    [1, 4],
    [5, 5],
    [6, 8],
  ];
  console.assert(geteuclideandistancebyindex(0, 3, nodecoordinates1) === 10);
  console.assert(geteuclideandistancebyindex(3, 0, nodecoordinates1) === 10);
  console.assert(geteuclideandistancebyindex(2, 2, nodecoordinates1) === 0);

  let nodecoordinates2: Nodecoordinates = [
    [0, 0],
    [1, 4],
    [6, 8],
    [5, 5],
  ];
  console.assert(geteuclideandistancebyindex(0, 2, nodecoordinates2) === 10);
  console.assert(geteuclideandistancebyindex(2, 0, nodecoordinates2) === 10);
  console.assert(geteuclideandistancebyindex(1, 1, nodecoordinates2) === 0);
  console.log("testgeteuclideandistance test ok");
}
