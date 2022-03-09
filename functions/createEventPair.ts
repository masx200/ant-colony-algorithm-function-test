import { EventEmitterTarget } from "@masx200/event-emitter-target";

export function createEventPair<T = undefined>(
    emitter: EventEmitterTarget
): {
    emit: (data?: T | undefined) => void;
    on: (callback: (data: T) => void) => void;
    event_name: symbol;
} {
    const event_name = Symbol();
    const on = (callback: (data: T) => void) => {
        emitter.on(event_name, callback);
    };
    const emit = (data?: T) => {
        emitter.emit(event_name, data);
    };
    return { emit: emit, on, event_name };
}
