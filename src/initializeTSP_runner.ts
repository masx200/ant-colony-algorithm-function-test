import { createTSPrunner, TSPRunner } from "../functions/createTSPrunner";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { onreceivedataofoneroute } from "./onreceivedataofoneroute";
import { onreceivedataofoneIteration } from "./onreceivedataofoneIteration";
import { onreceiveDataOfGlobalBest } from "./onreceiveDataOfGlobalBest";
// import { onreceivefinishofAllIteration } from "./onreceivefinishofAllIteration";
// import { DataOfGlobalBest } from "../functions/DataOfGlobalBest";

export function initializeTSP_runner({
    // onFinishIteration,
    nodecoordinates,
    numberofants,
    onGlobalBestRouteChange,
    onLatestRouteChange,
    pheromonevolatilitycoefficientR1,
}: {
    // onFinishIteration: () => void;
    pheromonevolatilitycoefficientR1: number;
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
    const runner = createTSPrunner({
        pheromonevolatilitycoefficientR1,
        nodecoordinates,
        numberofants,
    });
    // const onDataChange = (data: DataOfGlobalBest) => {
    //     onreceiveDataOfGlobalBest(data);
    //     // const { timems } = data;
    //     // const { globalbestlength } = data;
    //     const { globalbestroute } = data;

    //     onGlobalBestRouteChange(globalbestroute, nodecoordinates);
    // };
    // runner.on_finish_all_iterations(onreceivefinishofAllIteration);
    // runner.on_finish_all_iterations(onFinishIteration);
    runner.on_finish_one_iteration(onreceivedataofoneIteration);
    runner.on_finish_one_route(onreceivedataofoneroute);
    runner.on_finish_one_route((data) => {
        const { route } = data;
        onLatestRouteChange(route, nodecoordinates);
        onGlobalBestRouteChange(data.globalbestroute, nodecoordinates);
        onreceiveDataOfGlobalBest(data);
    });
    // runner.onDataChange(onDataChange);
    // runner.on_finish_one_iteration(onDataChange);
    // runner.on_finish_one_route(onDataChange);
    console.log(runner);
    // debugger
    return runner;
}
