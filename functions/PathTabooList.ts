import { sum } from "lodash";
import { ispathsequalinbothdirectionswithcycle } from "./ispathsequalinbothdirectionswithcycle";
import { ispathsequalinbothdirectionswithoutcycle } from "./ispathsequalinbothdirectionswithoutcycle";

/**
 * 路径禁忌列表  类似于Set*/
export type PathTabooList = {
    size(): number;
    countofnodes: number;
    add(route: number[]): void;
    clear(): void;
    delete(route: number[]): boolean;
    keys(): number[][];
    values(): number[][];
    has(route: number[]): boolean;
    [Symbol.toStringTag]: string;
};
/**
 * 路径禁忌列表  */
export function createPathTabooList(
    countofnodes: number //路径最多节点数,用于判断是否是环路
): PathTabooList {
    if (countofnodes < 2) {
        throw new Error("incorrect countofnodes");
    }
    const store = new Map<number, Set<number[]>>();
    const keys = () => {
        const sets = [...store.values()];
        return sets.map((s) => [...s.keys()]).flat();
    };
    const has = (route: number[]): boolean => {
        const set = store.get(route.length);
        if (!set) {
            return false;
        }
        return Boolean(
            Array.from(set).some((value) => {
                if (route.length === countofnodes) {
                    /* 回环路径 */
                    return ispathsequalinbothdirectionswithcycle(route, value);
                } else {
                    return ispathsequalinbothdirectionswithoutcycle(
                        route,
                        value
                    );
                }
            })
        );
    };
    const add = (route: number[]) => {
        if (route.length <= 1 || route.length > countofnodes) {
            throw new Error("incorrect route");
        }
        const set =
            store.get(route.length) ??
            (() => {
                const set = new Set<number[]>();
                store.set(route.length, set);
                return set;
            })();
        if (!has(route)) {
            set.add(route);
        }
    };

    return {
        delete: (route: number[]) => {
            const set = store.get(route.length);
            if (!set) {
                return false;
            }
            for (let value of Array.from(set)) {
                if (route.length === countofnodes) {
                    /* 回环路径 */
                    if (
                        ispathsequalinbothdirectionswithcycle(route, value) &&
                        set.delete(value)
                    ) {
                        return true;
                    }
                } else {
                    if (
                        ispathsequalinbothdirectionswithoutcycle(
                            route,
                            value
                        ) &&
                        set.delete(value)
                    ) {
                        return true;
                    }
                }
            }
            return false;
        },
        add,
        has,
        keys,
        values: keys,
        clear: () => store.clear(),
        size: () => {
            const sizeofsets = sum([...store.values()].map((s) => s.size));
            return sizeofsets;
        },
        countofnodes,
        [Symbol.toStringTag]: "PathTabooList",
    };
}
