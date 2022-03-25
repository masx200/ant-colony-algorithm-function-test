// import { TSPRunner } from "../functions/createTSPrunner";
import { sleep_requestAnimationFrame_async_or_settimeout } from "./sleep_requestAnimationFrame_async_or_settimeout";

import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export async function tsp_runner_run_async({
    runner,
    count_of_search = Infinity,
    round_of_search = Infinity,
    number_of_ants,
    onprogress,
}: {
    count_of_search?: number;
    runner: TSP_Worker_Remote;
    round_of_search?: number;
    number_of_ants: number;
    onprogress?: (percentage: number) => void;
}): Promise<void> {
    onprogress && onprogress(0);
    const all_count = count_of_search ?? round_of_search * number_of_ants;
    let rest_count = all_count;
    let run_count = 20;
    const min_count = 10;
    const interval = 3000;
    while (rest_count > 0) {
        run_count = Math.min(run_count, rest_count);
        let last_time = Number(new Date());
        await runner.runRoutes(run_count);
        rest_count -= run_count;
        let duration = Number(new Date()) - last_time;

        // console.log("tsp_runner_run_async,次数", run_count);
        // console.log("tsp_runner_run_async,用时", duration);
        if (duration > interval) {
            run_count = Math.round(Math.max(run_count / 2, min_count));

            //     await sleep_requestAnimationFrame_async_or_settimeout();
            //     last_time = Number(new Date());
        } else {
            run_count++;
            run_count = Math.max(min_count, run_count);
        }
        onprogress && onprogress(100 * (1 - rest_count / all_count));
        await sleep_requestAnimationFrame_async_or_settimeout();
    }
}
