import * as comlink from "comlink";
import { DataOfBestChange } from "../functions/DataOfBestChange";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
// import { NodeCoordinates } from "../functions/NodeCoordinates";
import { TSPRunnerOptions } from "./TSPRunnerOptions";
import TSPWorker from "./TSP_Runner.Worker?worker";
import { TSP_workerRef } from "./TSP_workerRef";
import { TSP_Worker_API } from "./TSP_Worker_API";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

export async function create_TSP_Worker_comlink(
    options: TSPRunnerOptions
): Promise<TSP_Worker_Remote> {
    const endpoint = new TSPWorker();
    TSP_workerRef.value = endpoint;
    const runner = comlink.wrap<TSP_Worker_API>(endpoint);
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
    });
    // console.log(runner, remote);
    return remote as TSP_Worker_Remote;
}
