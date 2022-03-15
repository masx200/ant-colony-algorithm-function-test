import { MatrixSymmetry } from "@masx200/sparse-2d-matrix";
// import { DataOfFinishOneRoute } from "./DataOfFinishOneRoute";
import { asserttrue } from "../test/asserttrue";
import { calc_relative_standard_deviation } from "./calc_relative_standard_deviation";
import { cycleroutetosegments } from "./cycleroutetosegments";
import { each_iteration_of_pheromone_update_rules } from "./each_iteration_of_pheromone_update_rules";
import { getbestRouteOfSeriesRoutesAndLengths } from "./getbestRouteOfSeriesRoutesAndLengths";
import { Nodecoordinates } from "./Nodecoordinates";
import { performPheromoneDiffusionOperations } from "./performPheromoneDiffusionOperations";
import { calc_population_relative_information_entropy } from "./calc_population-relative-information-entropy";
import { random } from "lodash";
import { generate_k_opt_cycle_routes_limited } from "./generate_k_opt_cycle_routes_limited";
import { closedtotalpathlength } from "./closed-total-path-length";
import { creategetdistancebyindex } from "./creategetdistancebyindex";
import { PathTabooList } from "../pathTabooList/PathTabooList";

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
    relative_standard_deviation: number;
    nextrandomselectionprobability: number;
    pheromoneDiffusionProbability: number;
    optimallengthofthisround: number;
    optimalrouteofthisround: number[];
    ispheromoneDiffusion: boolean;
    population_relative_information_entropy: number;
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
    const k = random(2, countofnodes / 2, false);
    const routes_of_k_opt = generate_k_opt_cycle_routes_limited(
        getbestroute(),
        k,
        max_results_of_k_opt
    );
    const routesAndLengths = routes_of_k_opt.map((route) => {
        const totallength = closedtotalpathlength({
            // countofnodes: route.length,
            path: route,
            getdistancebyindex: creategetdistancebyindex(nodecoordinates),
        });
        return { totallength, route };
    });
    const { route: best_route_of_k_opt, totallength: best_length_of_k_opt } =
        getbestRouteOfSeriesRoutesAndLengths(routesAndLengths);
    routesAndLengths.forEach(({ route, totallength }) => {
        if (best_length_of_k_opt < totallength) {
            //非最优解添加到禁忌表
            pathTabooList.add(route);
        }
    });
    if (best_length_of_k_opt < getbestlength()) {
        console.log(
            "k-opt-发现更优解",
            "k=" + k,
            best_route_of_k_opt,
            best_length_of_k_opt
        );
        setbestroute(best_route_of_k_opt);
        setbestlength(best_length_of_k_opt);
    }
    const globalbestroute = getbestroute();
    const globalbestlength = getbestlength();

    const worstlengthandroute = routesandlengths.reduce((previous, current) => {
        return previous.totallength > current.totallength ? previous : current;
    }, routesandlengths[0]);
    const iterateworstlength = worstlengthandroute.totallength;
    const iterateworstroute = worstlengthandroute.route;

    const iteratebestlengthandroute =
        getbestRouteOfSeriesRoutesAndLengths(routesandlengths);
    //     routesandlengths.reduce(
    //     (previous, current) => {
    //         return previous.totallength < current.totallength
    //             ? previous
    //             : current;
    //     },
    //     routesandlengths[0]
    // );
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
    // numberofiterations++;
    // lastlength = routesandlengths[0].totallength;
    // }
    //相对标准差
    const relative_standard_deviation: number =
        calc_relative_standard_deviation(
            routesandlengths.map(({ totallength }) => totallength)
        );
    return {
        relative_standard_deviation,
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
