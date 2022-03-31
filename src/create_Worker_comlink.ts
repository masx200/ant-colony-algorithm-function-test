import * as comlink from "comlink";

export function create_Worker_comlink<API>(
    createWorker: () => Worker
): comlink.Remote<API> & { terminate: () => void } {
    const endpoint = createWorker();
    const runner = comlink.wrap<API>(endpoint);

    const remote: comlink.Remote<API> & { terminate: () => void } =
        Object.create(runner, {
            terminate: { value: () => endpoint.terminate() },
        });
    return remote;
}
