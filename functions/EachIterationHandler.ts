import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import {
    default_Cross_Point_Coefficient_of_Non_Optimal_Paths,
    default_Pheromone_Increase_Coefficient_of_Non_Optimal_Paths,
} from "../src/default_Options";
// import { PathTabooList } from "../pathTabooList/PathTabooList";
// import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";
import { assert_true } from "../test/assert_true";
import { calc_population_relative_information_entropy } from "./calc_population-relative-information-entropy";
import { getworstRouteOfSeriesRoutesAndLengths } from "./getworstRouteOfSeriesRoutesAndLengths";
import { get_best_routeOfSeriesRoutesAndLengths } from "./get_best_routeOfSeriesRoutesAndLengths";
import { NodeCoordinates } from "./NodeCoordinates";
import { performPheromoneDiffusionOperations } from "./performPheromoneDiffusionOperations";
// import { calc_relative_deviation_from_optimal } from "./calc_relative_deviation_from_optimal";
// import { construct_route_from_k_opt_of_global_best } from "./construct_route_from_k_opt_of_global_best";
// import { cycleroutetosegments } from "./cycleroutetosegments";
import { pheromone_update_rule_after_iteration } from "./pheromone_update_rule_after_iteration";
import { SharedOptions } from "./SharedOptions";

// export type AdaptiveTSPSearchOptions =;
/* 令蚁群算法迭代后, 一次轮次搜索完之后的处理 */
export function EachIterationHandler(
    options: SharedOptions & {
        // setPheromone: (row: number, column: number, value: number) => void;
        // getPheromone: (row: number, column: number) => number;
        cross_Point_Coefficient_of_Non_Optimal_Paths?: number;
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
        // set_best_route: (route: number[]) => void;
        // set_best_length: (a: number) => void;
        get_best_length: () => number;
        node_coordinates: NodeCoordinates;
        /**
         * 蚂蚁数量
         */
        // count_of_ants: number;
        // alpha_zero: number;
        // beta_zero: number;
        // pathTabooList: PathTabooList;
        /**最大迭代次数 */
        // maxnumberofiterations: number;
        // pheromoneStore: MatrixSymmetry;
        coefficient_of_pheromone_Increase_Non_Optimal_Paths?: number;
        /* 停滞迭代次数.如果连续多少代无法发现新路径,则停止搜索 */
        // numberofstagnantiterations: number;
    }
): {
    coefficient_of_diversity_increase: number;
    // relative_deviation_from_optimal: number;
    nextrandomselectionprobability: number;
    pheromoneDiffusionProbability: number;
    optimallengthofthisround: number;
    optimalrouteofthisround: number[];
    // ispheromoneDiffusion: boolean;
    population_relative_information_entropy: number;
    // locally_optimized_length: number;
} {
    // console.log(options);
    const {
        // setPheromone,
        // getPheromone,
        cross_Point_Coefficient_of_Non_Optimal_Paths = default_Cross_Point_Coefficient_of_Non_Optimal_Paths,
        coefficient_of_pheromone_Increase_Non_Optimal_Paths = default_Pheromone_Increase_Coefficient_of_Non_Optimal_Paths,
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
        // set_best_route,
        // set_best_length,
        // pathTabooList,
        pheromoneStore,
        node_coordinates,
        // maxnumberofiterations,
        // numberofstagnantiterations,
        // count_of_ants,
        get_best_length,
        get_best_route,
    } = options;
    // asserttrue(typeof count_of_ants === "number");
    const count_of_nodes = node_coordinates.length;

    const routes = routesandlengths.map(({ route }) => route);

    /**种群相对信息熵 */
    const current_population_relative_information_entropy =
        calc_population_relative_information_entropy(routes);

    const coefficient_of_diversity_increase = Math.sqrt(
        1 - Math.pow(current_population_relative_information_entropy, 2)
    );
    const nextrandomselectionprobability =
        coefficient_of_diversity_increase / 8;
    const pheromoneDiffusionProbability = coefficient_of_diversity_increase / 4;
    // console.log(
    //     "种群相对信息熵",
    //     current_population_relative_information_entropy
    // );
    // console.log("随机选择概率", nextrandomselectionprobability);
    // console.log("信息素扩散概率", pheromoneDiffusionProbability);
    assert_true(!Number.isNaN(current_population_relative_information_entropy));
    assert_true(!Number.isNaN(nextrandomselectionprobability));
    assert_true(!Number.isNaN(pheromoneDiffusionProbability));

    //对全局最优解进行k-opt优化

    // const result = construct_route_from_k_opt_of_global_best({
    //     get_best_route,
    //     max_results_of_k_opt,
    //     node_coordinates,
    //     get_best_length,
    //     pathTabooList,
    //     set_best_length,
    //     set_best_route,
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
        ...options,
        cross_Point_Coefficient_of_Non_Optimal_Paths,
        coefficient_of_pheromone_Increase_Non_Optimal_Paths,
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
        // setPheromone,
        // getPheromone,
    });
    // let ispheromoneDiffusion = false;
    // if (Math.random() < pheromoneDiffusionProbability) {
    // console.log("执行信息素扩散操作");
    // ispheromoneDiffusion = true;
    //信息素扩散
    performPheromoneDiffusionOperations({
        pheromoneDiffusionProbability,
        min_coefficient_of_pheromone_diffusion,

        max_coefficient_of_pheromone_diffusion,

        globalbestroute,
        pheromoneStore,
        node_coordinates,
        // setPheromone,
        // getPheromone,
    });
    // }

    //与最优的相对偏差
    // const relative_deviation_from_optimal: number =
    //     calc_relative_deviation_from_optimal(
    //         routesandlengths.map(({ totallength }) => totallength),
    //         get_best_length()
    //     );
    return {
        coefficient_of_diversity_increase,
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
