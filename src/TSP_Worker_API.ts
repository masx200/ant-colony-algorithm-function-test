import { TSPRunner } from "../functions/createTSPrunner";
import { DataOfBestChange } from "../functions/DataOfBestChange";
import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { Nodecoordinates } from "../functions/Nodecoordinates";

export type TSP_Worker_API = TSPRunner & {
    on_best_change: (callback: (data: DataOfBestChange) => void) => void;
    on_finish_one_iteration: (
        callback: (data: DataOfFinishOneIteration) => void
    ) => void;
    on_finish_one_route: (
        callback: (data: DataOfFinishOneRoute) => void
    ) => void;
    runOneRoute: () => void;
    init_runner: ({
        pheromonevolatilitycoefficientR1,
        nodecoordinates,
        numberofants,
    }: {
        pheromonevolatilitycoefficientR1: number;
        nodecoordinates: Nodecoordinates;
        numberofants: number;
    }) => void;
};
