import { create_collection_of_latest_routes } from "../collections/collection-of-latest-routes";

it("collection_of_latest_routes", () => {
    const cl = create_collection_of_latest_routes(10);

    expect(cl.length).toBe(0);

    cl.add([1, 2, 3]);

    expect(cl.length).toBe(1);
    expect(cl[0]).toEqual([1, 2, 3]);
    cl.add([1, 2, 3]);

    expect(cl.length).toBe(1);
    expect(cl[0]).toEqual([1, 2, 3]);

    Array(20)
        .fill(0)
        .map((_v, i) => i)
        .map((l) => [1, 2, 3, 4, 6, l])
        .forEach((r) => {
            cl.add(r);
        });
    expect(cl.length).toBe(10);
    // console.log(Object.entries( cl));
    expect(cl[0]).toEqual([1, 2, 3, 4, 6, 10]);
    expect(cl.slice(-1)[0]).toEqual([1, 2, 3, 4, 6, 19]);
    expect(cl[Symbol.toStringTag]).toBe("CollectionOfLatestRoutes");
    expect(cl.max_size).toBe(10);
});
