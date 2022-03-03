export function asserttrue(con: boolean, msg?: string) {
    if (con) {
        return true;
    } else {
        throw Error("assert error true:" + msg);
    }
}
