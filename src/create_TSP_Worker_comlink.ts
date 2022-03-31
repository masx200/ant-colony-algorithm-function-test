import * as comlink from "comlink";
import { DataOfBestChange } from "../functions/DataOfBestChange";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { create_Worker_comlink } from "./create_Worker_comlink";
// import { NodeCoordinates } from "../functions/NodeCoordinates";
import { TSPRunnerOptions } from "./TSPRunnerOptions";
import TSPWorker from "./TSP_Runner.Worker?worker";
// import { TSP_workerRef } from "./TSP_workerRef";
import { TSP_Worker_API } from "./TSP_Worker_API";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export async function create_TSP_Worker_comlink(
    options: TSPRunnerOptions
): Promise<TSP_Worker_Remote> {
    // new TSPWorker();
    // TSP_workerRef.value ||= new TSPWorker();
    // const endpoint = TSP_workerRef.value;
    // const runner = comlink.wrap<TSP_Worker_API>(endpoint);
    const runner = create_Worker_comlink<TSP_Worker_API>(() => new TSPWorker());
    await runner.init_runner(options);
    const on_finish_one_iteration = async (
        callback: (data: DataOfFinishOneIteration) => void
    ) => {
        runner.on_finish_one_iteration(comlink.proxy(callback));
    };
    const on_finish_one_route = async (
        callback: (data: DataOfFinishOneRoute) => void
    ) => {
        runner.on_finish_one_route(comlink.proxy(callback));
    };
    const on_best_change = async (
        callback: (data: DataOfBestChange) => void
    ) => {
        runner.on_best_change(comlink.proxy(callback));
    };

    const remote = Object.create(runner, {
        on_finish_one_route: { value: on_finish_one_route },
        on_finish_one_iteration: { value: on_finish_one_iteration },
        on_best_change: { value: on_best_change },
    }) as typeof runner & {
        on_finish_one_route: typeof on_finish_one_route;
        on_finish_one_iteration: typeof on_finish_one_iteration;
        on_best_change: typeof on_best_change;
    };
    // console.log(runner, remote);
    return remote;
}
