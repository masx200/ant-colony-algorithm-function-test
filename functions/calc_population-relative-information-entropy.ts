import { sum } from "lodash";
import { assert_true } from "../test/assert_true";
import { ispathsequalinbothdirectionswithcycle } from "./ispathsequalinbothdirectionswithcycle";

/* 种群相对信息熵 */
export function calc_population_relative_information_entropy(
    routes: Array<number[]>
) {
    if (!(routes.length >= 2)) {
        // debugger
        throw new Error("incorrect routes");
    }
    if (!(routes[0].length >= 2)) {
        throw new Error("incorrect routes");
    }
    const routesnumber = routes.length;
    const nodesnumber = routes[0].length;
    /* 要求路径节点数都一样 */
    if (!routes.every((route) => route.length === nodesnumber)) {
        throw new Error("incorrect routes");
    }
    const notrepeatroutes = routes.reduce((previous: number[][], route) => {
        if (previous.length) {
            // return previous;
            /* 如果此路径与所有路径都不同,则添加 */
            if (
                previous.some((notrepeatroute) =>
                    ispathsequalinbothdirectionswithcycle(route, notrepeatroute)
                )
            ) {
                // debugger;
                return previous;
            } else {
                // debugger;
                return [...previous, route];
            }
        } else {
            // debugger;
            return [route];
        }
    }, []);
    const fitnessvalues = notrepeatroutes.map((route) =>
        /* 计算与此路径相同的路径个数除以总路径数 */ routes.reduce(
            (previous, current) =>
                previous +
                Number(ispathsequalinbothdirectionswithcycle(current, route)),
            0
        )
    );
    const sumfitnessvalues = sum(fitnessvalues);
    const fitnessweight = fitnessvalues.map((v) => v / sumfitnessvalues);
    // debugger;
    /* 种群相对信息熵 1.0000000000000002 ????? */
    const result = Math.min(
        1,
        -sum(fitnessweight.map((fitness) => fitness * Math.log(fitness))) /
            Math.log(routesnumber)
    );
    // debugger;
    if (Number.isNaN(result)) {
        throw new Error("Accident ");
    }
    // console.log(result);
    assert_true(result <= 1);
    return result;
}
