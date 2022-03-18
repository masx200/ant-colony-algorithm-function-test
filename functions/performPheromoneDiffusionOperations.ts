import {
    MatrixSymmetry,
    MatrixSymmetryCreate,
    MatrixToArrays,
    MatrixAdd,
    MatrixFrom,
    MatrixAssign,
} from "@masx200/sparse-2d-matrix";
import { combinations } from "combinatorial-generators";
import { sum } from "lodash";

import { asserttrue } from "../test/asserttrue";
import { copyArrayAndShuffle } from "./copyArrayAndShuffle";
import { cycleroutetosegments } from "./cycleroutetosegments";
import { euclideandistance } from "./euclideandistance";
import { getalldistancesofnodes } from "./getalldistancesofnodes";
import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { haverepetitions } from "./haverepetitions";
import { ispathsequalinbothdirectionswithoutcycle } from "./ispathsequalinbothdirectionswithoutcycle";
import { Nodecoordinates } from "./Nodecoordinates";
/**执行信息素扩散操作 */
export function performPheromoneDiffusionOperations({
    globalbestroute,
    // globalbestroutesegments,
    pheromonestore,
    nodecoordinates,
}: {
    // globalbestroutesegments: [number, number][];
    globalbestroute: number[];
    pheromonestore: MatrixSymmetry<number>;
    nodecoordinates: Nodecoordinates;
}): void {
    const globalbestroutesegments = cycleroutetosegments(globalbestroute);
    globalbestroutesegments.forEach(
        pheromoneDiffusionCallback({
            pheromonestore,
            nodecoordinates,
            globalbestroutesegments,
        })
    );
    function pheromoneDiffusionCallback({
        pheromonestore,
        nodecoordinates,
        globalbestroutesegments,
    }: {
        pheromonestore: MatrixSymmetry<number>;
        nodecoordinates: Nodecoordinates;
        globalbestroutesegments: [number, number][];
    }): (
        value: [number, number],
        index: number,
        array: [number, number][]
    ) => void {
        return function ([cityA, cityB]) {
            const pheromoneZ = pheromonestore.get(cityA, cityB);

            const centerofcircleE: [number, number] = [
                (nodecoordinates[cityA][0] + nodecoordinates[cityB][0]) / 2,
                (nodecoordinates[cityA][1] + nodecoordinates[cityB][1]) / 2,
            ];
            //     x: (nodecoordinates[left][0] + nodecoordinates[right][0]) / 2,
            //     y: (nodecoordinates[left][1] + nodecoordinates[right][1]) / 2,
            // };
            let theradiusofthecircle =
                Math.max(...getalldistancesofnodes(nodecoordinates)) / 4;
            const inputindexs = Array(nodecoordinates.length)
                .fill(0)
                .map((_v, i) => i);
            const nodesinsidecircle = inputindexs
                .map((city) => ({
                    distance: euclideandistance(
                        nodecoordinates[city],
                        centerofcircleE
                    ),
                    city: city,
                }))
                .filter(({ distance }) => distance < theradiusofthecircle)
                .sort((a, b) => /*从小到大排序*/ a.distance - b.distance)
                .slice(0, 50)
                .map((a) => a.city);

            /* 如果 nodesinsidecircle没达到25个应该设为nodesinsidecircle的长度*/
            const selectedcitiesinsidecircle = copyArrayAndShuffle(
                nodesinsidecircle
            ).slice(0, 25); /*
        ); */
            asserttrue(Array.isArray(selectedcitiesinsidecircle));
            asserttrue(!haverepetitions(selectedcitiesinsidecircle));
            const segmentsinsidecircle = [
                ...combinations(selectedcitiesinsidecircle, 2),
            ].filter(
                ([left, right]) =>
                    !globalbestroutesegments.some(([leftofbest, rightofbest]) =>
                        ispathsequalinbothdirectionswithoutcycle(
                            [left, right],
                            [leftofbest, rightofbest]
                        )
                    )
            );
            if (segmentsinsidecircle.length) {
                const { row } = pheromonestore;

                const deltapheromonestore = MatrixSymmetryCreate({
                    row,
                    initializer: () => 0,
                });
                deltapheromonestore.set(cityA, cityB, -pheromoneZ * 0.5);
                const citiesandd1xd2 = segmentsinsidecircle.map(
                    ([cityC, cityD]) => {
                        // debugger;
                        const pointF: [number, number] = [
                            (nodecoordinates[cityC][0] +
                                nodecoordinates[cityD][0]) /
                                2,
                            (nodecoordinates[cityC][1] +
                                nodecoordinates[cityD][1]) /
                                2,
                        ];
                        const distanceofCD = geteuclideandistancebyindex(
                            cityC,
                            cityD,
                            nodecoordinates
                        );
                        const distanceofEF = euclideandistance(
                            pointF,
                            centerofcircleE
                        );
                        const distanceofCDxdistanceofEF =
                            distanceofCD * distanceofEF;
                        return { cityC, cityD, distanceofCDxdistanceofEF };
                    }
                );

                const coefficientK =
                    3 /
                    Math.max(
                        ...citiesandd1xd2.map(
                            ({ distanceofCDxdistanceofEF }) =>
                                distanceofCDxdistanceofEF
                        )
                    );
                const citiesandweights = citiesandd1xd2.map(
                    ({ cityC, cityD, distanceofCDxdistanceofEF }) => {
                        const weight = Math.exp(
                            -Math.pow(
                                coefficientK * distanceofCDxdistanceofEF,
                                2
                            )
                        );

                        return { cityC, cityD, weight };
                    }
                );
                const weightsum = sum(
                    citiesandweights.map(({ weight }) => weight)
                );
                const pheromonedeltaofcities = citiesandweights.map(
                    ({ cityC, cityD, weight }) => {
                        const pheromonedelta =
                            (0.5 * pheromoneZ * weight) / weightsum;
                        return { cityC, cityD, pheromonedelta };
                    }
                );
                // debugger;
                pheromonedeltaofcities.forEach(
                    ({ cityC, cityD, pheromonedelta }) => {
                        deltapheromonestore.set(cityC, cityD, pheromonedelta);
                        deltapheromonestore.set(cityD, cityC, pheromonedelta);
                    }
                );
                console.log(
                    "deltapheromone",
                    MatrixToArrays(deltapheromonestore)
                );
                const pheromonestorenext = MatrixAdd(
                    MatrixFrom(pheromonestore),
                    deltapheromonestore
                );
                const oldpheromonestore = MatrixFrom(pheromonestore);
                console.log({
                    oldpheromonestore: MatrixToArrays(oldpheromonestore),
                    pheromonestorenext: MatrixToArrays(pheromonestorenext),
                });
                asserttrue(pheromonestorenext.values().every((a) => a > 0));
                MatrixAssign(pheromonestore, pheromonestorenext);
            }
        };
    }
}
