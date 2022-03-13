import { sum } from "lodash";
import { createandsetaset } from "../functions/createandsetaset";
import { assertIsArray } from "../test/assertIsArray";
import { is_route_equals } from "./is_route_equals";
import { PathTabooList } from "./PathTabooList";
import { pathTabooListSymbol } from "./pathTabooListSymbol";

/**
 * 路径禁忌列表  */
export function createpathTabooListold<N extends number = number>(
    countofnodes: N
    //路径最多节点数,用于判断是否是环路
): PathTabooList<N> {
    if (countofnodes < 2) {
        throw new Error("incorrect countofnodes");
    }
    const store = new Map<number, Set<number[]>>();
    const keys = () => {
        const sets = [...store.values()];
        return sets.map((s) => [...s.keys()]).flat();
    };
    //缓存性能优化
    const has = (route: number[]): boolean => {
        const set = store.get(route.length);
        if (!set) {
            return false;
        }
        for (let value of set) {
            if (is_route_equals<N>(value, route, countofnodes)) {
                return true;
            }
        }
        return false;
    };
    const add = (route: number[]) => {
        //当添加一条路径长度为(总节点数-1)的路径到禁忌路径列表时，应该自动补全成完整路径添加到禁忌列表中
        if (route.length === countofnodes - 1) {
            const restitem = Array(countofnodes)
                .fill(0)
                .map((_v, i) => i)
                .filter((v) => !route.includes(v))[0];
            add([...route, restitem]);
        }
        // console.warn("添加到禁忌表", route);
        // debugger;
        if (
            route.length <= 1 ||
            route.length > countofnodes ||
            route.some((v) => typeof v !== "number")
        ) {
            throw new Error("incorrect route:" + JSON.stringify(route));
        }
        const set =
            store.get(route.length) ?? createandsetaset(store, route.length);
        if (!has(route)) {
            set.add(route);
        }
    };

    return {
        [pathTabooListSymbol]: true,
        delete: (route: number[]) => {
            const set = store.get(route.length);
            if (!set) {
                return false;
            }

            for (let value of set) {
                if (is_route_equals<N>(value, route, countofnodes)) {
                    set.delete(value);
                    return true;
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
        [Symbol.toStringTag]: "pathTabooList",
    };
}

export function createpathTabooList<N extends number = number>(
    countofnodes: N
    //路径最多节点数,用于判断是否是环路
): PathTabooList<N> {
    const oldptl = createpathTabooListold(countofnodes);

    const cacheset = new Set<string>();
    //缓存性能优化
    function cachedhas(route: number[]): boolean {
        const cachedresult = cacheset.has(JSON.stringify(route));
        if (cachedresult) {
            return cachedresult;
        }
        const result = oldptl.has(route);
        if (result) {
            cacheset.add(JSON.stringify(route));
            console.log("cacheset.size", cacheset.size);
            console.log("oldptl.size", oldptl.size());
        }
        return result;
    }
    function cachedelete(route: number[]): boolean {
        if (!oldptl.has(route)) {
            console.log(`Cannot delete route ${route}`);
            return false;
        }
        console.log(`should delete route ${route}`);
        oldptl.delete(route);
        cacheset.delete(JSON.stringify(route));
        console.log("cacheset.size", cacheset.size);
        console.log("oldptl.size", oldptl.size());
        cacheset.forEach((s) => {
            const value = JSON.parse(s);

            assertIsArray(value);

            if (is_route_equals(value, route, countofnodes)) {
                cacheset.delete(s);
            }
        });

        return true;
    }
    console.log(cachedelete);
    function cacheclear() {
        oldptl.clear();
        cacheset.clear();
        console.log("cacheset.size", cacheset.size);
        console.log("oldptl.size", oldptl.size());
    }
    function cachedadd(route: number[]) {
        cacheset.add(JSON.stringify(route));
        oldptl.add(route);
        console.log("cacheset.size", cacheset.size);
        console.log("oldptl.size", oldptl.size());
    }
    return {
        ...oldptl,
        add: cachedadd,
        has: cachedhas,
        delete: cachedelete,
        clear: cacheclear,
    };
}
