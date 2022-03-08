import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { dataofoneroute } from "./dataofoneroute";

export function onreceivedataofoneroute(data: DataOfFinishOneRoute) {
    dataofoneroute.push(data);
}
