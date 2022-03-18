import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
import { PathTabooList } from "../pathTabooList/PathTabooList";
// import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";
import { asserttrue } from "../test/asserttrue";
import { calc_population_relative_information_entropy } from "./calc_population-relative-information-entropy";
// import { calc_relative_deviation_from_optimal } from "./calc_relative_deviation_from_optimal";
import { construct_route_from_k_opt_of_global_best } from "./construct_route_from_k_opt_of_global_best";
import { cycleroutetosegments } from "./cycleroutetosegments";
import { each_iteration_of_pheromone_update_rules } from "./each_iteration_of_pheromone_update_rules";
import { getbestRouteOfSeriesRoutesAndLengths } from "./getbestRouteOfSeriesRoutesAndLengths";
import { Nodecoordinates } from "./Nodecoordinates";
import { performPheromoneDiffusionOperations } from "./performPheromoneDiffusionOperations";

export type AdaptiveTSPSearchOptions = {
    max_results_of_k_opt: number;
    routesandlengths: {
        route: number[];
        totallength: number;
    }[];
    // emit_finish_one_route: Emit_Finish_One_Route;
    // lastrandomselectionprobability: number;
    // searchloopcountratio: number;

    getbestroute: () => number[];
    /**信息素强度*/
    pheromoneintensityQ: number;
    /**局部信息素挥发系数 */
    // pheromonevolatilitycoefficientR1: number;
    /**全局信息素挥发系数 */
    pheromonevolatilitycoefficientR2: number;
    setbestroute: (route: number[]) => void;
    setbestlength: (a: number) => void;
    getbestlength: () => number;
    nodecoordinates: Nodecoordinates;
    /**
     * 蚂蚁数量
     */
    // numberofants: number;
    // alphazero: number;
    // betazero: number;
    pathTabooList: PathTabooList;
    /**最大迭代次数 */
    // maxnumberofiterations: number;
    pheromonestore: MatrixSymmetry;
    /* 停滞迭代次数.如果连续多少代无法发现新路径,则停止搜索 */
    // numberofstagnantiterations: number;
};
/* 令蚁群算法迭代后, 一次轮次搜索完之后的处理 */
export function adaptiveTabooSingleIterateTSPSearchSolve(
    opts: AdaptiveTSPSearchOptions
): {
    // relative_deviation_from_optimal: number;
    nextrandomselectionprobability: number;
    pheromoneDiffusionProbability: number;
    optimallengthofthisround: number;
    optimalrouteofthisround: number[];
    ispheromoneDiffusion: boolean;
    population_relative_information_entropy: number;
    // locally_optimized_length: number;
} {
    // console.log(opts);
    const {
        max_results_of_k_opt,
        routesandlengths,
        // emit_finish_one_route,
        // searchloopcountratio,
        // lastrandomselectionprobability,
        pheromoneintensityQ,
        // pheromonevolatilitycoefficientR1,
        pheromonevolatilitycoefficientR2,
        setbestroute,
        setbestlength,
        pathTabooList,
        pheromonestore,
        nodecoordinates,
        // maxnumberofiterations,
        // numberofstagnantiterations,
        // numberofants,
        getbestlength,
        getbestroute,
    } = opts;
    // asserttrue(typeof numberofants === "number");
    const countofnodes = nodecoordinates.length;

    const routes = routesandlengths.map(({ route }) => route);

    /**种群相对信息熵 */
    const current_population_relative_information_entropy =
        calc_population_relative_information_entropy(routes);
    const nextrandomselectionprobability =
        Math.sqrt(
            1 - Math.pow(current_population_relative_information_entropy, 2)
        ) / 4;

    const pheromoneDiffusionProbability =
        Math.sqrt(
            1 - Math.pow(current_population_relative_information_entropy, 2)
        ) / 2;
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
    //     getbestroute,
    //     max_results_of_k_opt,
    //     nodecoordinates,
    //     getbestlength,
    //     pathTabooList,
    //     setbestlength,
    //     setbestroute,
    // });
    // const locally_optimized_length = result.totallength;

    const globalbestroute = getbestroute();
    const globalbestlength = getbestlength();

    const worstlengthandroute = routesandlengths.reduce((previous, current) => {
        return previous.totallength > current.totallength ? previous : current;
    }, routesandlengths[0]);
    const iterateworstlength = worstlengthandroute.totallength;
    const iterateworstroute = worstlengthandroute.route;

    const iteratebestlengthandroute =
        getbestRouteOfSeriesRoutesAndLengths(routesandlengths);

    const iteratebestlength = iteratebestlengthandroute.totallength;
    const iteratebestroute = iteratebestlengthandroute.route;
    const optimalrouteofthisround = iteratebestroute;
    const optimallengthofthisround = iteratebestlength;
    const iterateworstroutesegments = cycleroutetosegments(iterateworstroute);
    const iteratebestroutesegments = cycleroutetosegments(iteratebestroute);
    const globalbestroutesegments = cycleroutetosegments(globalbestroute);
    each_iteration_of_pheromone_update_rules({
        nodecoordinates,
        iteratebestroute,
        globalbestroute,
        countofnodes,
        globalbestroutesegments,
        globalbestlength,
        iteratebestroutesegments,
        iteratebestlength,
        iterateworstlength,
        iterateworstroutesegments,
        pheromoneintensityQ,
        pheromonestore,
        pheromonevolatilitycoefficientR2,
    });
    let ispheromoneDiffusion = false;
    if (Math.random() < pheromoneDiffusionProbability) {
        console.log("执行信息素扩散操作");
        ispheromoneDiffusion = true;
        //信息素扩散
        performPheromoneDiffusionOperations({
            globalbestroutesegments,
            pheromonestore,
            nodecoordinates,
        });
    }

    //与最优的相对偏差
    // const relative_deviation_from_optimal: number =
    //     calc_relative_deviation_from_optimal(
    //         routesandlengths.map(({ totallength }) => totallength),
    //         getbestlength()
    //     );
    return {
        // locally_optimized_length,
        // relative_deviation_from_optimal,
        optimallengthofthisround,
        optimalrouteofthisround,
        ispheromoneDiffusion,
        // routesandlengths,
        nextrandomselectionprobability,
        population_relative_information_entropy:
            current_population_relative_information_entropy,
        pheromoneDiffusionProbability,
    };
}
