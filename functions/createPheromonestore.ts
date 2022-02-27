import { numberstostringkey } from "./numberstostringkey";
import { stringkeytonumbers } from "./stringkeytonumbers";
/* 创建信息素仓库 */
export function createPheromonestore(): {
    values: () => number[];
    keys: () => [number, number][];
    entries: () => [number, number, number][];
    getPheromone: (left: number, right: number) => number | undefined;
    setPheromone: (left: number, right: number, Pheromone: number) => void;
    [Symbol.toStringTag]: string;
} {
    /* 信息素存储 */
    const Pheromonesrecord = new Map<`${number},${number}`, number>();
    /* 获得信息素 */
    function getPheromone(left: number, right: number): number | undefined {
        //信息素参数不分正反
        return (
            Pheromonesrecord.get(`${left},${right}`) ??
            Pheromonesrecord.get(`${right},${left}`)
        );
    }
    /* 修改信息素 */
    function setPheromone(
        left: number,
        right: number,
        Pheromone: number
    ): void {
        //参数排序
        //信息素参数不分正反

        Pheromonesrecord.set(numberstostringkey(left, right), Pheromone);
    }
    // console.log(Pheromonesrecord);
    function values() {
        return Array.from(Pheromonesrecord.values());
    }
    function keys(): [number, number][] {
        return Array.from(Pheromonesrecord.keys()).map(stringkeytonumbers);
    }

    function entries(): [number, number, number][] {
        return Array.from(Pheromonesrecord.entries()).map(([key, value]) => {
            return [...stringkeytonumbers(key), value];
        });
    }
    return {
        values,
        keys,
        entries,
        getPheromone,
        setPheromone,
        [Symbol.toStringTag]: "PheromoneStore",
    };
}
