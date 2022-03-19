import { Nodecoordinates } from "../functions/Nodecoordinates";

export type TSPRunnerOptions = {
    max_results_of_k_opt?: number | undefined;
    pheromonevolatilitycoefficientR1?: number | undefined;
    pheromonevolatilitycoefficientR2?: number | undefined;
    pheromoneintensityQ?: number | undefined;
    nodecoordinates: Nodecoordinates;
    alphazero?: number | undefined;
    betazero?: number | undefined;
    numberofants?: number | undefined;
};
