import { cachebestlengthofnode_coordinates } from "../functions/cachebestlengthofnode_coordinates";
import { cachebestrouteofnode_coordinates } from "../functions/cachebestrouteofnode_coordinates";
import { cachenode_coordinatestopathTabooList } from "../functions/cachenode_coordinatestopathTabooList";
import { closedtotalpathlength } from "../functions/closed-total-path-length";
import { creategetdistancebyindex } from "../functions/creategetdistancebyindex";
import { createchart } from "../functions/createchart";
import { createpathTabooList } from "../pathTabooList/createPathTabooList";
import { createPheromoneStore } from "../functions/createPheromoneStore";
import { drawlinechart } from "../functions/drawlinechart";
// import { intersectionfilter } from "../functions/intersectionfilter";
import { NodeCoordinates } from "../functions/NodeCoordinates";
// import { picknextnodeRoulette } from "../functions/pick-next-node-Roulette";
import { taboo_backtracking_path_construction } from "../functions/Taboo-backtracking-path-construction";

import { asserttrue } from "./asserttrue";
import { MatrixFill } from "@masx200/sparse-2d-matrix";

export function test_taboo_backtracking_path_construction(
    node_coordinates: NodeCoordinates
) {
    /**搜索循环次数比例 */
    const searchloopcountratio = 40;

    const randomselectionprobability = 0.15;
    // const { length } = node_coordinates;
    const count_of_nodes = node_coordinates.length;
    const pathTabooList =
        cachenode_coordinatestopathTabooList.get(node_coordinates) ??
        createptlandset(count_of_nodes, node_coordinates);

    const pheromoneStore = createPheromoneStore(count_of_nodes);
    MatrixFill(pheromoneStore, 1);
    // const parameterrandomization = false;
    const alpha_zero = 1;
    // const   = alpha_zero * 2;
    // const   = alpha_zero / 5;
    const beta_zero = 5;
    // const   = beta_zero * 2;
    //  const   = beta_zero / 5;
    console.log("test_taboo_backtracking_path_construction start");
    console.log("禁忌回溯要解决的问题的坐标是", node_coordinates);

    function get_best_length(): number {
        return (
            cachebestlengthofnode_coordinates.get(node_coordinates) || Infinity
        );
    }
    const { route } = taboo_backtracking_path_construction({
        searchloopcountratio,

        randomselectionprobability,
        get_best_length,
        pathTabooList,
        pheromoneStore,
        // count_of_nodes,
        // picknextnode: picknextnodeRoulette,
        node_coordinates,
        // intersectionfilter,
        //   parameterrandomization,
        // startnode,
        //     ,
        //     ,
        alpha_zero,
        //     ,
        //      ,
        beta_zero,
        // filterforbiddenbeforepick,
    });
    console.log("禁忌回溯算法得到的路径是", route);
    const totallength = closedtotalpathlength({
        // count_of_nodes: route.length,
        path: route,
        getdistancebyindex: creategetdistancebyindex(node_coordinates),
    });
    console.log("禁忌回溯算法得出的路径长度", totallength);

    if (
        typeof cachebestlengthofnode_coordinates.get(node_coordinates) !==
        "number"
    ) {
        cachebestlengthofnode_coordinates.set(node_coordinates, totallength);

        cachebestrouteofnode_coordinates.set(node_coordinates, route);
    } else {
        const bestlength =
            cachebestlengthofnode_coordinates.get(node_coordinates);
        if (bestlength && bestlength >= totallength) {
            cachebestlengthofnode_coordinates.set(
                node_coordinates,
                totallength
            );
            cachebestrouteofnode_coordinates.set(node_coordinates, route);
        } else {
            console.warn("路径长度比最优解得到的结果更差,禁忌此路径", route);
            pathTabooList.add(route);
        }
    }
    console.log(
        "最优路径长度",
        cachebestlengthofnode_coordinates.get(node_coordinates)
    );
    /* 每条路径构建完成之后,如果路径长度比贪心算法得到的结果更差,则将此路径添加到路径禁忌列表. */
    console.log(
        "最短路径是",
        cachebestrouteofnode_coordinates.get(node_coordinates)
    );
    asserttrue(route.length === node_coordinates.length);
    const linechardata = [...route, route[0]].map((v) => node_coordinates[v]);
    console.log("禁忌回溯算法路径结果画图坐标", linechardata);
    console.log("test drawlinechart");
    const { chart /* container */ /* , resize */ } = createchart();
    drawlinechart({
        // resize,
        data: linechardata,
        chart: chart,
        titletext: `城市数:${node_coordinates.length},路径长度:${totallength}`,
    });
    // cacheechartscontainers.add(container);
    console.log("test_taboo_backtracking_path_construction end");
    console.log("禁忌列表", pathTabooList, pathTabooList.size());
}
function createptlandset(
    count_of_nodes: number,
    node_coordinates: NodeCoordinates
) {
    const ptl = createpathTabooList(count_of_nodes);
    cachenode_coordinatestopathTabooList.set(node_coordinates, ptl);
    return ptl;
}
