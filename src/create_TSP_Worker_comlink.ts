import { worker_error_listener } from "../functions/worker_error_listener";
import { create_Worker_comlink } from "./create_Worker_comlink";
import { Runner_Init_Options } from "./Runner_Init_Options";

import { TSP_Worker_API } from "./TSP_Worker_API";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export async function create_TSP_Worker_comlink(
    options: Runner_Init_Options
): Promise<TSP_Worker_Remote> {
    const {
        worker,
        terminate,
        remote: runner,
    } = create_Worker_comlink<TSP_Worker_API>(() => {
        const w = new Worker(
            new URL("./TSP_Runner.Worker.ts", import.meta.url),
            {
                type: "module",
            }
        );

        return w;
    }, worker_error_listener);
    await runner.init_runner(options);

    const remote = runner;
    return { remote, worker, terminate };
}
