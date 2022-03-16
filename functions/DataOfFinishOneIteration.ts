export interface DataOfFinishOneIteration {
    globalbestroute: number[];
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
