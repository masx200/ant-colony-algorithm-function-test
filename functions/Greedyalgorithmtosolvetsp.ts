import { Nodecoordinates } from "./Nodecoordinates";

import { pickRandom } from "mathjs";
import { geteuclideandistancebyindex } from "./geteuclideandistancebyindex";
/* 贪心算法解决tsp问题,返回路径序列 */
export function Greedyalgorithmtosolvetsp(
    nodecoordinates: Nodecoordinates
): number[] {
    const { length } = nodecoordinates;
    const inputindexs = Array(length)
        .fill(0)
        .map((_v, i) => i);
    const indexsset = new Set(inputindexs);
    /* 第一个点随机选择 */
    const firstnode = getnumberfromarrayofnmber(pickRandom(inputindexs));
    const result = [firstnode];
    indexsset.delete(firstnode);

    while (indexsset.size) {
        // console.log(indexsset.size);

        /* 当前的节点 */
        const currentnode = result.slice(-1)[0];
        /* 剩余 的节点 */
        const restnodes = Array.from(indexsset);
        /* 计算其他点与此点的距离的最小值 */

      /*  const mindistance = Math.min(
            ...restnodes.map((value) =>
                geteuclideandistancebyindex(currentnode, value, nodecoordinates)
            )
        );
*/
        // console.log(mindistance);

        /* 下一个点选择距离最近的点 */
     /*   const nextnode = restnodes.find((value) => {
            return (
                mindistance ===
                geteuclideandistancebyindex(currentnode, value, nodecoordinates)
            );
        });
        */
        let nextnode=-1
        let mindistance=Infinity
        for(let [nodeindex,distance] of restnodes.map(value=>{return [

value,
            geteuclideandistancebyindex(currentnode,value,nodecoordinates)
        ]})){

if(distance<mindistance){

    mindistance=distance
    nextnode=nodeindex
}



        }
        if ((typeof nextnode !== "number")||nextnode===-1) {
            throw new Error("Accident");
        }
        indexsset.delete(nextnode);
        result.push(nextnode);
    }
    return result;
}
function getnumberfromarrayofnmber(input: number | number[]): number {
    return typeof input === "number" ? input : input[0];
}
