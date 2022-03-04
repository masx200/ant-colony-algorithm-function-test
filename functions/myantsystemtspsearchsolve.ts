import { pickRandom } from "mathjs";
import { asserttrue } from "../test/asserttrue";
import { closedtotalpathlength } from "./closed-total-path-length";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
import { Nodecoordinates } from "./Nodecoordinates";
import { PathTabooList } from "./PathTabooList";
import { population_relative_information_entropy } from "./population-relative-information-entropy";
import { SparseTwoDimensionalMatrixSymmetry } from "./SparseTwoDimensionalMatrixSymmetry";
import { taboo_backtracking_path_construction } from "./Taboo-backtracking-path-construction";

export type Mytspsearchoptions = {
    getbestroute: () => number[];
    /**信息素强度*/
    pheromoneintensityQ: number;
    /**信息素挥发系数 */
    pheromonevolatilitycoefficientR: number;
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
    maxnumberofiterations: number;
    pheromonestore: SparseTwoDimensionalMatrixSymmetry;
    /* 停滞迭代次数.如果连续多少代无法发现新路径,则停止搜索 */
    numberofstagnantiterations: number;
};
/* 令蚁群算法开始迭代 多少轮次搜索 */
export function myantsystemtspsearchsolve(opts: Mytspsearchoptions) {
    // console.log(opts);
    const {
        pheromoneintensityQ,
        pheromonevolatilitycoefficientR,
        setbestroute,
        setbestlength,
        pathTabooList,
        pheromonestore,
        nodecoordinates,
        maxnumberofiterations,
        numberofstagnantiterations,
        numberofants,
        getbestlength,
        getbestroute,
    } = opts;
    /**
     * 迭代的次数
     */
    let numberofiterations = 0;
    /**搜索的停滞的轮次数 */
    let numberofstagnantsearch = 0;
    /* 上一次搜索的路径长度 */
    let lastlength = getbestlength();
    const alphazero = 1;
    const betazero = 1;
    /** 随机选择概率*/
    let randomselectionprobability = 0;
    while (
        numberofiterations < maxnumberofiterations ||
        numberofstagnantsearch < numberofstagnantiterations
    ) {
        const routesandlengths = Array(numberofants)
            .fill(0)
            .map(() => {
                const inputindexs = Array(nodecoordinates.length)
                    .fill(0)
                    .map((_v, i) => i);
                const startnode = getnumberfromarrayofnmber(
                    pickRandom(inputindexs)
                );

                const route = taboo_backtracking_path_construction({
                    alphazero,
                    betazero,
                    randomselectionprobability,
                    getbestlength,
                    nodecoordinates,
                    pathTabooList,
                    pheromonestore,
                    startnode,
                });
                const totallength = closedtotalpathlength(
                    route,
                    nodecoordinates
                );

                const bestlength = getbestlength();
                if (bestlength && bestlength >= totallength) {
                    setbestlength(totallength);
                    setbestroute(route);
                }
                return { route, totallength };
            });
        const routes = routesandlengths.map(({ route }) => route);
        const lengths = routesandlengths.map(({ totallength }) => totallength);
        if (
            routesandlengths.every(
                ({ totallength }) => totallength === lastlength
            )
        ) {
            numberofstagnantsearch++;
        } else {
            numberofstagnantsearch = 0;
        }
        /**种群相对信息熵 */
        const populationrelativeinformationentropy =
            population_relative_information_entropy(routes);
        randomselectionprobability = Math.sqrt(
            1 - Math.pow(populationrelativeinformationentropy, 2)
        );

        const globalbestroute = getbestroute();
        const globalbestlength = getbestlength();
        const iterateworstlength = Math.min(...lengths);
        const worstindex = lengths.findIndex(
            (totallength) => totallength === iterateworstlength
        );
        asserttrue(worstindex >= 0);
        const iterateworstroute = routes[worstindex];
        asserttrue(Boolean(iterateworstroute));
        const iteratebestlength = Math.min(...lengths);
        const bestindex = lengths.findIndex(
            (totallength) => totallength === iteratebestlength
        );
        asserttrue(bestindex >= 0);
        const iteratebestroute = routes[bestindex];
        asserttrue(Boolean(iteratebestroute));




        
        numberofiterations++;
        lastlength = routesandlengths[0].totallength;
    }
}
