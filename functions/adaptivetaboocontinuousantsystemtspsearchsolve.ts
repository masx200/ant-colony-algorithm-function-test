import { pickRandom } from "mathjs";
import { SparseMatrixAdd } from "../matrixtools/SparseMatrixAdd";
import { SparseMatrixAssign } from "../matrixtools/SparseMatrixAssign";
import { SparseMatrixFrom } from "../matrixtools/SparseMatrixFrom";
import { SparseMatrixMax } from "../matrixtools/SparseMatrixMax";
import { SparseMatrixMultiplyNumber } from "../matrixtools/SparseMatrixMultiplyNumber";
import { SparseMatrixSymmetryCreate } from "../matrixtools/SparseMatrixSymmetryCreate";
import { SparseMatrixSymmetry } from "../matrixtools/SparseMatrixSymmetry";
import { asserttrue } from "../test/asserttrue";
import { closedtotalpathlength } from "./closed-total-path-length";
import { cycleroutetosegments } from "./cycleroutetosegments";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
import { Nodecoordinates } from "./Nodecoordinates";
import { PathTabooList } from "./PathTabooList";
import { population_relative_information_entropy } from "./population-relative-information-entropy";

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
    pheromonestore: SparseMatrixSymmetry;
    /* 停滞迭代次数.如果连续多少代无法发现新路径,则停止搜索 */
    numberofstagnantiterations: number;
};
/* 令蚁群算法开始迭代 多少轮次搜索 */
export function adaptivetaboocontinuousantsystemtspsearchsolve(
    opts: Mytspsearchoptions
) {
const probabilityofacceptingasuboptimalsolution=0.1
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
    const countofnodes = nodecoordinates.length;
    let pheromoneDiffusionProbability = 0;
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
                  probabilityofacceptingasuboptimalsolution,  betazero,
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
        randomselectionprobability =
            Math.sqrt(1 - Math.pow(populationrelativeinformationentropy, 2)) /
            3;
        pheromoneDiffusionProbability = Math.sqrt(
            1 - Math.pow(populationrelativeinformationentropy, 2)
        );
        console.log("种群相对信息熵", populationrelativeinformationentropy);
        console.log("随机选择概率", randomselectionprobability);
        console.log("信息素扩散概率", pheromoneDiffusionProbability);
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
        const globalbestroutesegments = cycleroutetosegments(globalbestroute);
        const iterateworstroutesegments =
            cycleroutetosegments(iterateworstroute);
        const iteratebestroutesegments = cycleroutetosegments(iteratebestroute);

        const deltapheromoneglobalbest = SparseMatrixSymmetryCreate({
            row: countofnodes,
            //column: countofnodes,
            initializer: function (i, j) {
                return globalbestroutesegments.some(([left, right]) => {
                    return (
                        (i === left && j === right) ||
                        (j === left && i === right)
                    );
                })
                    ? 1 / globalbestlength
                    : 0;
            },
        });
        const deltapheromoneiteratebest = SparseMatrixSymmetryCreate({
            row: countofnodes,
           // column: countofnodes,
            initializer: function (i, j) {
                return iteratebestroutesegments.some(([left, right]) => {
                    return (
                        (i === left && j === right) ||
                        (j === left && i === right)
                    );
                })
                    ? 1 / iteratebestlength
                    : 0;
            },
        });
        const deltapheromoneiterateworst = SparseMatrixSymmetryCreate({
            row: countofnodes,
          //  column: countofnodes,
        });
        if (
            !(
                iteratebestlength === iterateworstlength ||
                iterateworstlength === globalbestlength
            )
        ) {
            //最差和最好不一样，相当于有最差
            SparseMatrixAssign(
                deltapheromoneiterateworst,
                SparseMatrixSymmetryCreate({
                    row: countofnodes,
                  //  column: countofnodes,
                    initializer: function (i, j) {
                        return iterateworstroutesegments.some(
                            ([left, right]) => {
                                return (
                                    (i === left && j === right) ||
                                    (j === left && i === right)
                                );
                            }
                        )
                            ? -1 / iterateworstlength
                            : 0;
                    },
                })
            );
        }
        const deltapheromone = SparseMatrixMultiplyNumber(
            pheromoneintensityQ,
            SparseMatrixAdd(
                deltapheromoneglobalbest,
                deltapheromoneiteratebest,
                deltapheromoneiterateworst
            )
        );
        const oldpheromonestore = SparseMatrixFrom(pheromonestore);
        const nextpheromonestore = SparseMatrixMax(
            SparseMatrixMultiplyNumber(1 / 2, oldpheromonestore),
            SparseMatrixAdd(
                SparseMatrixMultiplyNumber(
                    1 - pheromonevolatilitycoefficientR,
                    oldpheromonestore
                ),
                SparseMatrixMultiplyNumber(
                    pheromonevolatilitycoefficientR,
                    deltapheromone
                )
            )
        );
        console.log({ oldpheromonestore, nextpheromonestore });
        //信息素更新
        SparseMatrixAssign(pheromonestore, nextpheromonestore);
        if (Math.random() < pheromoneDiffusionProbability) {
            //信息素扩散
        }
        numberofiterations++;
        lastlength = routesandlengths[0].totallength;
    }
}
