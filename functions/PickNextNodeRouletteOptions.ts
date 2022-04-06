import { GetDistanceBySerialNumber } from "./GetDistanceBySerialNumber";
import { GetPheromone } from "./GetPheromone";

export type PickNextNodeRouletteOptions = {
    // randomselectionprobability: number;
    // parameterrandomization: boolean;
    alpha_zero: number;
    beta_zero: number;
    getpheromone: GetPheromone;
    currentnode: number;
    availablenextnodes: number[];

    getdistancebyserialnumber: GetDistanceBySerialNumber;
};
