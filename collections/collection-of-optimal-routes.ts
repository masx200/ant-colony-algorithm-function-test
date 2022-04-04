import { getUniqueStringOfCircularRoute } from "../functions/getUniqueStringOfCircularRoute";
import { assert_number } from "../test/assert_number";
import { assert_true } from "../test/assert_true";
import { assignOwnKeys } from "./assignOwnKeys";
export function create_collection_of_optimal_routes(max_size: number) {
    return new collection_of_optimal_routes(max_size);
}
export class collection_of_optimal_routes extends Array<number[]> {
    length = 0;
    #get_longest_length_of_routes():
        | { index: number; value: number }
        | undefined {
        if (this.length === 0) {
            return;
        } else {
            const [index, value] = Array.from(
                this.#length_of_routes_store.entries()
            ).reduce(
                ([pi, pv], [ci, cv]) => {
                    if (pv > cv) {
                        return [pi, pv];
                    } else {
                        return [ci, cv];
                    }
                },
                [0, 0]
            );
            return { index, value };
        }
    }
    #length_of_routes_store = new Array<number>();

    #unique_string_store = new Array<string>();
    constructor(public max_size: number) {
        assert_true(0 < max_size);
        super();
    }

    add(route: number[], length: number) {
        assert_true(route.length > 0);
        assert_number(length);
        assert_true(0 < length);
        assert_true(Infinity > length);
        const unique_string = getUniqueStringOfCircularRoute(route);

        if (this.#unique_string_store.includes(unique_string)) {
            return;
        }
        const longest = this.#get_longest_length_of_routes();
        if (longest) {
            if (length > longest.value) {
                return;
            }
        }
        this.#unique_string_store.push(unique_string);
        super.push(route);
        this.#length_of_routes_store.push(length);

        while (this.length > this.max_size) {
            assert_true(longest);
            const index = longest.index;
            assignOwnKeys(
                this,
                this.filter((_v, i) => i !== index)
            );
            this.#unique_string_store = this.#unique_string_store.filter(
                (_v, i) => i !== index
            );
            this.#length_of_routes_store = this.#length_of_routes_store.filter(
                (_v, i) => i !== index
            );
        }
    }
}
