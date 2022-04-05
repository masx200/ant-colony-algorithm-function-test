import { create_collection_of_optimal_routes } from "../collections/collection-of-optimal-routes";
import { entriesOwnKeys } from "../collections/entriesOwnKeys";

it("test-collection_of_optimal_routes", () => {
    const cl = create_collection_of_optimal_routes(10);

    expect(cl.length).toBe(0);

    cl.add([1, 2, 3], 10);

    expect(cl.length).toBe(1);
    expect(cl[0]).toEqual([1, 2, 3]);
    cl.add([1, 2, 3], 10);

    expect(cl.length).toBe(1);
    expect(cl[0]).toEqual([1, 2, 3]);

    Array(20)
        .fill(0)
        .map((_v, i) => i)
        .map((l) => [1, 2, 3, 4, 6, l + 1])
        .forEach((r, i) => {
            cl.add(r, i + 1);
        });
    // console.log(entriesOwnKeys(cl));
    expect(cl.length).toBe(10);

    expect(cl[0]).toEqual([1, 2, 3]);
    expect(cl.slice(-1)[0]).toEqual([1, 2, 3, 4, 6, 9]);
    expect(cl[Symbol.toStringTag]).toBe("CollectionOfOptimalRoutes");
    expect(cl.max_size).toBe(10);
    // console.log(Array.from(cl));
    expect(Array.from(cl)).toEqual([
        [1, 2, 3],
        [1, 2, 3, 4, 6, 1],
        [1, 2, 3, 4, 6, 2],
        [1, 2, 3, 4, 6, 3],
        [1, 2, 3, 4, 6, 4],
        [1, 2, 3, 4, 6, 5],
        [1, 2, 3, 4, 6, 6],
        [1, 2, 3, 4, 6, 7],
        [1, 2, 3, 4, 6, 8],
        [1, 2, 3, 4, 6, 9],
    ]);
    expect(entriesOwnKeys(cl)).toEqual([
        ["0", [1, 2, 3]],
        ["1", [1, 2, 3, 4, 6, 1]],
        ["2", [1, 2, 3, 4, 6, 2]],
        ["3", [1, 2, 3, 4, 6, 3]],
        ["4", [1, 2, 3, 4, 6, 4]],
        ["5", [1, 2, 3, 4, 6, 5]],
        ["6", [1, 2, 3, 4, 6, 6]],
        ["7", [1, 2, 3, 4, 6, 7]],
        ["8", [1, 2, 3, 4, 6, 8]],
        ["9", [1, 2, 3, 4, 6, 9]],
        ["length", 10],
        ["max_size", 10],
    ]);
});
