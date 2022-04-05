import { NodeCoordinates } from "../functions/NodeCoordinates";
/**保存是否此路径有交叉点 */
export const node_coordinates_to_intersect_routes_unique: WeakMap<
    NodeCoordinates,
    Map<string, boolean>
> = new WeakMap();
