import {
    MatrixAdd,
    MatrixAssign,
    // MatrixFrom,
    MatrixSymmetry,
    MatrixSymmetryCreate,
} from "@masx200/sparse-2d-matrix";
import { combinations } from "combinatorial-generators";
import { sum } from "lodash";
import { assert_true } from "../test/assert_true";
import { copyArrayAndShuffle } from "./copyArrayAndShuffle";
import { cycle_routetosegments } from "./cycle_routetosegments";
import { euclideandistance } from "./euclideandistance";
import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { get_max_distance_of_node_coordinates } from "./get_max_distance_of_node_coordinates";
import { haverepetitions } from "./haverepetitions";
import { ispathsequalinbothdirectionswithoutcycle } from "./ispathsequalinbothdirectionswithoutcycle";
import { NodeCoordinates } from "./NodeCoordinates";

/**执行信息素扩散操作 */
export function performPheromoneDiffusionOperations({
    // setPheromone,
    // getPheromone,
    pheromoneDiffusionProbability,
    min_coefficient_of_pheromone_diffusion,

    max_coefficient_of_pheromone_diffusion,

    globalbestroute,
    // globalbestroutesegments,
    pheromoneStore,
    node_coordinates,
}: {
    // setPheromone: (row: number, column: number, value: number) => void;
    // getPheromone: (row: number, column: number) => number;
    pheromoneDiffusionProbability: number;
    min_coefficient_of_pheromone_diffusion: number;
    max_coefficient_of_pheromone_diffusion: number;

    // globalbestroutesegments: [number, number][];
    globalbestroute: number[];
    pheromoneStore: MatrixSymmetry<number>;
    node_coordinates: NodeCoordinates;
}): void {
    const globalbestroutesegments = cycle_routetosegments(globalbestroute);
    globalbestroutesegments.forEach((segment) => {
        if (Math.random() < pheromoneDiffusionProbability) {
            pheromoneDiffusionCallback({
                min_coefficient_of_pheromone_diffusion,
                // setPheromone,
                // getPheromone,
                max_coefficient_of_pheromone_diffusion,

                pheromoneStore,
                node_coordinates,
                globalbestroutesegments,
            })(segment);
        }
    });
    function pheromoneDiffusionCallback({
        // setPheromone,
        // getPheromone,
        max_coefficient_of_pheromone_diffusion,
        min_coefficient_of_pheromone_diffusion,
        pheromoneStore,
        node_coordinates,
        globalbestroutesegments,
    }: {
        // setPheromone: (row: number, column: number, value: number) => void;
        // getPheromone: (row: number, column: number) => number;
        min_coefficient_of_pheromone_diffusion: number;
        max_coefficient_of_pheromone_diffusion: number;

        pheromoneStore: MatrixSymmetry<number>;
        node_coordinates: NodeCoordinates;
        globalbestroutesegments: [number, number][];
    }): (value: [number, number]) => void {
        return function ([cityA, cityB]) {
            const pheromoneZ = pheromoneStore.get(cityA, cityB);

            const centerofcircleE: [number, number] = [
                (node_coordinates[cityA][0] + node_coordinates[cityB][0]) / 2,
                (node_coordinates[cityA][1] + node_coordinates[cityB][1]) / 2,
            ];
            //     x: (node_coordinates[left][0] + node_coordinates[right][0]) / 2,
            //     y: (node_coordinates[left][1] + node_coordinates[right][1]) / 2,
            // };
            const theradiusofthecircle =
                get_max_distance_of_node_coordinates(node_coordinates) / 4;
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
            assert_true(Array.isArray(selectedcitiesinsidecircle));
            assert_true(!haverepetitions(selectedcitiesinsidecircle));
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
                        const CDxEF = distanceofCD * distanceofEF;
                        return { cityC, cityD, CDxEF };
                    }
                );

                const coefficientK =
                    3 / Math.max(...citiesandd1xd2.map(({ CDxEF }) => CDxEF));
                const citiesandweights = citiesandd1xd2.map(
                    ({ cityC, cityD, CDxEF }) => {
                        const weight = Math.exp(
                            -Math.pow(coefficientK * CDxEF, 2)
                        );

                        return { cityC, cityD, weight };
                    }
                );
                const weightX0 = 1;
                const weightsum =
                    weightX0 +
                    sum(citiesandweights.map(({ weight }) => weight));
                /*  const pheromonedeltaofcities = */

                citiesandweights.forEach(({ cityC, cityD, weight }) => {
                    const pheromonedelta = (pheromoneZ * weight) / weightsum;

                    deltapheromoneStore.set(cityC, cityD, pheromonedelta);
                    deltapheromoneStore.set(cityD, cityC, pheromonedelta);

                    // return { cityC, cityD, pheromonedelta };
                });
                // debugger;
                // pheromonedeltaofcities.forEach(
                //     ({ cityC, cityD, pheromonedelta }) => {
                //         deltapheromoneStore.set(cityC, cityD, pheromonedelta);
                //         deltapheromoneStore.set(cityD, cityC, pheromonedelta);
                //     }
                // );
                const pheromoneX0 = (pheromoneZ * weightX0) / weightsum;
                // const delta_pheromoneX0 = pheromoneX0 - pheromoneZ;
                // deltapheromoneStore.set(cityA, cityB, delta_pheromoneX0);
                // deltapheromoneStore.set(cityB, cityA, delta_pheromoneX0);
                // console.log(
                //     "deltapheromone",
                //     MatrixToArrays(deltapheromoneStore)
                // );
                const pheromoneStorenext = MatrixAdd(
                    pheromoneStore,
                    deltapheromoneStore
                );
                pheromoneStorenext.set(cityA, cityB, pheromoneX0);
                pheromoneStorenext.set(cityB, cityA, pheromoneX0);
                // const oldpheromoneStore = MatrixFrom(pheromoneStore);
                // console.log({
                //     oldpheromoneStore: MatrixToArrays(oldpheromoneStore),
                //     pheromoneStorenext: MatrixToArrays(pheromoneStorenext),
                // });

                MatrixAssign(pheromoneStore, pheromoneStorenext);
                assert_true(pheromoneStore.values().every((a) => a > 0));
            }
        };
    }
}
