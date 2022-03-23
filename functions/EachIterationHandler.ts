import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
// import { PathTabooList } from "../pathTabooList/PathTabooList";
// import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";
import { asserttrue } from "../test/asserttrue";
import { calc_population_relative_information_entropy } from "./calc_population-relative-information-entropy";
// import { calc_relative_deviation_from_optimal } from "./calc_relative_deviation_from_optimal";
// import { construct_route_from_k_opt_of_global_best } from "./construct_route_from_k_opt_of_global_best";
// import { cycleroutetosegments } from "./cycleroutetosegments";
import { pheromone_update_rule_after_iteration } from "./pheromone_update_rule_after_iteration";
import { get_best_routeOfSeriesRoutesAndLengths } from "./get_best_routeOfSeriesRoutesAndLengths";
import { getworstRouteOfSeriesRoutesAndLengths } from "./getworstRouteOfSeriesRoutesAndLengths";
import { NodeCoordinates } from "./NodeCoordinates";
import { performPheromoneDiffusionOperations } from "./performPheromoneDiffusionOperations";

// export type AdaptiveTSPSearchOptions =;
/* 令蚁群算法迭代后, 一次轮次搜索完之后的处理 */
export function EachIterationHandler(opts: {
    // max_results_of_k_opt: number;
    routesandlengths: {
        route: number[];
        totallength: number;
    }[];
    // emit_finish_one_route: Emit_Finish_One_Route;
    // lastrandomselectionprobability: number;
    // searchloopcountratio: number;
    min_coefficient_of_pheromone_diffusion: number;
    max_coefficient_of_pheromone_diffusion: number;

    get_best_route: () => number[];
    /**信息素强度*/
    pheromone_intensity_Q: number;
    /**局部信息素挥发系数 */
    // pheromone_volatility_coefficient_R1: number;
    /**全局信息素挥发系数 */
    pheromone_volatility_coefficient_R2: number;
    // setbestroute: (route: number[]) => void;
    // setbestlength: (a: number) => void;
    get_best_length: () => number;
    node_coordinates: NodeCoordinates;
    /**
     * 蚂蚁数量
     */
    // number_of_ants: number;
    // alpha_zero: number;
    // beta_zero: number;
    // pathTabooList: PathTabooList;
    /**最大迭代次数 */
    // maxnumberofiterations: number;
    pheromoneStore: MatrixSymmetry;
    /* 停滞迭代次数.如果连续多少代无法发现新路径,则停止搜索 */
    // numberofstagnantiterations: number;
}): {
    // relative_deviation_from_optimal: number;
    nextrandomselectionprobability: number;
    pheromoneDiffusionProbability: number;
    optimallengthofthisround: number;
    optimalrouteofthisround: number[];
    // ispheromoneDiffusion: boolean;
    population_relative_information_entropy: number;
    // locally_optimized_length: number;
} {
    // console.log(opts);
    const {
        min_coefficient_of_pheromone_diffusion,

        max_coefficient_of_pheromone_diffusion,

        // max_results_of_k_opt,
        routesandlengths,
        // emit_finish_one_route,
        // searchloopcountratio,
        // lastrandomselectionprobability,
        pheromone_intensity_Q,
        // pheromone_volatility_coefficient_R1,
        pheromone_volatility_coefficient_R2,
        // setbestroute,
        // setbestlength,
        // pathTabooList,
        pheromoneStore,
        node_coordinates,
        // maxnumberofiterations,
        // numberofstagnantiterations,
        // number_of_ants,
        get_best_length,
        get_best_route,
    } = opts;
    // asserttrue(typeof number_of_ants === "number");
    const count_of_nodes = node_coordinates.length;

    const routes = routesandlengths.map(({ route }) => route);

    /**种群相对信息熵 */
    const current_population_relative_information_entropy =
        calc_population_relative_information_entropy(routes);
    const nextrandomselectionprobability =
        Math.sqrt(
            1 - Math.pow(current_population_relative_information_entropy, 2)
        ) / 8;

    const pheromoneDiffusionProbability =
        Math.sqrt(
            1 - Math.pow(current_population_relative_information_entropy, 2)
        ) / 3;
    console.log(
        "种群相对信息熵",
        current_population_relative_information_entropy
    );
    console.log("随机选择概率", nextrandomselectionprobability);
    console.log("信息素扩散概率", pheromoneDiffusionProbability);
    asserttrue(!Number.isNaN(current_population_relative_information_entropy));
    asserttrue(!Number.isNaN(nextrandomselectionprobability));
    asserttrue(!Number.isNaN(pheromoneDiffusionProbability));

    //对全局最优解进行k-opt优化

    // const result = construct_route_from_k_opt_of_global_best({
    //     get_best_route,
    //     max_results_of_k_opt,
    //     node_coordinates,
    //     get_best_length,
    //     pathTabooList,
    //     setbestlength,
    //     setbestroute,
    // });
    // const locally_optimized_length = result.totallength;

    const globalbestroute = get_best_route();
    const globalbestlength = get_best_length();

    const worstlengthandroute =
        getworstRouteOfSeriesRoutesAndLengths(routesandlengths);

    //     routesandlengths.reduce((previous, current) => {
    //     return previous.totallength > current.totallength ? previous : current;
    // }, routesandlengths[0]);
    const iterateworstlength = worstlengthandroute.totallength;
    const iterateworstroute = worstlengthandroute.route;

    const iteratebestlengthandroute =
        get_best_routeOfSeriesRoutesAndLengths(routesandlengths);

    const iteratebestlength = iteratebestlengthandroute.totallength;
    const iteratebestroute = iteratebestlengthandroute.route;
    const optimalrouteofthisround = iteratebestroute;
    const optimallengthofthisround = iteratebestlength;
    // const iterateworstroutesegments = cycleroutetosegments(iterateworstroute);
    // const iteratebestroutesegments = cycleroutetosegments(iteratebestroute);
    // const globalbestroutesegments = cycleroutetosegments(globalbestroute);
    pheromone_update_rule_after_iteration({
        // node_coordinates,
        iteratebestroute,
        globalbestroute,
        count_of_nodes,
        // globalbestroutesegments,
        globalbestlength,
        // iteratebestroutesegments,
        iteratebestlength,
        iterateworstlength,
        iterateworstroute,
        pheromone_intensity_Q,
        pheromoneStore,
        pheromone_volatility_coefficient_R2,
    });
    // let ispheromoneDiffusion = false;
    // if (Math.random() < pheromoneDiffusionProbability) {
    console.log("执行信息素扩散操作");
    // ispheromoneDiffusion = true;
    //信息素扩散
    performPheromoneDiffusionOperations({
        pheromoneDiffusionProbability,
        min_coefficient_of_pheromone_diffusion,

        max_coefficient_of_pheromone_diffusion,

        globalbestroute,
        pheromoneStore,
        node_coordinates,
    });
    // }

    //与最优的相对偏差
    // const relative_deviation_from_optimal: number =
    //     calc_relative_deviation_from_optimal(
    //         routesandlengths.map(({ totallength }) => totallength),
    //         get_best_length()
    //     );
    return {
        // locally_optimized_length,
        // relative_deviation_from_optimal,
        optimallengthofthisround,
        optimalrouteofthisround,
        // ispheromoneDiffusion,
        // routesandlengths,
        nextrandomselectionprobability,
        population_relative_information_entropy:
            current_population_relative_information_entropy,
        pheromoneDiffusionProbability,
    };
}
