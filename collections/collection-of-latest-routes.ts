import { getUniqueStringOfCircularRoute } from "../functions/getUniqueStringOfCircularRoute";
import { assert_true } from "../test/assert_true";
import { assignOwnKeys } from "./assignOwnKeys";
export function create_collection_of_latest_routes(max_size: number) {
    return new collection_of_latest_routes(max_size);
}
export class collection_of_latest_routes extends Array<number[]> {
    get [Symbol.toStringTag]() {
        return "CollectionOfLatestRoutes";
    }

    #unique_string_store = new Array<string>();
    constructor(public max_size: number) {
        assert_true(0 < max_size);
        super();
        this.length = 0;
    }
    //新的在后,旧的在前
    add(route: number[]) {
        assert_true(route.length > 0);
        const unique_string = getUniqueStringOfCircularRoute(route);

        if (this.#unique_string_store.includes(unique_string)) {
            return;
        }
        this.#unique_string_store.push(unique_string);
        /*   this.#routes_store. */ super.push(route);

        if (this.length > this.max_size) {
            assignOwnKeys(this, this.slice(-this.max_size));
            this.#unique_string_store = this.#unique_string_store.slice(
                -this.max_size
            );
        }
    }
}
