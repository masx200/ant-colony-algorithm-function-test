export interface DataOfFinishOneIteration {
    relative_standard_deviation: number;
    current_iterations: number;
    population_relative_information_entropy: number;
    ispheromoneDiffusion: boolean;
    randomselectionprobability: number;
    pheromoneDiffusionProbability: number;
    optimallengthofthisround: number;
    optimalrouteofthisround: number[];
    timems: number;
}
