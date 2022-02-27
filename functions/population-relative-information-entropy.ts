import { sum } from "lodash";
import { ispathsequalinbothdirections } from "./ispathsequalinbothdirections";

/* 种群相对信息熵 */
export function population_relative_information_entropy(
    routes: Array<number[]>
) {
    if (!routes.length) {
        throw new Error("incorrect routes");
    }
    if (!routes[0].length) {
        throw new Error("incorrect routes");
    }
    const routesnumber = routes.length;
    const nodesnumber = routes[0].length;
    /* 要求路径节点数都一样 */
    if (!routes.every((route) => route.length === nodesnumber)) {
        throw new Error("incorrect routes");
    }

    const fitnessvalues = routes.map((route, _i, a) => /* 计算与此路径相同的路径个数除以总路径数 */ (
        a.reduce((previous, current) => (
            previous +
            Number(ispathsequalinbothdirections(current, route))
        ), 0) / routesnumber
    ));
    return (
        -sum(fitnessvalues.map((fitness) => fitness * Math.log(fitness))) /
        Math.log(routesnumber)
    );
}
