import { Constants } from "./Constants";
import { GetDistanceBySerialNumber } from "./GetDistanceBySerialNumber";
import { GetPheromone } from "./GetPheromone";

export type PickNextNodeRouletteOptions = Constants & {
    // parameterrandomization: boolean;

    getpheromone: GetPheromone;
    currentnode: number;
    availablenextnodes: number[];

    getdistancebyserialnumber: GetDistanceBySerialNumber;
};
