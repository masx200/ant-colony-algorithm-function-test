//import { TSP_Worker_Remote } from "./TSP_Worker_Remote";

// import { TSPRunner } from "../functions/createTSPrunner";
// export const TSP_workerRef: { value?: Worker | undefined } = {};
export const TSP_RunnerRef: {
    value?: {terminate:()=>void} | undefined;
} = {};
