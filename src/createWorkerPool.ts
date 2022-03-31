import { pickRandomOne } from "../functions/pickRandomOne";

export interface WorkerPool<
    W extends {
        terminate: () => void;
    }
> {
    clear: () => void;
    getOne: () => W;
    workers: W[];
    size: number;
    [Symbol.toStringTag]: string;
}

/**创建线程池 ,泛型W是一个类似于worker的对象,可终止*/
export function createWorkerPool<W extends { terminate: () => void }>(
    createWorker: () => W,
    {
        size = navigator.hardwareConcurrency,
    }: {
        size?: number;
    }
): WorkerPool<W> {
    const workers: W[] = [];
    function getOne(): W {
        if (workers.length !== size) {
            workers.push(createWorker());
        }
        return pickRandomOne(workers);
    }
    function clear() {
        workers.forEach((worker) => worker.terminate());
        workers.length = 0;
    }
    return {
        clear,
        getOne,
        workers,
        size,
        [Symbol.toStringTag]: "WorkerPool",
    };
}
