// import { TSPRunner } from "../functions/createTSPrunner";
import { assert_true } from "../test/assert_true";
import { RunWay } from "./RunWay";
import { sleep_requestAnimationFrame_async_or_settimeout } from "./sleep_requestAnimationFrame_async_or_settimeout";

/** time_of_search 优先于 count_of_search 优先于 iterations_of_search*/
export async function tsp_runner_run_async({
    runner,
    time_of_search_ms = Infinity,
    // count_of_search = Infinity,
    iterations_of_search = Infinity,
    // count_of_ants,
    onprogress,
}: {
    time_of_search_ms?: number; //毫秒
    // count_of_search?: number;
    runner: {
        // runOneRoute: () => Promise<void>;
        runIterations: (iterations: number) => Promise<void>;
        runOneIteration: () => Promise<void>;
        // runRoutes: (count: number) => Promise<void>;
    };
    iterations_of_search?: number;
    // count_of_ants: number;
    onprogress?: (percentage: number) => void;
}): Promise<void> {
    assert_true(
        [time_of_search_ms /*  count_of_search */, iterations_of_search].some(
            (a) => a < Infinity
        )
    );
    const all_time = time_of_search_ms;
    onprogress && onprogress(0);
    const all_iterations = iterations_of_search;
    // count_of_search; /*  < Infinity
    // ? count_of_search
    // : iterations_of_search * count_of_ants; */
    let rest_iterations = all_iterations;
    let run_iterations = 1;
    const min_count = 1;
    const interval = 10000;

    let rest_time = time_of_search_ms;
    const type_of_search =
        time_of_search_ms < Infinity ? RunWay.time : RunWay.round;
    let duration: number = 0;
    while (
        type_of_search === RunWay.time ? rest_time > 0 : rest_iterations > 0
    ) {
        if (type_of_search === RunWay.round) {
            run_iterations = Math.min(run_iterations, rest_iterations);
            const last_time = Number(new Date());
            await runner.runIterations(run_iterations);
            rest_iterations -= run_iterations;
            duration = Number(new Date()) - last_time;

            // console.log("tsp_runner_run_async,次数", run_iterations);
            // console.log("tsp_runner_run_async,用时", duration);

            onprogress &&
                onprogress(
                    Math.min(100, 100 * (1 - rest_iterations / all_iterations))
                );
        } else {
            const last_time = Number(new Date());
            await runner.runIterations(run_iterations);
            duration = Number(new Date()) - last_time;
            rest_time -= duration;
            onprogress &&
                onprogress(Math.min(100, 100 * (1 - rest_time / all_time)));
        }
        if (duration > interval) {
            run_iterations = Math.round(
                Math.max(run_iterations / 2, min_count)
            );
        } else {
            run_iterations++;
            run_iterations = Math.max(min_count, run_iterations);
        }
        await sleep_requestAnimationFrame_async_or_settimeout();
    }
}
