import {
    pickRandom,
    /*, random */
} from "mathjs";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
import { PickNextNodeRouletteOptions } from "./PickNextNodeRouletteOptions";
/* 轮盘法选择下一个节点,依据信息素和启发函数和参数是否随机 */
export function picknextnodeRoulette(
    args: PickNextNodeRouletteOptions
): number {
    const {
        randomselectionprobability,
        //   ,
        //  ,
        alphazero,
        //    ,
        //    ,
        betazero,
        //   parameterrandomization,
        getpheromone,
        getdistancebyserialnumber,
        currentnode,
        availablenextnodes,
    } = args;
    if (availablenextnodes.length === 0) {
        // debugger;
        throw Error(
            "invalid availablenextnodes:" + JSON.stringify(availablenextnodes)
        );
    }
    const beta = betazero;
    // parameterrandomization ? random( ,  ) : betazero;

    const alpha = alphazero;
    //parameterrandomization
    //    ? random( ,  )
    //   : alphazero;
    const randomselection = Math.random() < randomselectionprobability;
    const weights: number[] = randomselection
        ? []
        : availablenextnodes.map(
              (nextnode) =>
                  Math.pow(getpheromone(nextnode, currentnode), alpha) /
                  Math.pow(
                      getdistancebyserialnumber(nextnode, currentnode),
                      beta
                  )
          );
    const result = randomselection
        ? getnumberfromarrayofnmber(pickRandom(availablenextnodes, 1))
        : getnumberfromarrayofnmber(pickRandom(availablenextnodes, 1, weights));
    // debugger;
    return result;
}
