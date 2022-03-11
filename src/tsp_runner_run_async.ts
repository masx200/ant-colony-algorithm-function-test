// import { TSPRunner } from "../functions/createTSPrunner";
import { requestAnimationFrame_async } from "./requestAnimationFrame_async";

export async function tsp_runner_run_async(
    runner: { runOneIteration: () => Promise<void> },
    roundofsearch: number
): Promise<void> {
    for (let i = 0; i < roundofsearch; i++) {
        await runner.runOneIteration();
        await requestAnimationFrame_async();
    }
}
