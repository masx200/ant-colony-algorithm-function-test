import { SparseMatrixSymmetry } from "../matrixtools/SparseMatrixSymmetry";
import { adaptive_tabu_search_builds_a_path_and_updates_pheromone } from "./adaptive_tabu_search_builds_a_path_and_updates_pheromone";
import { cycleroutetosegments } from "./cycleroutetosegments";
import { each_iteration_of_pheromone_update_rules } from "./each_iteration_of_pheromone_update_rules";
import { Nodecoordinates } from "./Nodecoordinates";
import { PathTabooList } from "./PathTabooList";
import { performPheromoneDiffusionOperations } from "./performPheromoneDiffusionOperations";
import { population_relative_information_entropy } from "./population-relative-information-entropy";

export type AdaptiveTSPSearchOptions = {
    searchloopcountratio: number;

    getbestroute: () => number[];
    /**信息素强度*/
    pheromoneintensityQ: number;
    /**局部信息素挥发系数 */
    pheromonevolatilitycoefficientR1: number;
    /**全局信息素挥发系数 */
    pheromonevolatilitycoefficientR2: number;
    setbestroute: (route: number[]) => void;
    setbestlength: (a: number) => void;
    getbestlength: () => number;
    nodecoordinates: Nodecoordinates;
    /**
     * 蚂蚁数量
     */
    numberofants: number;
    alphazero: number;
    betazero: number;
    pathTabooList: PathTabooList;
    /**最大迭代次数 */
    // maxnumberofiterations: number;
    pheromonestore: SparseMatrixSymmetry;
    /* 停滞迭代次数.如果连续多少代无法发现新路径,则停止搜索 */
    // numberofstagnantiterations: number;
};
/* 令蚁群算法开始迭代 一次轮次搜索 */
export function adaptiveTabooSingleIterateTSPSearchSolve(
    opts: AdaptiveTSPSearchOptions
): {
    route: number[];
    totallength: number;
}[] {
    // console.log(opts);
    const {
        searchloopcountratio,

        pheromoneintensityQ,
        pheromonevolatilitycoefficientR1,
        pheromonevolatilitycoefficientR2,
        setbestroute,
        setbestlength,
        pathTabooList,
        pheromonestore,
        nodecoordinates,
        // maxnumberofiterations,
        // numberofstagnantiterations,
        numberofants,
        getbestlength,
        getbestroute,
    } = opts;
    const countofnodes = nodecoordinates.length;
    let pheromoneDiffusionProbability = 0;
    /**
     * 迭代的次数
     */
    // let numberofiterations = 0;
    /**搜索的停滞的轮次数 */
    // let numberofstagnantsearch = 0;
    /* 上一次搜索的路径长度 */
    // let lastlength = getbestlength();
    const alphazero = 1;
    const betazero = 1;
    /** 随机选择概率*/
    let randomselectionprobability = 0;
    // while (
    //     numberofiterations < maxnumberofiterations ||
    //     numberofstagnantsearch < numberofstagnantiterations
    // ) {
    const routesandlengths: {
        route: number[];
        totallength: number;
    }[] = Array(numberofants)
        .fill(0)
        .map(() => {
            return adaptive_tabu_search_builds_a_path_and_updates_pheromone({
                searchloopcountratio,
                pheromoneintensityQ,
                pheromonevolatilitycoefficientR1,
                nodecoordinates,
                alphazero,

                betazero,
                randomselectionprobability,
                getbestlength,
                pathTabooList,
                pheromonestore,
                setbestlength,
                setbestroute,
                getbestroute,
            });
        });
    const routes = routesandlengths.map(({ route }) => route);
    // const lengths = routesandlengths.map(({ totallength }) => totallength);
    /*  if (
        routesandlengths.every(({ totallength }) => totallength === lastlength)
    ) {
        numberofstagnantsearch++;
    } else {
        numberofstagnantsearch = 0;
    } */
    /**种群相对信息熵 */
    const populationrelativeinformationentropy =
        population_relative_information_entropy(routes);
    randomselectionprobability =
        Math.sqrt(1 - Math.pow(populationrelativeinformationentropy, 2)) / 4;

    pheromoneDiffusionProbability = Math.sqrt(
        1 - Math.pow(populationrelativeinformationentropy, 2)
    );
    console.log("种群相对信息熵", populationrelativeinformationentropy);
    console.log("随机选择概率", randomselectionprobability);
    console.log("信息素扩散概率", pheromoneDiffusionProbability);
    const globalbestroute = getbestroute();
    const globalbestlength = getbestlength();

    const worstlengthandroute = routesandlengths.reduce((previous, current) => {
        return previous.totallength > current.totallength ? previous : current;
    }, routesandlengths[0]);
    const iterateworstlength = worstlengthandroute.totallength;
    const iterateworstroute = worstlengthandroute.route;

    const iteratebestlengthandroute = routesandlengths.reduce(
        (previous, current) => {
            return previous.totallength < current.totallength
                ? previous
                : current;
        },
        routesandlengths[0]
    );
    const iteratebestlength = iteratebestlengthandroute.totallength;
    const iteratebestroute = iteratebestlengthandroute.route;

    const iterateworstroutesegments = cycleroutetosegments(iterateworstroute);
    const iteratebestroutesegments = cycleroutetosegments(iteratebestroute);
    const globalbestroutesegments = cycleroutetosegments(globalbestroute);
    each_iteration_of_pheromone_update_rules({
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
    if (Math.random() < pheromoneDiffusionProbability) {
        console.log("执行信息素扩散操作");
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
    return routesandlengths as {
        route: number[];
        totallength: number;
    }[];
}

