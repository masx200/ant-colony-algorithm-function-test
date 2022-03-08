import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { dataofoneiteration } from "./dataofoneiteration";
import { dataofoneroute } from "./dataofoneroute";

export function onreceivedataofoneroute(data: DataOfFinishOneRoute) {
    dataofoneroute.push(data);
}
export function onreceivedataofoneIteration(data: DataOfFinishOneIteration) {
    dataofoneiteration.push(data);
}
