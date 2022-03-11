import { DataOfFinishOneIteration } from "../functions/DataOfFinishOneIteration";
import { DataOfFinishOneRoute } from "../functions/DataOfFinishOneRoute";
import { Nodecoordinates } from "../functions/Nodecoordinates";

export interface TSP_Worker_API {
    on_finish_one_iteration: (
        callback: (data: DataOfFinishOneIteration) => void
    ) => void;
    on_finish_one_route: (
        callback: (data: DataOfFinishOneRoute) => void
    ) => void;
    runOneIteration: () => void;
    init_runner: ({
        pheromonevolatilitycoefficientR1,
        nodecoordinates,
        numberofants,
    }: {
        pheromonevolatilitycoefficientR1: number;
        nodecoordinates: Nodecoordinates;
        numberofants: number;
    }) => void;
}
