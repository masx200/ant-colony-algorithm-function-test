import { createTSPrunner, TSPRunner } from "../functions/createTSPrunner";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import {
    onreceivedataofoneIteration,
    onreceivedataofoneroute,
} from "./onreceivedataofoneroute";
import { onreceivedataofChange } from "./onreceivedataofChange";
import { onreceivefinishofAllIteration } from "./onreceivefinishofAllIteration";
import { DataOfChange } from "../functions/DataOfChange";

export function initializeTSP_runner({
    nodecoordinates,
    numberofants,
    onGlobalBestRouteChange,
    onLatestRouteChange,
}: {
    nodecoordinates: Nodecoordinates;
    numberofants: number;
    onGlobalBestRouteChange: (
        globalbestroute: number[],
        nodecoordinates: Nodecoordinates
    ) => void;
    onLatestRouteChange: (
        latestroute: number[],
        nodecoordinates: Nodecoordinates
    ) => void;
}): TSPRunner {
    const runner = createTSPrunner({ nodecoordinates, numberofants });
    const onresultchange = (data: DataOfChange) => {
        onreceivedataofChange(data);
        // const { timems } = data;
        // const { globalbestlength } = data;
        const { globalbestroute } = data;

        onGlobalBestRouteChange(globalbestroute, nodecoordinates);
    };
    runner.onfinishalliterations(onreceivefinishofAllIteration);
    runner.onfinishoneiteration(onreceivedataofoneIteration);
    runner.onfinishoneroute(onreceivedataofoneroute);
    runner.onfinishoneroute(({ route }) => {
        onLatestRouteChange(route, nodecoordinates);
    });
    runner.onDataChange(onresultchange);
    // runner.onfinishoneiteration(onresultchange);
    // runner.onfinishoneroute(onresultchange);
    console.log(runner);
    // debugger
    return runner;
}
