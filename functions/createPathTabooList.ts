import { sum } from "lodash";
import { ispathsequalinbothdirectionswithcycle } from "./ispathsequalinbothdirectionswithcycle";
import { ispathsequalinbothdirectionswithoutcycle } from "./ispathsequalinbothdirectionswithoutcycle";
import { PathTabooList, createandsetaset } from "./PathTabooList";

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
        return Array.from(set).some((value) => {
            if (route.length === countofnodes) {
                /* 回环路径 */
                return ispathsequalinbothdirectionswithcycle(route, value);
            } else {
                /* 非回环路径 */
                return ispathsequalinbothdirectionswithoutcycle(route, value);
            }
        });
    };
    const add = (route: number[]) => {
        // console.warn("添加到禁忌表", route);
        // debugger;
        if (
            route.length <= 1 ||
            route.length > countofnodes ||
            route.some((v) => typeof v !== "number")
        ) {
            throw new Error("incorrect route:" + JSON.stringify(route));
        }
        const set = store.get(route.length) ?? createandsetaset(store, route);
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
