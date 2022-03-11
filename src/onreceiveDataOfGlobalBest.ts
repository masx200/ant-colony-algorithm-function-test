import { reactive } from "vue";
import { DataOfGlobalBest } from "../functions/DataOfGlobalBest";
import {
    dataofresult,
    resultTableBody,
} from "./resultTableHeads-resultTableBody";
export const dataOfAllResults = reactive<DataOfGlobalBest[]>([]);
export function onreceiveDataOfGlobalBest(data: DataOfGlobalBest) {
    console.log("onreceiveDataOfGlobalBest");
    dataofresult.value = data;
    dataOfAllResults.push(data);
    console.log(dataofresult);
    console.log(resultTableBody);
}
