import { dataofoneroute } from "./dataofoneroute";

export function onreceivedataofoneroute(data: {
    totallength: number;
    loops: number;
    timems: number;
    route: number[];
}) {
    dataofoneroute.push(data);
}
