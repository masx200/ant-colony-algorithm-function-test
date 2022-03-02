import { pickRandom, random } from "mathjs";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
import { PickNextNodeRouletteOptions } from "./PickNextNodeRouletteOptions";
/* 轮盘法选择下一个节点,依据信息素和启发函数和参数是否随机 */
export function picknextnodeRoulette(
    args: PickNextNodeRouletteOptions
): number {
    const {
        alphamax,
        alphamin,
        alphazero,
        betamax,
        betamin,
        betazero,
        parameterrandomization,
        getpheromone,
        getdistancebyserialnumber,
        currentnode,
        availablenextnodes,
    } = args;
    if (availablenextnodes.length === 0) {
        // debugger
        throw Error(
            "invalid availablenextnodes:" + JSON.stringify(availablenextnodes)
        );
    }
    const beta = parameterrandomization ? random(betamin, betamax) : betazero;

    const alpha = parameterrandomization
        ? random(alphamin, alphamax)
        : alphazero;
    const weights: number[] = availablenextnodes.map((nextnode) => {
        return (
            Math.pow(getpheromone(nextnode, currentnode), alpha) /
            Math.pow(getdistancebyserialnumber(nextnode, currentnode), beta)
        );
    });
    return getnumberfromarrayofnmber(
        pickRandom(availablenextnodes, 1, weights)
    );
}
