import * as comlink from "comlink";
import { TSP_Worker_API } from "./TSP_Worker_API";

export type TSP_Worker_Remote = comlink.Remote<TSP_Worker_API>;
