import { GetDistanceBySerialNumber } from "./GetDistanceBySerialNumber";
import { GetPheromone } from "./GetPheromone";

export type PickNextNodeRouletteOptions = {
    randomselectionprobability: number;
    // parameterrandomization: boolean;
    alphazero: number;
    betazero: number;
    getpheromone: GetPheromone;
    currentnode: number;
    availablenextnodes: number[];

    getdistancebyserialnumber: GetDistanceBySerialNumber;
};
