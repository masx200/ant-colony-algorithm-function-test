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
import { NodeCoordinates } from "./NodeCoordinates";
/**执行信息素扩散操作 */
export function performPheromoneDiffusionOperations({

min_coefficient_of_pheromone_diffusion,

max_coefficient_of_pheromone_diffusion,

    globalbestroute,
    // globalbestroutesegments,
    pheromoneStore,
    node_coordinates,
}: {


min_coefficient_of_pheromone_diffusion:number
max_coefficient_of_pheromone_diffusion:number

    // globalbestroutesegments: [number, number][];
    globalbestroute: number[];
    pheromoneStore: MatrixSymmetry<number>;
    node_coordinates: NodeCoordinates;
}): void {
    const globalbestroutesegments = cycleroutetosegments(globalbestroute);
    globalbestroutesegments.forEach(
        pheromoneDiffusionCallback({
min_coefficient_of_pheromone_diffusion,

max_coefficient_of_pheromone_diffusion,

            pheromoneStore,
            node_coordinates,
            globalbestroutesegments,
        })
    );
    function pheromoneDiffusionCallback({max_coefficient_of_pheromone_diffusion,
min_coefficient_of_pheromone_diffusion,
        pheromoneStore,
        node_coordinates,
        globalbestroutesegments,
    }: {
min_coefficient_of_pheromone_diffusion:number
max_coefficient_of_pheromone_diffusion:number

        pheromoneStore: MatrixSymmetry<number>;
        node_coordinates: NodeCoordinates;
        globalbestroutesegments: [number, number][];
    }): (
        value: [number, number],
        index: number,
        array: [number, number][]
    ) => void {
        return function ([cityA, cityB]) {
            const pheromoneZ = pheromoneStore.get(cityA, cityB);

            const centerofcircleE: [number, number] = [
                (node_coordinates[cityA][0] + node_coordinates[cityB][0]) / 2,
                (node_coordinates[cityA][1] + node_coordinates[cityB][1]) / 2,
            ];
            //     x: (node_coordinates[left][0] + node_coordinates[right][0]) / 2,
            //     y: (node_coordinates[left][1] + node_coordinates[right][1]) / 2,
            // };
            let theradiusofthecircle =
                Math.max(...getalldistancesofnodes(node_coordinates)) / 4;
            const inputindexs = Array(node_coordinates.length)
                .fill(0)
                .map((_v, i) => i);
            const nodesinsidecircle = inputindexs
                .map((city) => ({
                    distance: euclideandistance(
                        node_coordinates[city],
                        centerofcircleE
                    ),
                    city: city,
                }))
                .filter(({ distance }) => distance < theradiusofthecircle)
                .sort((a, b) => /*从小到大排序*/ a.distance - b.distance)
                .slice(0, max_coefficient_of_pheromone_diffusion)
                .map((a) => a.city);

            /* 如果 nodesinsidecircle没达到25个应该设为nodesinsidecircle的长度*/
            const selectedcitiesinsidecircle = copyArrayAndShuffle(
                nodesinsidecircle
            ).slice(0, min_coefficient_of_pheromone_diffusion);

 /*
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
                const { row } = pheromoneStore;

                const deltapheromoneStore = MatrixSymmetryCreate({
                    row,
                    initializer: () => 0,
                });
                deltapheromoneStore.set(cityA, cityB, -pheromoneZ * 0.5);
                const citiesandd1xd2 = segmentsinsidecircle.map(
                    ([cityC, cityD]) => {
                        // debugger;
                        const pointF: [number, number] = [
                            (node_coordinates[cityC][0] +
                                node_coordinates[cityD][0]) /
                                2,
                            (node_coordinates[cityC][1] +
                                node_coordinates[cityD][1]) /
                                2,
                        ];
                        const distanceofCD = geteuclideandistancebyindex(
                            cityC,
                            cityD,
                            node_coordinates
                        );
                        const distanceofEF = euclideandistance(
                            pointF,
                            centerofcircleE
                        );
                        const CDxEF =
                            distanceofCD * distanceofEF;
                        return { cityC, cityD, CDxEF };
                    }
                );

                const coefficientK =
                    3 /
                    Math.max(
                        ...citiesandd1xd2.map(
                            ({ CDxEF }) =>
                                CDxEF
                        )
                    );
                const citiesandweights = citiesandd1xd2.map(
                    ({ cityC, cityD, CDxEF }) => {
                        const weight = Math.exp(
                            -Math.pow(
                                coefficientK * CDxEF,
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
                        deltapheromoneStore.set(cityC, cityD, pheromonedelta);
                        deltapheromoneStore.set(cityD, cityC, pheromonedelta);
                    }
                );
                console.log(
                    "deltapheromone",
                    MatrixToArrays(deltapheromoneStore)
                );
                const pheromoneStorenext = MatrixAdd(
                    MatrixFrom(pheromoneStore),
                    deltapheromoneStore
                );
                const oldpheromoneStore = MatrixFrom(pheromoneStore);
                console.log({
                    oldpheromoneStore: MatrixToArrays(oldpheromoneStore),
                    pheromoneStorenext: MatrixToArrays(pheromoneStorenext),
                });
                asserttrue(pheromoneStorenext.values().every((a) => a > 0));
                MatrixAssign(pheromoneStore, pheromoneStorenext);
            }
        };
    }
}
