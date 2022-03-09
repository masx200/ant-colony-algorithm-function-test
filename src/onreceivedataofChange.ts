import { DataOfChange } from "../functions/DataOfChange";
import {
    dataofresult,
    resultTableBody,
} from "./resultTableHeads-resultTableBody";

export function onreceivedataofChange(data: DataOfChange) {
    console.log("onreceivedataofChange");
    dataofresult.value = data;
    console.log(dataofresult);
    console.log(resultTableBody);
}
