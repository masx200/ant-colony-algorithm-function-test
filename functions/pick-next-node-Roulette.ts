import { assert_true } from "../test/assert_true";
import { getnumberfromarrayofnmber } from "./getnumberfromarrayofnmber";
import { PickNextNodeRouletteOptions } from "./PickNextNodeRouletteOptions";
import { pickRandomOne } from "./pickRandomOne";
/* 轮盘法选择下一个节点,依据信息素和启发函数和参数是否随机 */
export function picknextnodeRoulette(
    args: PickNextNodeRouletteOptions
): number {
    const {
        randomselectionprobability,
        //   ,
        //  ,
        alpha_zero,
        //    ,
        //    ,
        beta_zero,
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
    const beta = beta_zero;
    // parameterrandomization ? random( ,  ) : beta_zero;

    const alpha = alpha_zero;
    //parameterrandomization
    //    ? random( ,  )
    //   : alpha_zero;
    const randomselection = Math.random() < randomselectionprobability;
    // const weights: number[] = randomselection
    //     ? []
    //     : availablenextnodes.map(
    //           (nextnode) =>
    //               Math.pow(getpheromone(nextnode, currentnode), alpha) /
    //               Math.pow(
    //                   getdistancebyserialnumber(nextnode, currentnode),
    //                   beta
    //               )
    //       );
    const result = randomselection
        ? getnumberfromarrayofnmber(pickRandomOne(availablenextnodes))
        : getnumberfromarrayofnmber(
              pickRandomOne(
                  availablenextnodes,

                  availablenextnodes.map((nextnode) => {
                      const phermone = getpheromone(nextnode, currentnode);
                      //console.log("phermone", phermone);
                      assert_true(phermone > 0);
                      const weight =
                          Math.pow(phermone, alpha) /
                          Math.pow(
                              getdistancebyserialnumber(nextnode, currentnode),
                              beta
                          );
                      //console.log("weight", weight);
                      //   if (weight < 0) {
                      //       debugger;
                      //   }
                      assert_true(weight > 0);

                      return weight;
                  })
              )
          );
    // debugger;
    return result;
}
