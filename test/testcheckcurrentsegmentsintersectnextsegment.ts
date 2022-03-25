import { intersectionfilterfun } from "../functions/intersectionfilterfun";
import { asserttrue } from "./asserttrue";
import { node_coordinates21 } from "./node_coordinates21";
import { node_coordinates12 } from "./node_coordinates12";
import { intersection_filter_with_cycle_route_old } from "../functions/intersection_filter_with_cycle_route_old";
import { node_coordinates16 } from "./node_coordinates16";

export function testcheckcurrentsegmentsintersectnextsegment() {
    asserttrue(
        intersection_filter_with_cycle_route_old({
            cycleroute: [8, 0, 9, 6, 5, 14, 13, 12, 11, 15, 7, 3, 1, 2, 4, 10],
            node_coordinates: node_coordinates16,
        })
    );
    asserttrue(
        !intersection_filter_with_cycle_route_old({
            cycleroute: [10, 11, 4, 5, 9, 3, 0, 1, 2, 6, 7, 8],
            node_coordinates: node_coordinates12,
        })
    );
    asserttrue(
        intersection_filter_with_cycle_route_old({
            cycleroute: [7, 6, 4, 5, 1, 2, 0, 3, 9, 11, 8, 10],
            node_coordinates: node_coordinates12,
        })
    );
    // console.log("  testcheckcurrentsegmentsintersectnextsegment start");
    asserttrue(
        intersectionfilterfun({
            currentroute: [3, 1, 0],

            nextnode: 2,
            node_coordinates: node_coordinates12,
        })
    );
    asserttrue(
        !intersectionfilterfun({
            currentroute: [0, 1, 2],

            nextnode: 4,
            node_coordinates: node_coordinates12,
        })
    );
    asserttrue(
        !intersectionfilterfun({
            currentroute: [0, 1, 2, 4, 5],

            nextnode: 3,
            node_coordinates: node_coordinates12,
        })
    );
    asserttrue(
        intersectionfilterfun({
            currentroute: [
                10, 11, 9, 12, 8, 1, 0, 3, 2, 4, 5, 6, 7, 20, 18, 15, 13, 17,
                14, 19,
            ],

            nextnode: 16,
            node_coordinates: node_coordinates21,
        })
    );
    // console.log("  testcheckcurrentsegmentsintersectnextsegment end");
}
