import { sum } from "lodash";
import { assert_number } from "../test/assert_number";
import { cycle_routetosegments } from "./cycle_routetosegments";
import { generateUniqueArrayOfCircularPath } from "./generateUniqueArrayOfCircularPath";
/* 计算闭合总路径长度 首尾相连 */
export function closed_total_path_length(
    {
        // count_of_nodes,
        path,
        getdistancebyindex,
    }: {
        // count_of_nodes: number;
        path: number[];
        getdistancebyindex: (left: number, right: number) => number;
    } // node_coordinates: NodeCoordinates
): number {
    /* 由于浮点数精度问题,重新排序,一样的路径可以输出一样的长度 */
    const route = generateUniqueArrayOfCircularPath(path);
    return sum(
        cycle_routetosegments(route).map(function ([left, right]) {
            const distance = getdistancebyindex(left, right);
            assert_number(distance);
            return distance;
        })
    );
}
