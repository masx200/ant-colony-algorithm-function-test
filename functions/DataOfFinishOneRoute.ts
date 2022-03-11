import { DataOfGlobalBest } from "./DataOfGlobalBest";

export type DataOfFinishOneRoute = {
    current_search_count: number;
    timems: number;
    route: number[];
    totallength: number;
    countofloops: number;
} & DataOfGlobalBest;
