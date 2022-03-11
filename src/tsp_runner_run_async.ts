import { TSPRunner } from "../functions/createTSPrunner";
import { requestAnimationFrame_async } from "./requestAnimationFrame_async";

export async function tsp_runner_run_async(
    runner: TSPRunner,
    roundofsearch: number
): Promise<void> {
    for (let i = 0; i < roundofsearch; i++) {
        runner.runiterations(1);
        await requestAnimationFrame_async();
    }
}
