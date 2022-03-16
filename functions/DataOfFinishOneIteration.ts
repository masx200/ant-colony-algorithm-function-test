export interface DataOfFinishOneIteration {
    /* "找到最优解的耗时秒" */

    // time_of_best_ms: number;
    // globalbestroute: number[];
    relative_deviation_from_optimal: number;
    current_iterations: number;
    population_relative_information_entropy: number;
    ispheromoneDiffusion: boolean;
    randomselectionprobability: number;
    pheromoneDiffusionProbability: number;
    optimallengthofthisround: number;
    optimalrouteofthisround: number[];
    timems: number;
    globalbestlength: number;
    locally_optimized_length: number;
}
