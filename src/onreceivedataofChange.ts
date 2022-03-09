import { reactive } from "vue";
import { DataOfChange } from "../functions/DataOfChange";
import {
    dataofresult,
    resultTableBody,
} from "./resultTableHeads-resultTableBody";
export const dataOfAllResults = reactive<DataOfChange[]>([]);
export function onreceivedataofChange(data: DataOfChange) {
    console.log("onreceivedataofChange");
    dataofresult.value = data;
    dataOfAllResults.push(data);
    console.log(dataofresult);
    console.log(resultTableBody);
}
