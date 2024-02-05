export function calc_pheromone_volatility_coefficient_R1(
    pheromone_volatility_coefficient_R2: number,
    count_of_ants: number,
): number {
    return (
        1 - Math.pow(1 - pheromone_volatility_coefficient_R2, 1 / count_of_ants)
    );
}
