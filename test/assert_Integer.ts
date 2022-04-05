export function assert_Integer(con: any): asserts con is number {
    try {
        if (typeof con !== "number") {
            throw Error("assert error number:" + con);
        }
        if (Number.isNaN(con)) {
            throw Error("assert error number:" + con);
        }

        BigInt(con);
    } catch (error) {
        throw Error("assert error integer:" + con);
    }
}
