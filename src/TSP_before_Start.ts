// // import { TSPRunner } from "../functions/createTSPrunner";
// import { Nodecoordinates } from "../functions/Nodecoordinates";
// import { initializeTSP_runner } from "./initializeTSP_runner";
// import { TSP_RunnerRef } from "./TSP_workerRef";
// import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

// export async function TSP_before_Start({
//     // onFinishIteration,
//     onGlobalBestRouteChange,
//     onLatestRouteChange,
//     // roundofsearch,
//     nodecoordinates,
//     numberofants,
//     pheromonevolatilitycoefficientR1,
// }: {
//     // onFinishIteration: () => void;
//     pheromonevolatilitycoefficientR1: number;
//     onGlobalBestRouteChange: (
//         globalbestroute: number[],
//         nodecoordinates: Nodecoordinates
//     ) => void;
//     onLatestRouteChange: (
//         latestroute: number[],
//         nodecoordinates: Nodecoordinates
//     ) => void;
//     // roundofsearch: number;
//     numberofants: number;
//     nodecoordinates: Nodecoordinates;
// }): Promise<TSP_Worker_Remote> {
//     console.log("TSP_before_Start", nodecoordinates);
//     TSP_RunnerRef.value ||= await initializeTSP_runner({
//         // onFinishIteration,
//         pheromonevolatilitycoefficientR1,
//         onGlobalBestRouteChange,
//         onLatestRouteChange,
//         nodecoordinates,
//         numberofants,
//     });
//     // TSP_RunnerRef.value?.runIterations(roundofsearch);
//     const runner = TSP_RunnerRef.value;
//     return runner;
// }
