import * as comlink from "comlink";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { TSP_Worker_API } from "./TSP_Worker_API";

export type TSP_Worker_Remote = comlink.Remote<TSP_Worker_API> & {
    on_finish_one_route: (
        callback: (data: DataOfFinishOneRoute) => void
    ) => Promise<void>;
    on_finish_one_iteration: (
        callback: (data: DataOfFinishOneIteration) => void
    ) => Promise<void>;
};
