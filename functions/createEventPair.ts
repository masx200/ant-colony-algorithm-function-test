import { EventEmitterTarget } from "@masx200/event-emitter-target";

export function createEventPair<T = undefined>(
    emitter: EventEmitterTarget
): {
    emit: (data?: T) => void;
    on: (callback: (data: T) => void) => void;
} {
    const flag = Symbol();
    const on = (callback: (data: T) => void) => {
        emitter.on(flag, callback);
    };
    const emit = (data?: T) => {
        emitter.emit(flag, data);
    };
    return { emit: emit, on };
}
