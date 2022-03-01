export function assertshouldcatcherror(fn: () => void) {
    try {
        fn();
    } catch (error) {
        return true;
    }
    throw Error("assert shouldcatcherror");
}
