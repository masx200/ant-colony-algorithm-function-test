import { DataOfChange } from "../functions/DataOfChange";
import { dataofresult } from "./resultTableHeads-resultTableBody";

export function onreceivedataofChange(data: DataOfChange) {
    dataofresult.value = data;
}
