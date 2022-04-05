import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { assert_true } from "../test/assert_true";
import { closedtotalpathlength } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
// import { construct_one_step_route_of_taboo } from "./construct_one_step_route_of_taboo";
// import { FilterForbiddenBeforePick } from "./FilterForbiddenBeforePick.funtype";
import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
// import { IntersectionFilter } from "./IntersectionFilter.funtype";
// import { intersectionfilterfun } from "./intersectionfilterfun";
import { NodeCoordinates } from "./NodeCoordinates";
// import { PathTabooList } from "../pathTabooList/PathTabooList";
import { picknextnodeRoulette } from "./pick-next-node-Roulette";
import { PickNextNodeRouletteOptions } from "./PickNextNodeRouletteOptions";
import { pickRandomOne } from "./pickRandomOne";
import { SharedOptions } from "./SharedOptions";
import { select_available_cities_from_optimal_and_latest } from "./select_available_cities_from_optimal_and_latest";

// export type PathConstructOptions = ;
/**使用状态转移概率生成路径. */
export function generate_paths_using_state_transition_probabilities(
    options: {
        alpha_zero: number;
        beta_zero: number;
        randomselectionprobability: number;
        /**搜索循环次数比例 */
        // searchloopcountratio: number;
        // get_best_length: () => number;
        node_coordinates: NodeCoordinates;

        pheromoneStore: MatrixSymmetry;
    } & SharedOptions
): {
    route: number[];
    totallength: number;
    // countofloops: number;
} {
    // const filternotforbiddenbeforepick: FilterForbiddenBeforePick =
    //     filternotforbiddenbeforepickfun;
    // const intersectionfilter: IntersectionFilter = intersectionfilterfun;
    const picknextnode: (args: PickNextNodeRouletteOptions) => number =
        picknextnodeRoulette;
    const {
        get_neighbors_from_optimal_routes_and_latest_routes,
        number_of_city_of_large,
        // searchloopcountratio,

        randomselectionprobability,
        // get_best_length,
        //  parameterrandomization,
        // startnode,
        //   count_of_nodes,

        // intersectionfilter,
        node_coordinates,
        // picknextnode,
        pheromoneStore,

        //   ,
        //    ,
        alpha_zero,
        //     ,
        //    ,
        beta_zero,
        // pathTabooList,
    } = options;

    const count_of_nodes = node_coordinates.length;
    /**单次搜索最多循环次数 */
    // const maximumnumberofloopsforasinglesearch =
    //     count_of_nodes * searchloopcountratio;
    // //console.log("单次搜索最多循环次数", maximumnumberofloopsforasinglesearch);
    const getpheromone = (left: number, right: number) => {
        return pheromoneStore.get(left, right);
    };
    const getdistancebyserialnumber = (left: number, right: number) => {
        return geteuclideandistancebyindex(left, right, node_coordinates);
    };

    // const pathTabooList: pathTabooList = createpathTabooList(count_of_nodes);
    const inputindexs = Array(node_coordinates.length)
        .fill(0)
        .map((_v, i) => i);
    const startnode = getnumberfromarrayofnmber(pickRandomOne(inputindexs));
    const route: number[] = [startnode];
    const availablenodes = new Set<number>(
        inputindexs.filter((v) => !route.includes(v))
    );
    // function getroute() {
    //     return Array.from(route);
    // }
    /**循环次数 */
    // let trycount = 0;
    // const starttime = Number(new Date());
    const is_count_not_large = count_of_nodes <= number_of_city_of_large;
    while (route.length !== count_of_nodes) {
        const current_city = Array.from(route).slice(-1)[0];
        //　每一步的可选城市的组成为集合Toptimal和集合Tlatest中的路径中与当前城市相连的城市,如果可选城市数量不满NCL,则随机选择其余城市添加到可选列表,直到可选城市数量达到NCL.
        const filterednodes = is_count_not_large
            ? availablenodes
            : select_available_cities_from_optimal_and_latest({
                  availablenodes,
                  get_neighbors_from_optimal_routes_and_latest_routes,
                  current_city,
                  max_size: number_of_city_of_large,
              });

        const nextnode = picknextnode({
            randomselectionprobability,
            //   ,
            //  ,
            alpha_zero,
            //  ,
            //   ,
            beta_zero,

            currentnode: current_city,
            availablenextnodes: Array.from(filterednodes),
            getpheromone,
            getdistancebyserialnumber,
        });
        // route = [...route, nextnode];
        route.push(nextnode);
        availablenodes.delete(nextnode);
    }

    assert_true(route.length == count_of_nodes);
    const routelength = closedtotalpathlength({
        // count_of_nodes: route.length,
        path: route,
        getdistancebyindex: creategetdistancebyindex(node_coordinates),
    });
    const totallength = routelength;
    // console.log("路径一条构建完成,循环次数", trycount);
    // const endtime = Number(new Date());
    //console.log("路径一条构建完成,消耗时间毫秒", endtime - starttime);
    //console.log(
    //   "路径一条构建完成,平均每次循环消耗的时间毫秒",
    //    (endtime - starttime) / trycount
    //   );
    return { route, totallength /* countofloops: trycount  */ };
}

