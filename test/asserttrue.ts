export function asserttrue(con: boolean, msg?: string): asserts con is true {
    if (!con) {
        throw Error("assert error true:" + msg);
    }
}
