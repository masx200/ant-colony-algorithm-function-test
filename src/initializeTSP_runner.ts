// import { TSPRunner } from "../functions/createTSPrunner";
import { Nodecoordinates } from "../functions/Nodecoordinates";
import { create_TSP_Worker_comlink } from "./create_TSP_Worker_comlink";
import { onreceiveDataOfGlobalBest } from "./onreceiveDataOfGlobalBest";
import { onreceivedataofoneIteration } from "./onreceivedataofoneIteration";
import { onreceivedataofoneroute } from "./onreceivedataofoneroute";
import { dataofresult } from "./resultTableHeads-resultTableBody";
import { TSP_Worker_Remote } from "./TSP_Worker_Remote";
export async function initializeTSP_runner({
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
}): Promise<TSP_Worker_Remote> {
    // const runner = createTSPrunner({
    //     pheromonevolatilitycoefficientR1,
    //     nodecoordinates,
    //     numberofants,
    // });
    // const onDataChange = (data: DataOfGlobalBest) => {
    //     onreceiveDataOfGlobalBest(data);
    //     // const { timems } = data;
    //     // const { globalbestlength } = data;
    //     const { globalbestroute } = data;

    //     onGlobalBestRouteChange(globalbestroute, nodecoordinates);
    // };
    // runner.on_finish_all_iterations(onreceivefinishofAllIteration);
    // runner.on_finish_all_iterations(onFinishIteration);
    const runner = await create_TSP_Worker_comlink({
        pheromonevolatilitycoefficientR1,
        nodecoordinates,
        numberofants,
    });
    console.log(runner);

    // runner.on_finish_one_route(onreceivedataofoneroute);
    await runner.on_finish_one_route((data) => {
        onreceivedataofoneroute(data);
        const { route } = data;
        onLatestRouteChange(route, nodecoordinates);
        onGlobalBestRouteChange(data.globalbestroute, nodecoordinates);
        onreceiveDataOfGlobalBest(data);
    });
    // runner.onDataChange(onDataChange);
    // runner.on_finish_one_iteration(onDataChange);
    // runner.on_finish_one_route(onDataChange);
    await runner.on_finish_one_iteration((data) => {
        onreceivedataofoneIteration(data);
        onGlobalBestRouteChange(data.globalbestroute, nodecoordinates);
        const { globalbestroute, globalbestlength } = data;
        onreceiveDataOfGlobalBest(
            Object.assign({}, dataofresult.value, {
                globalbestroute,
                globalbestlength,
            })
        );
    });
    // debugger
    return runner;
}
