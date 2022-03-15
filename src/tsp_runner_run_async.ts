// import { TSPRunner } from "../functions/createTSPrunner";
import { sleep_requestAnimationFrame_async_or_settimeout } from "./sleep_requestAnimationFrame_async_or_settimeout";

export async function tsp_runner_run_async(
    runner: { runOneRoute: () => Promise<void> },
    roundofsearch: number,
    numberofants: number
): Promise<void> {
    for (let i = 0; i < roundofsearch * numberofants; i++) {
        await runner.runOneRoute();
        await sleep_requestAnimationFrame_async_or_settimeout();
    }
}
