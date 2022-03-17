// import { TSPRunner } from "../functions/createTSPrunner";
// import { sleep_requestAnimationFrame_async_or_settimeout } from "./sleep_requestAnimationFrame_async_or_settimeout";

export async function tsp_runner_run_async(
    runner: { runOneRoute: () => Promise<void> },
    roundofsearch: number,
    numberofants: number
): Promise<void> {
    // let last_time = Number(new Date());
    for (let i = 0; i < roundofsearch * numberofants; i++) {
        await runner.runOneRoute();

        // let duration = Number(new Date()) - last_time;
        // if (duration > 20) {
        //     await sleep_requestAnimationFrame_async_or_settimeout();
        //     last_time = Number(new Date());
        // }
    }
}
