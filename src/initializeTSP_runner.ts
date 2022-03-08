import { createTSPrunner, TSPRunner } from "../functions/createTSPrunner";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import {
    onreceivedataofoneIteration,
    onreceivedataofoneroute,
} from "./onreceivedataofoneroute";
import { onreceivedataofAllIteration } from "./onreceivedataofAllIteration";

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
    const onresultchange = () => {
        const timems = runner.gettotaltimems();
        const globalbestlength = runner.getglobalbestlength();
        const globalbestroute = runner.getglobalbestroute();
        onreceivedataofAllIteration({
            timems,
            globalbestroute,
            globalbestlength,
        });
        onGlobalBestRouteChange(globalbestroute, nodecoordinates);
    };
    runner.onfinishalliterations(onreceivedataofAllIteration);
    runner.onfinishoneiteration(onreceivedataofoneIteration);
    runner.onfinishoneroute(onreceivedataofoneroute);
    runner.onfinishoneroute(({ route }) => {
        onLatestRouteChange(route, nodecoordinates);
    });
    runner.onfinishoneiteration(onresultchange);
    runner.onfinishoneroute(onresultchange);
    console.log(runner);
    // debugger
    return runner;
}
