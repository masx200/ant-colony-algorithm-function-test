import * as comlink from "comlink";

export function create_Worker_comlink<API>(
    createWorker: () => Worker
): {remote:comlink.Remote<API>,worker:Worker} & { terminate: () => void } {
    const endpoint = createWorker();
    const remote = comlink.wrap<API>(endpoint);

    const result ={remote,worker:endpoint,
terminate: () => endpoint.terminate()}
        
    return result;
}
